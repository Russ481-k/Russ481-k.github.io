---
title: "FastAPI와 PostgreSQL을 활용한 아웃소싱 크롤러 개발"
date: "2025-02-12"
category: "backend"
description: "프리랜서 플랫폼의 프로젝트 정보를 실시간으로 수집하고 분석하는 크롤러를 만들어보았어요. FastAPI의 비동기 처리와 PostgreSQL의 강력한 기능을 활용해서 효율적인 시스템을 구축했답니다! 🚀"
tags:
  [
    "FastAPI",
    "PostgreSQL",
    "Python",
    "Crawler",
    "asyncio",
    "SQLAlchemy",
    "비동기처리",
    "데이터수집",
    "실시간처리",
  ]
thumbnail: "/images/fastapi.png"
---

# 프로젝트 시작하기: FastAPI와 PostgreSQL 환경 설정 🛠️

안녕하세요! 오늘은 프리랜서 프로젝트 크롤러 개발을 시작하면서 FastAPI와 PostgreSQL 환경을 어떻게 설정했는지 공유해볼게요.

### **FastAPI와 PostgreSQL을 연동하는 가장 쉬운 방법! 🚀**

안녕하세요! 이번에는 **FastAPI**와 **PostgreSQL**을 연결하는 방법을 쉽게 설명해드릴게요.  
혹시 **FastAPI**를 처음 써보신다면? 너무 걱정하지 마세요! 차근차근 따라오시면 금방 이해하실 거예요. 😃

---

## **1. 프로젝트 기본 구조 만들기**

먼저, 프로젝트 폴더를 아래처럼 구성해볼게요.

```
backend/
├── .env                  # 환경 변수 설정
├── requirements.txt      # 필요한 패키지 리스트
└── app/
    ├── main.py          # FastAPI 메인 애플리케이션
    ├── config.py        # 설정 파일
    ├── models/          # SQLAlchemy 모델 파일들
    ├── schemas/         # Pydantic 스키마 파일들
    ├── api/             # API 엔드포인트
    └── db/              # 데이터베이스 관련 파일
```

이제 하나씩 설정해봅시다! 😊

---

## **2. 필요한 패키지 설치하기**

FastAPI와 PostgreSQL을 연동하려면 몇 가지 패키지가 필요해요.  
먼저 `requirements.txt` 파일을 만들어서 아래 내용을 추가해주세요.

```text
fastapi==0.104.1
uvicorn==0.24.0
sqlalchemy==2.0.23
pydantic==2.5.2
pydantic-settings==2.1.0
python-dotenv==1.0.0
psycopg2-binary==2.9.9
```

그리고 터미널에서 아래 명령어를 실행하면 한 번에 설치됩니다! 🎯

```bash
pip install -r requirements.txt
```

---

## **3. 환경 변수 설정 (.env 파일 만들기)**

PostgreSQL 연결 정보를 `.env` 파일에 저장할 거예요.  
`.env` 파일을 만들어서 아래 내용을 입력해주세요.

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres123
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=gig_crawler
```

**✅ 왜 이렇게 설정할까요?**  
👉 보안과 유지보수를 위해 코드에 직접 DB 정보를 적지 않고 환경 변수로 관리하는 게 좋아요!

---

## **4. 설정 관리 (config.py 만들기)**

이제 `.env` 파일에 있는 환경 변수를 가져올 수 있도록 `config.py` 파일을 만들어봅시다.

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

이제 `settings.POSTGRES_USER` 이런 식으로 환경 변수를 불러올 수 있어요! 🎉

---

## **5. 데이터베이스 연결 설정 (database.py 만들기)**

이제 본격적으로 **PostgreSQL**과 연결할 `database.py` 파일을 만들어볼게요.

```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from ..config import settings
from urllib.parse import quote_plus

# URL 인코딩을 사용한 DB 연결 문자열 만들기
password = quote_plus(settings.POSTGRES_PASSWORD)
DATABASE_URL = f"postgresql://{settings.POSTGRES_USER}:{password}@{settings.POSTGRES_HOST}:{settings.POSTGRES_PORT}/{settings.POSTGRES_DB}"

# SQLAlchemy 엔진 생성
engine = create_engine(
    DATABASE_URL,
    echo=True,  # SQL 쿼리 로그 확인용
    pool_pre_ping=True,
    connect_args={'application_name': 'gig_crawler'}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
```

---

## **6. FastAPI 앱 설정 (main.py 만들기)**

이제 FastAPI 서버를 실행할 `main.py` 파일을 만들어봅시다.

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Project Crawler API")

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # 프론트엔드 도메인
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI & PostgreSQL!"}
```

이제 `http://localhost:8000/` 에 접속하면 **"Hello, FastAPI & PostgreSQL!"** 메시지가 나와야 해요!

---

## **7. PostgreSQL 데이터베이스 생성하기**

이제 PostgreSQL에서 사용할 데이터베이스를 만들어봅시다.  
터미널에서 `psql`을 실행한 다음, 아래 명령어를 입력하세요.

```sql
CREATE DATABASE gig_crawler WITH ENCODING 'UTF8' LC_COLLATE='Korean_Korea.949' LC_CTYPE='Korean_Korea.949';
```

이제 데이터베이스가 준비되었습니다! 🎉

---

## **8. 서버 실행하기! 🚀**

이제 마지막 단계입니다!  
아래 명령어를 실행해서 FastAPI 서버를 켜볼까요?

```bash
uvicorn app.main:app --reload
```

터미널에 **"Uvicorn running on http://127.0.0.1:8000"** 이런 메시지가 나오면 성공이에요!  
이제 브라우저에서 `http://127.0.0.1:8000/docs` 로 들어가면 API 문서도 자동으로 생성된 걸 확인할 수 있어요.

---

## **마무리 🎯**

지금까지 **FastAPI + PostgreSQL** 연동을 설정해봤어요!  
혹시 실행하면서 문제가 생기면 아래 사항을 다시 확인해보세요.

✅ `.env` 파일을 UTF-8로 저장했나요?  
✅ PostgreSQL 서버가 실행 중인가요?  
✅ 데이터베이스가 생성되어 있나요?  
✅ `uvicorn app.main:app --reload` 명령어를 실행했나요?

이제 여기에 **CRUD API**를 추가해서 원하는 프로젝트를 만들어보세요! 💡  
궁금한 점 있으면 언제든지 질문하세요~! 😃
