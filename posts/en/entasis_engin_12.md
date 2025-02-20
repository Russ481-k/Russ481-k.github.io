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
thumbnail: "/images/cryptocurrency.jpg"
---

# Building Financial Database with PostgreSQL + TimescaleDB

Hello! In this post, I'll share how we built a financial database using **PostgreSQL and TimescaleDB**. Efficiently storing and querying financial data is becoming increasingly important. Particularly when dealing with real-time market data, **TimescaleDB's hypertable functionality** is incredibly helpful. Let's dive in! 🚀

---

## 📌 1. Setting Up Basic Table Structure (V1init_tables.sql)

First, we created tables to systematically store **exchange information and trading symbol data**.

### 🔹 exchanges Table (Exchange Information)

This table stores unique information for each exchange, including basic exchange ID, name, API URL, etc.
