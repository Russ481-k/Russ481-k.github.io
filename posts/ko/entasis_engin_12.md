---
title: "Entasis Engine - 데이터베이스 구축"
date: "2025-02-13"
category: "projects"
description: "가상자산 데이터베이스 구축 및 TimescaleDB 활용 가이드"
tags:
  [
    "database",
    "postgresql",
    "timescaledb",
    "schema",
    "sql",
    "data-modeling",
    "optimization",
  ]
thumbnail: ""
---

# PostgreSQL + TimescaleDB를 활용한 금융 데이터베이스 구축

안녕하세요! 이번 포스트에서는 **PostgreSQL과 TimescaleDB**를 활용해 금융 데이터베이스를 구축한 과정을 공유하려고 합니다. 최근 금융 데이터를 효율적으로 저장하고 조회하는 것이 점점 더 중요해지고 있는데요. 특히 실시간 시장 데이터를 다룰 때는 **TimescaleDB의 하이퍼테이블 기능**이 큰 도움이 됩니다. 그럼 하나씩 살펴보겠습니다! 🚀

---

## 📌 1. 기본 테이블 구조 설정 (V1init_tables.sql)

우선, 금융 데이터를 체계적으로 저장하기 위해 **거래소 정보와 거래 심볼 정보를 저장할 테이블**을 만들었습니다.

### 🔹 exchanges 테이블 (거래소 정보)

거래소마다 고유한 정보를 저장하는 테이블입니다. 기본적인 거래소 ID, 이름, API URL 등을 포함합니다.

```sql
CREATE TABLE exchanges (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    api_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);
```

### 🔹 symbols 테이블 (거래 심볼 정보)

거래소마다 지원하는 심볼(예: BTC/USDT, ETH/USDT 등)을 저장하는 테이블입니다.

```sql
CREATE TABLE symbols (
    id SERIAL PRIMARY KEY,
    exchange_id INTEGER REFERENCES exchanges(id) ON DELETE CASCADE,
    symbol TEXT NOT NULL,
    base_currency TEXT NOT NULL,
    quote_currency TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);
```

---

## 📌 2. 현물 시장 데이터 테이블 생성 (V2create_market_tables.sql)

현물 시장 데이터를 저장하기 위해 **spot_market_data** 테이블을 생성하고, 이를 TimescaleDB 하이퍼테이블로 변환했습니다.

### 🔹 spot_market_data 테이블

이 테이블은 실시간 가격 변동을 저장하는 역할을 합니다.

```sql
CREATE TABLE spot_market_data (
    time TIMESTAMPTZ NOT NULL,
    symbol_id INTEGER REFERENCES symbols(id) ON DELETE CASCADE,
    price DECIMAL(18, 8) NOT NULL,
    volume DECIMAL(18, 8) NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    PRIMARY KEY (time, symbol_id)
);
```

### 🔹 TimescaleDB 하이퍼테이블 변환

하이퍼테이블을 생성하면, 시계열 데이터에 최적화된 성능을 제공할 수 있습니다.

```sql
SELECT create_hypertable('spot_market_data', 'time');
```

### 🔹 인덱스 생성

데이터 조회 속도를 높이기 위해 필요한 인덱스를 추가했습니다.

```sql
CREATE INDEX ON spot_market_data (symbol_id, time DESC);
```

---

## 📌 3. 선물 시장 데이터 테이블 생성 (V3create_futures_tables.sql)

선물 시장 데이터는 현물보다 저장해야 할 정보가 많습니다. 특히 **미결제약정(open_interest), 펀딩 비율(funding_rate), 마크 가격(mark_price), 지수 가격(index_price)** 같은 추가적인 정보가 포함됩니다.

### 🔹 futures_market_data 테이블

```sql
CREATE TABLE futures_market_data (
    time TIMESTAMPTZ NOT NULL,
    symbol_id INTEGER REFERENCES symbols(id) ON DELETE CASCADE,
    price DECIMAL(18, 8) NOT NULL,
    volume DECIMAL(18, 8) NOT NULL,
    open_interest DECIMAL(18, 8),
    funding_rate DECIMAL(18, 8),
    mark_price DECIMAL(18, 8),
    index_price DECIMAL(18, 8),
    created_at TIMESTAMP DEFAULT now(),
    PRIMARY KEY (time, symbol_id)
);
```

### 🔹 TimescaleDB 하이퍼테이블 변환

```sql
SELECT create_hypertable('futures_market_data', 'time');
```

### 🔹 인덱스 생성

```sql
CREATE INDEX ON futures_market_data (symbol_id, time DESC);
```

---

## 📌 마무리하며

이렇게 해서 **현물 및 선물 시장 데이터를 저장하는 기본 데이터베이스 구조를 구축**했습니다. PostgreSQL의 안정성과 TimescaleDB의 강력한 시계열 데이터 처리 기능을 활용하면 **빠른 조회와 확장성을 동시에 확보할 수 있습니다.** 💡

다음 포스트에서는 **실제 데이터를 수집하고 저장하는 과정**을 다룰 예정이니 기대해주세요! 🤗
