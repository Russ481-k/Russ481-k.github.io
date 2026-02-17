---
title: "Building an Outsourcing Crawler with FastAPI and PostgreSQL"
date: "2025-02-12"
category: "backend"
description: "I improved the data model and structure of the crawler project! With budget field separation, metadata field improvements, and new field additions, more systematic data management is now possible. "
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

```python
from sqlalchemy import Column, Integer

class Project(Base):
    __tablename__ = 'projects'

    id = Column(Integer, primary_key=True, index=True)
    # Existing budget field -> split into two
    budget_min = Column(Integer, nullable=False)
    budget_max = Column(Integer, nullable=False)
```

### 2.2 Resolving Reserved Word Collision: metadata → project_metadata

Instead of using the reserved word `metadata` in SQLAlchemy,  
we'll use `project_metadata` to avoid confusion.

```python
from sqlalchemy import Column, JSON

class Project(Base):
    __tablename__ = 'projects'

    id = Column(Integer, primary_key=True, index=True)
    # To resolve the reserved word problem, we'll change it
    project_metadata = Column(JSON, nullable=True)
```

### 2.3 Adding New Fields

To represent more detailed project information, we added several new fields.

- **currency:** Field representing the budget unit
- **posted_date:** Field representing the project posting date
- **deadline:** Field representing the project deadline
- **skills:** Field representing the technical stack needed for the project

```python
from sqlalchemy import Column, String, DateTime
import datetime

class Project(Base):
    __tablename__ = 'projects'

    id = Column(Integer, primary_key=True, index=True)
    budget_min = Column(Integer, nullable=False)
    budget_max = Column(Integer, nullable=False)
    project_metadata = Column(JSON, nullable=True)

    # Added new fields
    currency = Column(String, default='USD')
    posted_date = Column(DateTime, default=datetime.datetime.utcnow)
    deadline = Column(DateTime, nullable=True)
    skills = Column(String, nullable=True)  # For example: "Python, JavaScript, SQL"
```

By improving the model, data is more structured and clearly managed, which will be helpful for future queries or data analysis.

---

## 3. Benefits of Improved Model

- **Clear data representation:**  
  By separating budget information into minimum/maximum values,  
  it is possible to search and compare various ranges.
- **Avoiding reserved word collisions:**  
  By using the clear field name `project_metadata`,  
  we avoided conflicts with reserved words in SQLAlchemy.
- **Extensible model:**  
  By adding additional fields,  
  we can represent project information more richly and flexibly.

---

## 4. Conclusion

In this article, we looked at the project model improvements in detail.  
Managing the database model systematically is a big influence on the long-term maintenance and performance improvement of the application.  
In the remaining articles, we will introduce more improvements such as **crawler scheduler implementation** and **encryption system introduction**, so please look forward to it!

If you have any additional points or questions about the improvements, please leave a comment anytime. Your feedback is a big help! 

---

See you next time!
