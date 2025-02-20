---
title: "Entasis Engine - Database Design"
date: "2025-02-12"
category: "projects"
description: "Database schema and design documentation for digital asset data analysis system"
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
thumbnail: "/images/cryptocurrency.jpg"
---

# Financial Data Analysis System Database Design

## 📊 Database Architecture

### 1. Database Selection Rationale

- **PostgreSQL**: RDBMS proven for stability and scalability
- **TimescaleDB**: Extension optimized for time-series data processing
- **Partitioning**: Efficient management of large-scale data

### 2. Core Table Structures

#### 2.1 Market Data Tables
