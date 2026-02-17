---
title: "Entasis Engine -  "
date: "2025-02-13"
category: "projects"
description: "    TimescaleDB  "
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

# PostgreSQL + TimescaleDB    

!   **PostgreSQL TimescaleDB**       .           .       **TimescaleDB  **   .   ! 

---

##  1.     (V1init_tables.sql)

,      **      ** .

###  exchanges  ( )

    .   ID, , API URL  .

```sql
CREATE TABLE exchanges (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    api_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);
```

###  symbols  (  )

  (: BTC/USDT, ETH/USDT )  .

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

##  2.      (V2create_market_tables.sql)

     **spot_market_data**  ,  TimescaleDB  .

###  spot_market_data 

       .

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

###  TimescaleDB  

 ,       .

```sql
SELECT create_hypertable('spot_market_data', 'time');
```

###   

       .

```sql
CREATE INDEX ON spot_market_data (symbol_id, time DESC);
```

---

##  3.      (V3create_futures_tables.sql)

       .  **(open_interest),  (funding_rate),  (mark_price),  (index_price)**    .

###  futures_market_data 

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

###  TimescaleDB  

```sql
SELECT create_hypertable('futures_market_data', 'time');
```

###   

```sql
CREATE INDEX ON futures_market_data (symbol_id, time DESC);
```

---

##  

  **         **. PostgreSQL  TimescaleDB       **      .** 

  **    **   ! 
