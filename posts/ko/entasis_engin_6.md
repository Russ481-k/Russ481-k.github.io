---
title: "Entasis Engine - API "
date: "2025-02-12"
category: "projects"
description: "    RESTful API  WebSocket "
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
thumbnail: ""
---

#     API 

##    

### 1.  

#### 1.1 JWT 

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 1.2 API Key 

```json
{
  "X-API-Key": "your-api-key-here"
}
```

### 2.  

- Rate Limiting: 1000 requests/minute
- IP Whitelisting 
- SSL/TLS 

##  RESTful API 

### 1.   API

#### 1.1   

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

#### 1.2   

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

### 2.  API

#### 2.1  

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

#### 2.2  

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

### 3. AI  API

#### 3.1  

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

#### 3.2  

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

## WebSocket API

### 1.   

#### 1.1   

```javascript
// 
ws://api.example.com/ws/market

//  
{
  "action": "subscribe",
  "channel": "market",
  "symbols": ["BTC-USDT", "ETH-USDT"]
}

//  
{
  "symbol": "BTC-USDT",
  "price": "65432.10",
  "timestamp": "2024-03-21T09:30:00.123Z",
  "volume": "1.23"
}
```

#### 1.2  

```javascript
//  
{
  "action": "subscribe",
  "channel": "orderbook",
  "symbol": "BTC-USDT",
  "depth": 10
}

//  
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

## 에러 코드

### 1. HTTP  

```json
{
  "400": " ",
  "401": " ",
  "403": " ",
  "404": " ",
  "429": "  ",
  "500": "  "
}
```

### 2.   

```json
{
  "MARKET_001": "  ",
  "MARKET_002": "  ",
  "PORT_001": " ",
  "PORT_002": "  ",
  "AI_001": "  ",
  "AI_002": " "
}
```

## API 사용 예시

### 1. REST API 

```python
import requests

#   
def get_market_price(symbol):
    url = f"https://api.example.com/v1/market/price/{symbol}"
    headers = {
        "Authorization": f"Bearer {token}",
        "X-API-Key": "your-api-key"
    }
    response = requests.get(url, headers=headers)
    return response.json()

#  
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

### 2. WebSocket 

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

이 문서는 금융 데이터 분석 시스템의 API 명세를 제공합니다. API는 지속적으로 업데이트되며, 최신 버전은 Swagger UI를 통해 확인할 수 있습니다.
