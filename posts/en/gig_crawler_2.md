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
    "Async Processing",
    "Data Collection",
    "Real-time Processing",
  ]
thumbnail: "/images/fastapi.png"
---

# Implementing Asynchronous Database Operations with SQLAlchemy 🔄

Hello! Today I'll share in detail how I implemented **asynchronous database operations** in my FastAPI crawler project.

## 1. Introduction 🎯

Asynchronous processing has become a crucial element in modern web development. This is especially true for data-heavy applications like crawlers! In this post, I'll share my experience implementing asynchronous database operations using SQLAlchemy.

## 2. Why Did We Need Async Processing? 🤔

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
