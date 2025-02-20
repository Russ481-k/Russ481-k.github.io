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
