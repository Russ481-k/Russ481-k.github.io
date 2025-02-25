---
title: "Entasis Engine - Data Collector Implementation"
date: "2025-02-14"
category: "projects"
description: "Guide for implementing cryptocurrency exchange data collection and storage system"
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

Hello everyone! 😊

Today, I'd like to share how we implemented a data collector based on **Spring Boot** that collects real-time spot and futures market data from Binance and stores it in **TimescaleDB**. In this post, I'll walk you through various implementation points including system architecture, API calls, service layer configuration, and error handling in a friendly way!

---

## System Overview

Our system performs the following roles:

- **Data Collector**
  - **BinanceExchange**: Collects **spot market** data (BTC/USDT, ETH/USDT) from Binance
  - **BinanceFuturesExchange**: Collects **futures market** data (BTCUSDT, ETHUSDT) from Binance
- **API Calls**: Uses `WebClient` to call Binance APIs
- **Service Layer**
  - `SpotMarketDataServiceImpl`: Processes spot market data
  - `FuturesMarketDataServiceImpl`: Processes futures market data
  - `ExchangeRepository`: Manages exchange information and TimescaleDB storage
- **Data Collection Interval**: Collects and stores data at 1-second intervals
- **Error Handling**: API response null checks, exception handling and logging, database constraint error handling

---

## Key Implementation Points

### 1. API Calls Using WebClient

We use the asynchronous **WebClient** to call data from the Binance API. Here's an example from the `BinanceExchange` class:

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
            .doOnError(e -> log.error("Error occurred while calling API: {}", e.getMessage()))
            .onErrorReturn(null);
    }
}
```

> **Tip:** When an error occurs, logging helps easily identify the problem, and using `onErrorReturn(null)` makes it easy to continue with null checks. 😉

---

### 2. Service Layer Implementation

The service layer responsible for processing data for each market processes the data received from the API and stores it. For example, the `SpotMarketDataServiceImpl` class is configured as follows:

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
        // Spot market: Collect BTC/USDT, ETH/USDT data
        List<String> symbols = Arrays.asList("BTCUSDT", "ETHUSDT");
        for (String symbol : symbols) {
            try {
                JsonNode response = binanceExchange.getSpotMarketData(symbol).block();
                if (response != null) {
                    String price = response.get("price").asText();
                    ExchangeData data = new ExchangeData(symbol, price, LocalDateTime.now());
                    exchangeRepository.save(data);
                    log.info("Data saved successfully - {}: {}", symbol, price);
                } else {
                    log.warn("API response is null. symbol: {}", symbol);
                }
            } catch (Exception e) {
                log.error("Exception occurred while collecting data: {}", e.getMessage());
            }
        }
    }
}
```

> **Note:** Futures market data processing is implemented in the `FuturesMarketDataServiceImpl` with similar logic, and it is configured to call the Binance futures API endpoints.

---

### 3. Data Collection with Scheduler

To collect data at 1-second intervals, we used Spring's `@Scheduled` annotation:

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

> **Tip:** When collecting periodic data, it is important to ensure that the scheduler does not stop through exception handling. 😊

---

## Error Handling and Logging

- **API response null check:** If the response is null, perform appropriate warning logging to identify the problem.
- **Exception handling:** Use try-catch blocks to log exceptions and ensure that the system as a whole is not affected.
- **Database constraint error:** Check for possible constraint errors before saving and ensure stability through transaction processing if necessary.

---

## Conclusion

In this way, we were able to collect and store the spot and futures market data from Binance in real-time and stably in **TimescaleDB**. During this process, we used various features of Spring Boot such as `WebClient`, scheduling, error handling, and logging, and we hope this will be helpful for your project! 🚀

If you have any questions or comments, please feel free to contact me anytime! Have a good day! 😄

Happy Coding!
