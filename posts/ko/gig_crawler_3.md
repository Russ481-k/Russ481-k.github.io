---
title: "FastAPI PostgreSQL    "
date: "2025-02-12"
category: "backend"
description: "        . FastAPI   PostgreSQL      ! "
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
  ]
thumbnail: "/images/fastapi.png"
---

# database.py      

, !  
   SQLAlchemy    ,    **database.py**     , **   **      .

        ,       .    !

---

## 1.   ?

,       .

- ** :**  
        .    ,           .
- ** :**  
           . ,      ,       .

             !

---

## 2.    database.py

  **database.py**    .  ,      :

```python
#  database.py ( )
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

     ,     **I/O **       .

---

## 3.   

     ,     .

### 3.1.   

   `sqlalchemy.ext.asyncio`  `create_async_engine`     .  
  URL `+asyncpg`     .

```python
from sqlalchemy.ext.asyncio import create_async_engine

DATABASE_URL = "postgresql+asyncpg://user:password@localhost/dbname"
engine = create_async_engine(DATABASE_URL, echo=True)
```

      !

### 3.2.     

,     `AsyncSession` `sessionmaker` .  
   `class_`  `AsyncSession` , `expire_on_commit=False`     .

```python
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker

async_session = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)
```

     ** **  .

### 3.3.     

  `async with`        .  
  `get_db`    ,         .

```python
async def get_db():
    async with async_session() as session:
        yield session
```

     `async with`     .  
    ,   .

---

## 4.    

          :

- ** :**  
           ,   .
- ** :**  
  `async with` ,        .
- ** :**  
        ,         .

---

## 5. 

 **database.py**    ,      .  
 ,  API     I/O        .

  **     **   .

    .    ! 

---

    ,      . !
