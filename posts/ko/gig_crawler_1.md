---
title: "FastAPI PostgreSQL    "
date: "2025-02-12"
category: "backend"
description: "FastAPI PostgreSQL           "
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

#  : FastAPI PostgreSQL   

!       FastAPI PostgreSQL    .

### **FastAPI PostgreSQL    ! **

!  **FastAPI** **PostgreSQL**    .  
 **FastAPI**  ?   !     . 

---

## **1.    **

,    .

```
backend/
 .env                  #   
 requirements.txt      #   
 app/
     main.py          # FastAPI  
     config.py        #  
     models/          # SQLAlchemy  
     schemas/         # Pydantic  
     api/             # API 
     db/              #   
```

  ! 

---

## **2.   **

FastAPI PostgreSQL     .  
 `requirements.txt`     .

```text
fastapi==0.104.1
uvicorn==0.24.0
sqlalchemy==2.0.23
pydantic==2.5.2
pydantic-settings==2.1.0
python-dotenv==1.0.0
psycopg2-binary==2.9.9
```

       ! 

```bash
pip install -r requirements.txt
```

---

## **3.    (.env  )**

PostgreSQL   `.env`   .  
`.env`     .

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres123
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=gig_crawler
```

**   ?**  
      DB        !

---

## **4.   (config.py )**

 `.env`        `config.py`  .

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_HOST: str
    POSTGRES_PORT: str
    POSTGRES_DB: str

    class Config:
        env_file = ".env"

settings = Settings()
```

 `settings.POSTGRES_USER`       ! 

---

## **5.    (database.py )**

  **PostgreSQL**  `database.py`  .

```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from ..config import settings
from urllib.parse import quote_plus

# URL   DB   
password = quote_plus(settings.POSTGRES_PASSWORD)
DATABASE_URL = f"postgresql://{settings.POSTGRES_USER}:{password}@{settings.POSTGRES_HOST}:{settings.POSTGRES_PORT}/{settings.POSTGRES_DB}"

# SQLAlchemy  
engine = create_engine(
    DATABASE_URL,
    echo=True,  # SQL   
    pool_pre_ping=True,
    connect_args={'application_name': 'gig_crawler'}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
```

---

## **6. FastAPI   (main.py )**

 FastAPI   `main.py`  .

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Project Crawler API")

# CORS 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  #  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI & PostgreSQL!"}
```

 `http://localhost:8000/`   **"Hello, FastAPI & PostgreSQL!"**   !

---

## **7. PostgreSQL  **

 PostgreSQL   .  
 `psql`  ,   .

```sql
CREATE DATABASE gig_crawler WITH ENCODING 'UTF8' LC_COLLATE='Korean_Korea.949' LC_CTYPE='Korean_Korea.949';
```

  ! 

---

## **8.  ! **

  !  
   FastAPI  ?

```bash
uvicorn app.main:app --reload
```

 **"Uvicorn running on http://127.0.0.1:8000"**    !  
  `http://127.0.0.1:8000/docs`   API       .

---

## ** **

 **FastAPI + PostgreSQL**  !  
       .

 `.env`  UTF-8 ?  
 PostgreSQL   ?  
   ?  
 `uvicorn app.main:app --reload`  ?

  **CRUD API**    !   
    ~! 
