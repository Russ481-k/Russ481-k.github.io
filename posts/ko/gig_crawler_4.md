---
title: "FastAPI PostgreSQL    "
date: "2025-02-12"
category: "backend"
description: "      !   ,   ,         . "
tags:
  [
    "FastAPI",
    "PostgreSQL",
    "Python",
    "Crawler",
    "asyncio",
    "SQLAlchemy",
    "",
    "",
    "",
    "",
    "",
    "ORM",
    "",
  ]
thumbnail: "/images/fastapi.png"
---

#   :    

, !  
         ,   **  **   .    ,        .     ?

---

## 1.    ?

      .  :

- **budget   :**  
       , /     .

- **metadata :**  
  SQLAlchemy `metadata`  ,      .

- **  :**  
     `currency`, `posted_date`, `deadline`, `skills`   .

 ,       .

---

## 2.   

### 2.1   : budget_min & budget_max

  `budget`    ,  
        .  
  , ,       .

```python
from sqlalchemy import Column, Integer

class Project(Base):
    __tablename__ = 'projects'

    id = Column(Integer, primary_key=True, index=True)
    #  budget  ->   
    budget_min = Column(Integer, nullable=False)
    budget_max = Column(Integer, nullable=False)
```

### 2.2   : metadata → project_metadata

SQLAlchemy  `metadata` ,      `project_metadata` .

```python
from sqlalchemy import Column, JSON

class Project(Base):
    __tablename__ = 'projects'

    id = Column(Integer, primary_key=True, index=True)
    #     
    project_metadata = Column(JSON, nullable=True)
```

### 2.3   

           .

- **currency:**    
- **posted_date:**   
- **deadline:**   
- **skills:**     

```python
from sqlalchemy import Column, String, DateTime
import datetime

class Project(Base):
    __tablename__ = 'projects'

    id = Column(Integer, primary_key=True, index=True)
    budget_min = Column(Integer, nullable=False)
    budget_max = Column(Integer, nullable=False)
    project_metadata = Column(JSON, nullable=True)

    #   
    currency = Column(String, default='USD')
    posted_date = Column(DateTime, default=datetime.datetime.utcnow)
    deadline = Column(DateTime, nullable=True)
    skills = Column(String, nullable=True)  # : "Python, JavaScript, SQL"
```

  ,             .

---

## 3.   

- **  :**  
    /        .
- **  :**  
  `project_metadata`    SQLAlchemy    .
- **  :**  
           ,      .

---

## 4. 

       .  
            .  
   **  **  **  ** ,         !

           .     . ! 

---

  !
