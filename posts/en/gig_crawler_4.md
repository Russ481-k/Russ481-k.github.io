---
title: "Building an Outsourcing Crawler with FastAPI and PostgreSQL"
date: "2025-02-12"
category: "backend"
description: "I improved the data model and structure of the crawler project! With budget field separation, metadata field improvements, and new field additions, more systematic data management is now possible. 🔧"
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
    "Data Modeling",
    "Refactoring",
    "ORM",
    "Data Structure",
  ]
thumbnail: "/images/fastapi.png"
---

# Project Model Improvement: Organizing Structure and Fields

Hello everyone!  
In previous posts, we looked at asynchronous database processing and session management integration. In this post, I'd like to discuss **project model improvements**. The data model is core to the application, and a well-organized model greatly helps with maintenance and scalability. Let's examine the improvement points step by step!

---

## 1. Why Do We Need Model Improvements?

We discovered several issues while using the existing model. For example:

- **Managing budget in a single field:**  
  Trying to manage budget information in one field made it difficult to utilize minimum/maximum budget values separately.

- **Field name 'metadata':**  
  Since 'metadata' is a reserved word in SQLAlchemy, using it for other purposes could risk conflicts.

- **Reflecting new requirements:**  
  Additional information like `currency`, `posted_date`, `deadline`, `skills` became necessary for project information.

For these reasons, we wanted to make the model more granular and clearer.

---

## 2. Specific Improvements

### 2.1 Separating Budget Fields: budget_min & budget_max

While we previously stored budget information in a single `budget` field,  
we'll now manage minimum and maximum budgets as separate fields.  
This allows for more precise usage in searching, filtering, and sorting.
