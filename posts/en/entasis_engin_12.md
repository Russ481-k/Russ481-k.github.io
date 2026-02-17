---
title: "Entasis Engine - Database Setup"
date: "2025-02-13"
category: "projects"
description: "Guide for setting up digital asset database and utilizing TimescaleDB"
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

# Building Financial Database with PostgreSQL + TimescaleDB

Hello! In this post, I'll share how we built a financial database using **PostgreSQL and TimescaleDB**. Efficiently storing and querying financial data is becoming increasingly important. Particularly when dealing with real-time market data, **TimescaleDB's hypertable functionality** is incredibly helpful. Let's dive in! 

---

##  1. Setting Up Basic Table Structure (V1init_tables.sql)

First, we created tables to systematically store **exchange information and trading symbol data**.

###  exchanges Table (Exchange Information)

This table stores unique information for each exchange, including basic exchange ID, name, API URL, etc.

```sql
CREATE TABLE exchanges (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    api_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);
```

###  symbols table (Trading Symbol Information)

This table stores the trading symbols supported by each exchange (e.g., BTC/USDT, ETH/USDT, etc.).

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

##  2. Create Market Data Tables (V2create_market_tables.sql)

To store spot market data, we created the **spot_market_data** table and converted it to a TimescaleDB hypertable.

###  spot_market_data table

This table stores real-time price fluctuations.

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

###  TimescaleDB Hypertable Conversion

Creating a hypertable will provide optimized performance for time-series data.

```sql
SELECT create_hypertable('spot_market_data', 'time');
```

###  Create Index

To increase data retrieval speed, we added the necessary indexes.

```sql
CREATE INDEX ON spot_market_data (symbol_id, time DESC);
```

---

##  3. Create Futures Market Data Tables (V3create_futures_tables.sql)

Futures market data requires storing more information than spot market data. Particularly, it includes additional information such as **unsettled contracts (open_interest), funding rate (funding_rate), mark price (mark_price), and index price (index_price).**

###  futures_market_data table

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

###  TimescaleDB Hypertable Conversion

```sql
SELECT create_hypertable('futures_market_data', 'time');
```

###  Create Index

```sql
CREATE INDEX ON futures_market_data (symbol_id, time DESC);
```

---

##  4. Conclusion

We successfully built the basic database structure to store spot and futures market data. By leveraging the stability of PostgreSQL and the powerful time-series data processing capabilities of TimescaleDB, we can achieve both fast retrieval and scalability. 

Next post will cover the process of collecting and storing actual data. Stay tuned! 
