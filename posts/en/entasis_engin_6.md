---
title: "Entasis Engine - API Specification"
date: "2025-02-12"
category: "projects"
description: "RESTful API and WebSocket specifications for digital asset data analysis system"
tags:
  [
    "api",
    "rest",
    "websocket",
    "swagger",
    "endpoint",
    "authentication",
    "documentation",
  ]
thumbnail: "/images/cryptocurrency.jpg"
---

# Financial Data Analysis System API Specification

## 🔐 Authentication & Security

### 1. Authentication Methods

#### 1.1 JWT Authentication

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 1.2 API Key Authentication

```json
{
  "X-API-Key": "your-api-key-here"
}
```

### 2. Security Policies

- Rate Limiting: 1000 requests/minute
- IP Whitelisting
- SSL/TLS required

## 📡 RESTful API Endpoints

### 1. Market Data API

#### 1.1 Real-time Price Retrieval

```http
GET /api/v1/market/price/{symbol}

Response 200:
{
  "symbol": "BTC-USDT",
  "price": "65432.10",
  "timestamp": "2024-03-21T09:30:00Z",
  "volume": "123.45",
  "exchange": "binance"
}
```

#### 1.2 Historical Data Retrieval

```http
GET /api/v1/market/history/{symbol}
Parameters:
  - interval: "1m" | "5m" | "1h" | "1d"
  - start: ISO8601
  - end: ISO8601

Response 200:
{
  "symbol": "BTC-USDT",
  "data": [
    {
      "timestamp": "2024-03-21T09:00:00Z",
      "open": "65000.00",
      "high": "65100.00",
      "low": "64900.00",
      "close": "65050.00",
      "volume": "234.56"
    }
  ]
}
```

### 2. Portfolio API

#### 2.1 Position Retrieval

```http
GET /api/v1/portfolio/positions

Response 200:
{
  "positions": [
    {
      "symbol": "BTC-USDT",
      "size": "1.5",
      "entry_price": "64000.00",
      "current_price": "65000.00",
      "pnl": "1500.00",
      "timestamp": "2024-03-21T09:30:00Z"
    }
  ]
}
```

#### 2.2 Position Creation

```http
POST /api/v1/portfolio/positions
Request:
{
  "symbol": "BTC-USDT",
  "size": "1.5",
  "type": "long",
  "leverage": "1"
}

Response 201:
{
  "position_id": "pos_123456",
  "status": "success",
  "timestamp": "2024-03-21T09:30:00Z"
}
```

### 3. AI Analysis API

#### 3.1 Price Prediction

```http
GET /api/v1/analysis/prediction/{symbol}
Parameters:
  - timeframe: "1h" | "4h" | "1d"
  - model: "lstm" | "ensemble"

Response 200:
{
  "symbol": "BTC-USDT",
  "prediction": "66000.00",
  "confidence": 0.85,
  "timeframe": "1h",
  "model": "ensemble",
  "timestamp": "2024-03-21T09:30:00Z"
}
```

#### 3.2 Risk Analysis

```http
GET /api/v1/analysis/risk/{symbol}

Response 200:
{
  "symbol": "BTC-USDT",
  "var_95": "3200.00",
  "expected_shortfall": "3800.00",
  "volatility": "0.45",
  "timestamp": "2024-03-21T09:30:00Z"
}
```

## 🔄 WebSocket API

### 1. Market Data Stream

#### 1.1 Real-time Price Subscription

```javascript
// Connection
ws://api.example.com/ws/market

// Subscription message
{
  "action": "subscribe",
  "channel": "market",
  "symbols": ["BTC-USDT", "ETH-USDT"]
}

// Received data
{
  "symbol": "BTC-USDT",
  "price": "65432.10",
  "timestamp": "2024-03-21T09:30:00.123Z",
  "volume": "1.23"
}
```

#### 1.2 Orderbook Subscription

```javascript
// Subscription message
{
  "action": "subscribe",
  "channel": "orderbook",
  "symbol": "BTC-USDT",
  "depth": 10
}

// Received data
{
  "symbol": "BTC-USDT",
  "bids": [
    ["65000.00", "1.234"],
    ["64999.00", "2.345"]
  ],
  "asks": [
    ["65001.00", "1.234"],
    ["65002.00", "2.345"]
  ],
  "timestamp": "2024-03-21T09:30:00.123Z"
}
```

## 📊 Error Codes

### 1. HTTP Status Codes

```json
{
  "400": "잘못된 요청",
  "401": "인증 실패",
  "403": "권한 없음",
  "404": "리소스 없음",
  "429": "요청 한도 초과",
  "500": "서버 내부 오류"
}
```

### 2. Business Error Codes

```json
{
  "MARKET_001": "유효하지 않은 심볼",
  "MARKET_002": "거래소 연결 실패",
  "PORT_001": "잔액 부족",
  "PORT_002": "포지션 한도 초과",
  "AI_001": "모델 로딩 실패",
  "AI_002": "예측 실패"
}
```

## 📝 API Usage Examples

### 1. REST API Call

```python
import requests

# Market data retrieval
def get_market_price(symbol):
    url = f"https://api.example.com/v1/market/price/{symbol}"
    headers = {
        "Authorization": f"Bearer {token}",
        "X-API-Key": "your-api-key"
    }
    response = requests.get(url, headers=headers)
    return response.json()

# Position creation
def create_position(symbol, size):
    url = "https://api.example.com/v1/portfolio/positions"
    data = {
        "symbol": symbol,
        "size": size,
        "type": "long"
    }
    response = requests.post(url, json=data, headers=headers)
    return response.json()
```

### 2. WebSocket Connection

```javascript
const ws = new WebSocket("ws://api.example.com/ws/market");

ws.onopen = () => {
  ws.send(
    JSON.stringify({
      action: "subscribe",
      channel: "market",
      symbols: ["BTC-USDT"],
    })
  );
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(`${data.symbol}: ${data.price}`);
};
```

This document provides the API specification for the financial data analysis system. APIs are continuously updated, and the latest version can be viewed through the Swagger UI. 🚀
