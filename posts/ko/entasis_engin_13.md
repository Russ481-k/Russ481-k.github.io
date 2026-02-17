---
title: "Entasis Engine -   "
date: "2025-02-14"
category: "projects"
description: "        "
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

, ! 

 **Spring Boot**         **TimescaleDB**       .    , API  ,   ,       !

---

##  

     :

- ** **
  - **BinanceExchange**:  ** ** (BTC/USDT, ETH/USDT) 
  - **BinanceFuturesExchange**:  ** ** (BTCUSDT, ETHUSDT) 
- **API **: `WebClient`   API .
- ** **
  - `SpotMarketDataServiceImpl`:    
  - `FuturesMarketDataServiceImpl`:    
  - `ExchangeRepository`:     TimescaleDB 
- **  **: 1     
- ** **: API  null ,    ,     

---

##   

### 1. WebClient  API 

  **WebClient**   API  .  `BinanceExchange`  :

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
            .doOnError(e -> log.error("API    : {}", e.getMessage()))
            .onErrorReturn(null);
    }
}
```

> **Tip:**          , `onErrorReturn(null)`  null     . 

---

### 2.   

      API       .  , `SpotMarketDataServiceImpl`    :

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
        //  : BTC/USDT, ETH/USDT  .
        List<String> symbols = Arrays.asList("BTCUSDT", "ETHUSDT");
        for (String symbol : symbols) {
            try {
                JsonNode response = binanceExchange.getSpotMarketData(symbol).block();
                if (response != null) {
                    String price = response.get("price").asText();
                    ExchangeData data = new ExchangeData(symbol, price, LocalDateTime.now());
                    exchangeRepository.save(data);
                    log.info("   - {}: {}", symbol, price);
                } else {
                    log.warn("API  null. symbol: {}", symbol);
                }
            } catch (Exception e) {
                log.error("    : {}", e.getMessage());
            }
        }
    }
}
```

> **:**     `FuturesMarketDataServiceImpl`   ,   API    .

---

### 3.     

 1    Spring `@Scheduled`  :

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

> **:**    ,          . 

---

##    

- **API  null :**  null       .
- ** :** try-catch      ,     .
- **  :**         ,       .

---

## 

   ****         **TimescaleDB**    .   `WebClient`, ,  ,    Spring Boot  ,     ! 

       !   ! 

Happy Coding!
