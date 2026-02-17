---
title: "Outsourcing Crawler Development using FastAPI and PostgreSQL"
date: "2025-02-12"
category: "backend"
description: "Building a crawler system to collect project information from domestic and international freelance platforms using FastAPI and PostgreSQL"
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

# Getting Started: Setting up FastAPI and PostgreSQL Environment 

Hello! Today I'll share how I set up the FastAPI and PostgreSQL environment for developing a freelance project crawler.

### **The Easiest Way to Connect FastAPI and PostgreSQL! **

Hi there! I'll explain how to connect **FastAPI** and **PostgreSQL** in a simple way.
New to **FastAPI**? Don't worry! You'll understand quickly if you follow along step by step. 

---

## **1. Creating Basic Project Structure**

First, let's organize the project folder like this:

```
backend/
 .env                  # environment variable settings
 requirements.txt      # list of required packages
 app/
     main.py          # FastAPI main application
     config.py        # configuration file
     models/          # SQLAlchemy model files
     schemas/         # Pydantic schema files
     api/             # API endpoints
     db/              # database related files
```

Let's set it up one by one! 

---

## **2. Install Required Packages**

To connect FastAPI and PostgreSQL, we need several packages.  
First, create the `requirements.txt` file and add the following contents.

```text
fastapi==0.104.1
uvicorn==0.24.0
sqlalchemy==2.0.23
pydantic==2.5.2
pydantic-settings==2.1.0
python-dotenv==1.0.0
psycopg2-binary==2.9.9
```

Run the following command in the terminal to install all packages at once! 

```bash
pip install -r requirements.txt
```

---

## **3. Setting up environment variables (create .env file)**

We will save the PostgreSQL connection information in the `.env` file.  
Create the `.env` file and input the following contents.

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres123
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=gig_crawler
```

** Why do we set it up this way?**  
 To ensure security and maintainability, it is better to manage the DB information in the code as environment variables rather than directly in the code.

---

## **4. Setting up configuration (create config.py file)**

Let's create the `config.py` file to get the environment variables from the `.env` file.

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

Now, we can get the environment variables like `settings.POSTGRES_USER`! 

---

## **5. Setting up database connection (create database.py file)**

Let's create the `database.py` file to connect to **PostgreSQL**.

```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from ..config import settings
from urllib.parse import quote_plus

# Create a database connection string using URL encoding
password = quote_plus(settings.POSTGRES_PASSWORD)
DATABASE_URL = f"postgresql://{settings.POSTGRES_USER}:{password}@{settings.POSTGRES_HOST}:{settings.POSTGRES_PORT}/{settings.POSTGRES_DB}"

# Create an SQLAlchemy engine
engine = create_engine(
    DATABASE_URL,
    echo=True,  # For checking SQL queries
    pool_pre_ping=True,
    connect_args={'application_name': 'gig_crawler'}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
```

---

## **6. Setting up FastAPI app (create main.py file)**

Let's create the `main.py` file to run the FastAPI server.

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Project Crawler API")

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI & PostgreSQL!"}
```

Now, if you access `http://localhost:8000/`, you should see the **"Hello, FastAPI & PostgreSQL!"** message!

---

## **7. Create a PostgreSQL database**

Let's create the database to be used in PostgreSQL.  
Run `psql` in the terminal and input the following command.

```sql
CREATE DATABASE gig_crawler WITH ENCODING 'UTF8' LC_COLLATE='Korean_Korea.949' LC_CTYPE='Korean_Korea.949';
```

Now, the database is ready! 

---

## **8. Run the server! **

This is the final step!  
Run the following command to turn on the FastAPI server.

```bash
uvicorn app.main:app --reload
```

The terminal should show **"Uvicorn running on http://127.0.0.1:8000"** message.  
Now, if you access `http://127.0.0.1:8000/docs`, you can see the API documentation automatically generated.

---

## **9. Conclusion **

So far, we've set up the **FastAPI + PostgreSQL** connection!  
If you encounter any issues while running, please check the following:

 Did you save the `.env` file in UTF-8?  
 Is the PostgreSQL server running?  
 Is the database created?  
 Did you run the `uvicorn app.main:app --reload` command?

Now, add **CRUD API** to this and create the project you want!   
If you have any questions, feel free to ask anytime! 
