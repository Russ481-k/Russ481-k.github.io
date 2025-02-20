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
thumbnail: "/images/cryptocurrency.jpg"
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
