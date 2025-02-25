---
title: "Entasis Engine - 데이터 수집기 구현"
date: "2025-02-14"
category: "projects"
description: "가상자산 거래소 데이터 수집 및 저장 시스템 구현 가이드"
tags:
  [
    "spring-boot",
    "binance-api",
    "webclient",
    "scheduler",
    "timescaledb",
    "data-collection",
    "error-handling",
  ]
thumbnail: ""
---

안녕하세요, 여러분! 😊

오늘은 **Spring Boot** 기반으로 바이낸스의 현물과 선물 시장 데이터를 실시간으로 수집하여 **TimescaleDB**에 저장하는 데이터 수집기를 어떻게 구현했는지 공유해보려고 해요. 이 글에서는 시스템 아키텍처, API 호출 방법, 서비스 레이어 구성, 에러 처리 등 다양한 구현 포인트를 풀어볼게요!

---

## 시스템 개요

우리 시스템은 아래와 같은 역할을 수행합니다:

- **데이터 수집기**
  - **BinanceExchange**: 바이낸스의 **현물 시장** 데이터(BTC/USDT, ETH/USDT) 수집
  - **BinanceFuturesExchange**: 바이낸스의 **선물 시장** 데이터(BTCUSDT, ETHUSDT) 수집
- **API 호출**: `WebClient`를 사용해 바이낸스 API를 호출합니다.
- **서비스 레이어**
  - `SpotMarketDataServiceImpl`: 현물 시장 데이터 처리
  - `FuturesMarketDataServiceImpl`: 선물 시장 데이터 처리
  - `ExchangeRepository`: 거래소 정보 관리 및 TimescaleDB 저장
- **데이터 수집 주기**: 1초 간격으로 데이터 수집 및 저장
- **에러 처리**: API 응답 null 체크, 예외 처리 및 로깅, 데이터베이스 제약조건 관련 오류 처리

---

## 주요 구현 포인트

### 1. WebClient를 활용한 API 호출

비동기 방식의 **WebClient**를 이용하여 바이낸스 API로부터 데이터를 호출합니다. 아래는 `BinanceExchange` 클래스의 예시입니다:

```java
@Service
public class BinanceExchange {

    private static final Logger log = LoggerFactory.getLogger(BinanceExchange.class);
    private final WebClient webClient = WebClient.create("https://api.binance.com");

    public Mono<JsonNode> getSpotMarketData(String symbol) {
        return webClient.get()
            .uri(uriBuilder -> uriBuilder
                .path("/api/v3/ticker/price")
                .queryParam("symbol", symbol)
                .build())
            .retrieve()
            .bodyToMono(JsonNode.class)
            .doOnError(e -> log.error("API 호출 중 에러 발생: {}", e.getMessage()))
            .onErrorReturn(null);
    }
}
```

> **Tip:** 에러 발생 시 로깅을 통해 문제를 쉽게 파악할 수 있고, `onErrorReturn(null)`을 사용해 null 체크로 이어지는 처리를 간편하게 했어요. 😉

---

### 2. 서비스 레이어 구현

각 시장별 데이터를 처리하는 서비스 레이어에서는 API로부터 받은 데이터를 가공 후 저장하는 역할을 합니다. 예를 들어, `SpotMarketDataServiceImpl` 클래스는 다음과 같이 구성됩니다:

```java
@Service
public class SpotMarketDataServiceImpl implements SpotMarketDataService {

    private static final Logger log = LoggerFactory.getLogger(SpotMarketDataServiceImpl.class);
    private final BinanceExchange binanceExchange;
    private final ExchangeRepository exchangeRepository;

    public SpotMarketDataServiceImpl(BinanceExchange binanceExchange,
                                     ExchangeRepository exchangeRepository) {
        this.binanceExchange = binanceExchange;
        this.exchangeRepository = exchangeRepository;
    }

    @Override
    public void collectData() {
        // 현물 시장: BTC/USDT, ETH/USDT 데이터를 수집합니다.
        List<String> symbols = Arrays.asList("BTCUSDT", "ETHUSDT");
        for (String symbol : symbols) {
            try {
                JsonNode response = binanceExchange.getSpotMarketData(symbol).block();
                if (response != null) {
                    String price = response.get("price").asText();
                    ExchangeData data = new ExchangeData(symbol, price, LocalDateTime.now());
                    exchangeRepository.save(data);
                    log.info("데이터 저장 성공 - {}: {}", symbol, price);
                } else {
                    log.warn("API 응답이 null입니다. symbol: {}", symbol);
                }
            } catch (Exception e) {
                log.error("데이터 수집 중 예외 발생: {}", e.getMessage());
            }
        }
    }
}
```

> **참고:** 선물 시장 데이터 처리는 `FuturesMarketDataServiceImpl`에서 비슷한 로직으로 구현되며, 바이낸스의 선물 API 엔드포인트를 호출하도록 구성되어 있어요.

---

### 3. 스케줄러를 통한 주기적 데이터 수집

데이터를 1초 간격으로 수집하기 위해 Spring의 `@Scheduled` 애노테이션을 활용했습니다:

```java
@Component
public class MarketDataScheduler {

    private final SpotMarketDataService spotMarketDataService;
    private final FuturesMarketDataService futuresMarketDataService;

    public MarketDataScheduler(SpotMarketDataService spotMarketDataService,
                               FuturesMarketDataService futuresMarketDataService) {
        this.spotMarketDataService = spotMarketDataService;
        this.futuresMarketDataService = futuresMarketDataService;
    }

    @Scheduled(fixedRate = 1000)
    public void collectMarketData() {
        spotMarketDataService.collectData();
        futuresMarketDataService.collectData();
    }
}
```

> **노하우:** 주기적 데이터 수집 시, 반드시 예외 처리를 통해 스케줄러가 중단되지 않도록 하는 것이 중요해요. 😊

---

## 에러 처리 및 로깅

- **API 응답 null 체크:** 응답이 null인 경우 적절한 경고 로깅을 수행하여 문제를 파악합니다.
- **예외 처리:** try-catch 블록을 통해 예외 발생 시 로깅하고, 시스템 전체에 영향이 없도록 합니다.
- **데이터베이스 제약조건 오류:** 저장 시 발생할 수 있는 제약조건 오류를 사전에 확인하고, 필요한 경우 트랜잭션 처리를 통해 안정성을 보장합니다.

---

## 마치며

이와 같이 구현함으로써 **바이낸스**의 현물 및 선물 시장 데이터를 실시간으로 안정적으로 수집하고 **TimescaleDB**에 저장할 수 있게 되었어요. 이 과정에서 `WebClient`, 스케줄링, 에러 처리, 로깅 등 다양한 Spring Boot의 기능들을 활용하였는데요, 여러분의 프로젝트에도 도움이 되길 바랍니다! 🚀

궁금한 점이나 의견이 있으시면 언제든지 편하게 이야기해 주세요! 좋은 하루 보내세요! 😄

Happy Coding!
