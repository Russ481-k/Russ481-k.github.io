---
title: "Building an Outsourcing Crawler with FastAPI and PostgreSQL"
date: "2025-02-12"
category: "backend"
description: "I created a crawler that collects and analyzes project information from freelance platforms in real-time. I built an efficient system using FastAPI's asynchronous processing and PostgreSQL's powerful features! 🚀"
tags:
  [
    "FastAPI",
    "PostgreSQL",
    "Python",
    "Crawler",
    "asyncio",
    "SQLAlchemy",
    "async processing",
    "data collection",
    "real-time processing",
  ]
thumbnail: "/images/fastapi.png"
---

# Converting database.py to Async and Integrating Session Management

Hello everyone!  
In our last post, we looked at SQLAlchemy's async configuration. Today, we'll dive deeper into how to convert our **database.py** file to async mode and integrate session management code.

By introducing async processing, we can reduce database operation wait times and efficiently handle multiple requests simultaneously. Let's take a look step by step!

---

## 1. Why Async?

First, let's briefly cover the difference between synchronous and asynchronous approaches:

- **Synchronous:**  
  When making a database request, you have to wait for the result to return. This can cause bottlenecks when there are many requests, as other tasks must wait for the current one to complete.
- **Asynchronous:**  
  You can continue with other tasks after sending a database request. This means you don't have to wait for one task to finish before starting another, allowing for more efficient handling of multiple operations.

Async processing can significantly improve our application's response time and concurrent processing capabilities!

---

## 2. Original Synchronous database.py

Our original **database.py** was written synchronously. For example, we created the database engine and session like this:

```python
# Original database.py (synchronous mode)
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://user:password@localhost/dbname"

engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

This approach has the advantage of being simple to implement, but when many requests come in, **I/O blocking** occurs, causing performance degradation.

---

## 3. Change to Asynchronous Mode

Now, let's switch to the asynchronous mode. I'll go through the main changes one by one.

### 3.1. Create an Asynchronous Engine

Instead of using the synchronous `create_engine` function, use the `create_async_engine` function from the `sqlalchemy.ext.asyncio` module to create an asynchronous engine.  
First, add `+asyncpg` to the database URL to use the asynchronous driver.

```python
from sqlalchemy.ext.asyncio import create_async_engine

DATABASE_URL = "postgresql+asyncpg://user:password@localhost/dbname"
engine = create_async_engine(DATABASE_URL, echo=True)
```

Now, the engine is optimized for asynchronous processing and ready to go!

### 3.2. Create an Asynchronous Session

Next, use `AsyncSession` and `sessionmaker` to create an asynchronous session.  
Unlike the synchronous code, specify `AsyncSession` in the `class_` parameter and use the `expire_on_commit=False` option to prevent the session from expiring.

```python
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker

async_session = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)
```

Now, all database requests will use this **asynchronous session**.

### 3.3. Implement the Asynchronous Session Management Function

In the asynchronous mode, it is important to safely open and close the session using the `async with` statement.  
You can implement it by changing the `get_db` function to an asynchronous generator, which opens the session, uses it, and automatically closes it after the operation is complete.

```python
async def get_db():
    async with async_session() as session:
        yield session
```

This code ensures that the session is closed cleanly when the database operation is complete.  
Even if an exception occurs, the resources are automatically cleaned up, ensuring stable operation.

---

## 4. Benefits of Integrating Session Management

When integrating the session management code, we can achieve the following benefits:

- **Clarity:**  
  All database access uses the same asynchronous session management logic, making the code much cleaner.
- **Stability:**  
  Using `async with` ensures that the session is automatically closed even if an exception occurs, preventing resource leaks.
- **Ease of Maintenance:**  
  The session management code is all in one place, so it is easy to manage future modifications or extensions.

---

## 5. Conclusion

Today, we looked at how to convert the **database.py** file to asynchronous mode and integrate session management code.  
By doing this, we can handle database I/O operations in API servers or crawlers much more efficiently.

Next, we will cover **improving project models and updating fields**.

Your feedback is a great help! See you next time! 🚀

---

I hope this article was helpful, and I will continue to share improved technologies. Thank you!
