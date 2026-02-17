---
title: "Entasis Engine -  "
date: "2025-02-12"
category: "projects"
description: "        "
tags:
  [
    "database",
    "schema",
    "postgresql",
    "timescaledb",
    "erd",
    "indexing",
    "partitioning",
  ]
thumbnail: ""
---

#      

## 데이터베이스 아키텍처

### 1.   

- **PostgreSQL**:    RDBMS
- **TimescaleDB**:     
- ****:    

### 2.   

#### 2.1 Market Data Tables

```sql
--   
CREATE TABLE market_data (
    id BIGSERIAL PRIMARY KEY,
    symbol VARCHAR(20) NOT NULL,
    exchange VARCHAR(20) NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    price DECIMAL(20,8) NOT NULL,
    volume DECIMAL(20,8) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
) PARTITION BY RANGE (timestamp);

--  
CREATE TABLE option_data (
    id BIGSERIAL PRIMARY KEY,
    underlying VARCHAR(20) NOT NULL,
    strike_price DECIMAL(20,8) NOT NULL,
    expiry_date TIMESTAMPTZ NOT NULL,
    option_type VARCHAR(4) NOT NULL,
    iv DECIMAL(10,4),
    delta DECIMAL(10,4),
    gamma DECIMAL(10,4),
    theta DECIMAL(10,4),
    vega DECIMAL(10,4),
    timestamp TIMESTAMPTZ NOT NULL
) PARTITION BY RANGE (timestamp);
```

#### 2.2   

```sql
-- AI   
CREATE TABLE predictions (
    id BIGSERIAL PRIMARY KEY,
    model_id VARCHAR(50) NOT NULL,
    symbol VARCHAR(20) NOT NULL,
    prediction_type VARCHAR(20) NOT NULL,
    predicted_value DECIMAL(20,8) NOT NULL,
    confidence DECIMAL(5,4) NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL
);

--  
CREATE TABLE portfolio_status (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    asset_type VARCHAR(20) NOT NULL,
    position_size DECIMAL(20,8) NOT NULL,
    entry_price DECIMAL(20,8) NOT NULL,
    current_price DECIMAL(20,8) NOT NULL,
    pnl DECIMAL(20,8) NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL
);
```

### 3.  

#### 3.1   

```sql
--    
CREATE INDEX idx_market_data_symbol_timestamp ON market_data (symbol, timestamp DESC);
CREATE INDEX idx_market_data_exchange_timestamp ON market_data (exchange, timestamp DESC);

--    
CREATE INDEX idx_option_data_underlying_expiry ON option_data (underlying, expiry_date);
CREATE INDEX idx_option_data_strike_type ON option_data (strike_price, option_type);
```

#### 3.2   

```sql
--    
CREATE INDEX idx_predictions_model_symbol ON predictions (model_id, symbol);
CREATE INDEX idx_predictions_timestamp ON predictions (timestamp DESC);

--   
CREATE INDEX idx_portfolio_user_timestamp ON portfolio_status (user_id, timestamp DESC);
```

### 4.  

#### 4.1   

```sql
--   
CREATE TABLE market_data_y2024m01 PARTITION OF market_data
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
CREATE TABLE market_data_y2024m02 PARTITION OF market_data
    FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');
```

#### 4.2  

-  :  3
-  :  1
-  : S3 

##   

### 1.  

#### 1.1   

```sql
--   OHLCV  
CREATE MATERIALIZED VIEW mv_ohlcv_1h AS
SELECT
    symbol,
    date_trunc('hour', timestamp) as timeframe,
    first(price) as open,
    max(price) as high,
    min(price) as low,
    last(price) as close,
    sum(volume) as volume
FROM market_data
GROUP BY symbol, timeframe;
```

#### 1.2  

- Redis   
-    
-      

### 2.  

#### 2.1  

-   
-   
-  

#### 2.2  

- Point-in-Time Recovery 
-    
-   

## 데이터 흐름

### 1.  

```mermaid
graph LR
    A[ API] --> B[ ]
    B --> C[ ]
    C --> D[TimescaleDB]
    D --> E[ ]
```

### 2.  

- 실시간 스트림 처리
- 배치 처리
- 이상치 탐지 및 처리

## ⚡ 확장성 고려사항

### 1. 수평적 확장

- 읽기 전용 복제본 구성
- 샤딩 전략 수립
- 로드 밸런싱 설정

### 2. 수직적 확장

- 리소스 모니터링
- 성능 지표 설정
- 스케일 업 임계값 정의

이 문서는 금융 데이터 분석 시스템의 데이터베이스 설계 기준을 제공합니다. 시스템의 요구사항과 성능을 고려하여 지속적으로 업데이트될 예정입니다.
