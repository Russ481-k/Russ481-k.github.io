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

# SQLAlchemy     

!  FastAPI   **  **    .

## 1.  

        .        !    SQLAlchemy       .

## 2.    ? 

        :

1. ** **:       
2. ** **:     
3. ** **:      

       !

---

## 3. SQLAlchemy  

### 3.1    

 SQLAlchemy   .      .

- **I/O **:       
- ** **:       
- ** **:     

   **SQLAlchemy  **   .

---

### 3.2 SQLAlchemy   

#### 1)    (`create_async_engine`)

```python
from sqlalchemy.ext.asyncio import create_async_engine

DATABASE_URL = "postgresql+asyncpg://user:password@localhost/dbname"
engine = create_async_engine(DATABASE_URL, echo=True)
```

#### 2)    (`async_session`)

```python
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker

async_session = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)
```

#### 3)    ( )

```python
from models import User  #  

async def get_user_by_id(user_id: int):
    async with async_session() as session:
        result = await session.get(User, user_id)
        return result
```

  `async_session`     .

---

## 4.    

|                   |                         |                         |
| --------------------- | --------------------------- | --------------------------- |
|  (Synchronous)    |  ,      |   ,   |
|  (Asynchronous) |  ,    |             |

   **   API ** ****    .

---

## 5. 

  SQLAlchemy    .   `database.py`   , **   **  ! 

  ! 
