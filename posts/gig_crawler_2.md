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

# SQLAlchemy로 데이터베이스 비동기 처리 구현하기 🔄

안녕하세요! 오늘은 FastAPI 크롤러 프로젝트에서 **데이터베이스 비동기 처리**를 어떻게 구현했는지 자세히 공유해볼게요.

## 1. 들어가며 🎯

요즘 웹 개발에서 비동기 처리는 정말 중요한 요소가 되었어요. 특히 크롤러처럼 데이터를 많이 다루는 애플리케이션에서는 더욱 그렇죠! 이번 글에서는 제가 SQLAlchemy를 사용해서 비동기 데이터베이스 처리를 구현한 경험을 나눠볼게요.

## 2. 왜 비동기 처리가 필요했나요? 🤔

기존에 동기 방식으로 처리했을 때 몇 가지 문제점이 있었어요:

1. **응답 지연**: 데이터베이스 응답을 기다리는 동안 다른 작업을 못했어요
2. **자원 낭비**: 서버 리소스가 효율적으로 사용되지 못했죠
3. **확장성 한계**: 동시에 많은 요청이 들어오면 처리가 힘들었어요

이런 문제들을 해결하기 위해 비동기 처리 도입이 필요했답니다!

---

## 3. SQLAlchemy 비동기 설정

### 3.1 기존 동기 방식의 문제점

일반적으로 SQLAlchemy는 동기 방식으로 작동합니다. 하지만 동기 방식의 문제점은 다음과 같습니다.

- **I/O 블로킹**: 데이터베이스에서 응답을 받을 때까지 애플리케이션이 대기해야 함
- **성능 저하**: 많은 요청이 동시에 들어오면 응답 시간이 길어짐
- **확장성 부족**: 다중 작업을 효과적으로 처리하기 어려움

이를 해결하기 위해 **SQLAlchemy 비동기 모드**를 활용할 수 있습니다.

---

### 3.2 SQLAlchemy 비동기 설정 방법

#### 1) 비동기 엔진 생성 (`create_async_engine`)

```python
from sqlalchemy.ext.asyncio import create_async_engine

DATABASE_URL = "postgresql+asyncpg://user:password@localhost/dbname"
engine = create_async_engine(DATABASE_URL, echo=True)
```

#### 2) 비동기 세션 생성 (`async_session`)

```python
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker

async_session = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)
```

#### 3) 데이터베이스 작업 예제 (비동기 방식)

```python
from models import User  # 가정한 모델

async def get_user_by_id(user_id: int):
    async with async_session() as session:
        result = await session.get(User, user_id)
        return result
```

위 예제에서는 `async_session`을 사용하여 비동기적으로 데이터베이스에서 사용자를 조회합니다.

---

## 4. 기존 동기 방식과 비교

| 방식                  | 장점                        | 단점                        |
| --------------------- | --------------------------- | --------------------------- |
| 동기 (Synchronous)    | 간단한 코드, 익숙한 패턴    | 응답 속도 저하, 확장성 부족 |
| 비동기 (Asynchronous) | 빠른 응답, 높은 동시성 처리 | 설정이 다소 복잡함          |

비동기 방식은 특히 **대량의 요청을 처리하는 API 서버**나 **크롤러**를 운영할 때 매우 유용합니다.

---

## 5. 마치며

이번 글에서는 SQLAlchemy의 비동기 설정 방법을 살펴보았습니다. 다음 글에서는 `database.py`를 비동기 방식으로 변경하고, **세션 관리 코드 통합**에 대해 다뤄보겠습니다! ��

다음 글에서 만나요! 😊
