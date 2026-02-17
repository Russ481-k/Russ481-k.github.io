---
title: "Building an Outsourcing Crawler with FastAPI and PostgreSQL"
date: "2025-02-12"
category: "backend"
description: "I created a crawler that collects and analyzes project information from freelance platforms in real-time. I built an efficient system using FastAPI's asynchronous processing and PostgreSQL's powerful features! "
tags:
  [
    "FastAPI",
    "PostgreSQL",
    "Python",
    "Crawler",
    "asyncio",
    "SQLAlchemy",
    "Async Processing",
    "Data Collection",
    "Real-time Processing",
  ]
thumbnail: "/images/fastapi.png"
---

# Implementing Asynchronous Database Operations with SQLAlchemy 

Hello! Today I'll share in detail how I implemented **asynchronous database operations** in my FastAPI crawler project.

## 1. Introduction 

Asynchronous processing has become a crucial element in modern web development. This is especially true for data-heavy applications like crawlers! In this post, I'll share my experience implementing asynchronous database operations using SQLAlchemy.

## 2. Why Did We Need Async Processing? 

When using synchronous processing, we faced several issues:

1. **Response Delays**: Couldn't perform other tasks while waiting for database responses
2. **Resource Waste**: Server resources weren't being used efficiently
3. **Scalability Limits**: Struggled to handle many concurrent requests

These problems made it necessary to implement asynchronous processing!

---

## 3. SQLAlchemy Async Configuration

### 3.1 Issues with Traditional Synchronous Approach

SQLAlchemy typically operates synchronously. However, this synchronous approach has several drawbacks:

- **I/O Blocking**: Application must wait for database responses
- **Performance Degradation**: Response times increase with concurrent requests
- **Limited Scalability**: Difficulty handling multiple operations effectively

We can address these issues using **SQLAlchemy's async mode**.

---

### 3.2 Setting Up SQLAlchemy for Async Operations

#### 1) Creating an Async Engine (`create_async_engine`)

```python
from sqlalchemy.ext.asyncio import create_async_engine

DATABASE_URL = "postgresql+asyncpg://user:password@localhost/dbname"
engine = create_async_engine(DATABASE_URL, echo=True)
```

#### 2) Creating an Async Session (`async_session`)

```python
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker

async_session = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)
```

#### 3) Database Operation Example (Async Mode)

```python
from models import User  # assumed model

async def get_user_by_id(user_id: int):
    async with async_session() as session:
        result = await session.get(User, user_id)
        return result
```

In the example above, we use `async_session` to asynchronously retrieve a user from the database.

---

## 4. Comparison with Traditional Synchronous Approach

| Approach             | Pros                            | Cons                               |
| -------------------- | ------------------------------- | ---------------------------------- |
| Synchronous (Sync)   | Simple code, familiar pattern   | Slow response, limited scalability |
| Asynchronous (Async) | Fast response, high concurrency | Slightly complex setup             |

Asynchronous processing is particularly useful when handling **API servers** or **crawlers** that require **large amounts of requests**.

---

## 5. Conclusion

In this post, we looked at the SQLAlchemy asynchronous configuration method. Next, we'll cover **integrating session management code** and **changing `database.py` to asynchronous mode**.

See you next time! 
