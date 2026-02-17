---
title: "FastAPI와 PostgreSQL을 활용한 아웃소싱 크롤러 개발"
date: "2025-02-12"
category: "backend"
description: "프리랜서 플랫폼의 프로젝트 정보를 실시간으로 수집하고 분석하는 크롤러를 만들어보았어요. FastAPI의 비동기 처리와 PostgreSQL의 강력한 기능을 활용해서 효율적인 시스템을 구축했답니다!"
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

# database.py를 비동기 방식으로 변경하고 세션 관리 통합하기

안녕하세요, 여러분!  
지난 번 글에서는 SQLAlchemy의 비동기 설정에 대해 알아보았는데요, 오늘은 그 연장선상에서 **database.py** 파일을 어떻게 비동기 방식으로 변경하고, **세션 관리 코드를 통합**할 수 있는지 자세히 설명해 드리려고 해요.

비동기 처리를 도입하면 데이터베이스 작업 시 기다리는 시간을 줄이고, 여러 요청을 동시에 효율적으로 처리할 수 있답니다. 한 번 차근차근 살펴볼게요!

---

## 1. 왜 비동기 방식일까요?

먼저, 동기 방식과 비동기 방식의 차이를 간단히 짚어보겠습니다.

- **동기 방식:**  
  데이터베이스에 요청하면 결과가 반환될 때까지 기다리게 됩니다. 그래서 요청이 많은 경우, 한 작업이 끝날 때까지 다른 작업이 대기하는 문제가 발생할 수 있어요.
- **비동기 방식:**  
  데이터베이스 요청을 보낸 후에도 다른 작업을 동시에 진행할 수 있습니다. 즉, 한 작업이 끝날 때까지 기다리지 않고, 효율적으로 여러 작업을 처리할 수 있게 해줍니다.

비동기 처리를 통해 우리 애플리케이션의 응답 속도와 동시 처리 능력을 크게 향상시킬 수 있어요!

---

## 2. 기존 동기 방식의 database.py

우리의 기존 **database.py**는 동기 방식으로 작성되어 있었어요. 예를 들어, 아래와 같이 데이터베이스 엔진과 세션을 생성했었죠:

```python
# 기존 database.py (동기 방식)
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

이 방식은 구현이 간단하다는 장점이 있지만, 많은 요청이 들어올 때는 **I/O 블로킹** 현상이 발생하여 성능 저하의 원인이 되곤 합니다.

---

## 3. 비동기 방식으로 변경하기

이제 비동기 방식으로 전환해 볼 건데요, 주요 변경 사항을 하나씩 짚어보겠습니다.

### 3.1. 비동기 엔진 생성하기

동기 방식 대신 `sqlalchemy.ext.asyncio` 모듈의 `create_async_engine` 함수를 사용하여 비동기 엔진을 생성합니다.  
먼저 데이터베이스 URL에 `+asyncpg`를 추가해서 비동기 드라이버를 사용하도록 합니다.

```python
from sqlalchemy.ext.asyncio import create_async_engine

DATABASE_URL = "postgresql+asyncpg://user:password@localhost/dbname"
engine = create_async_engine(DATABASE_URL, echo=True)
```

이제 엔진은 비동기 처리를 위해 최적화되어 준비되었어요!

### 3.2. 비동기 세션 생성 및 통합

다음으로, 비동기 세션을 생성하기 위해 `AsyncSession`과 `sessionmaker`를 활용합니다.  
동기 코드와는 달리 `class_` 매개변수에 `AsyncSession`을 지정해주고, `expire_on_commit=False` 옵션을 사용해 세션의 만료를 방지합니다.

```python
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker

async_session = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)
```

이제 모든 데이터베이스 요청은 이 **비동기 세션**을 사용하게 됩니다.

### 3.3. 비동기 세션 관리 함수 구현하기

비동기 방식에서는 `async with` 구문을 활용해 세션을 안전하게 열고 닫는 것이 중요해요.  
아래와 같이 `get_db` 함수를 비동기 제너레이터로 변경하여, 세션을 열고 사용 후 자동으로 종료하도록 구현할 수 있습니다.

```python
async def get_db():
    async with async_session() as session:
        yield session
```

이 코드는 데이터베이스 작업이 끝나면 `async with` 블록이 종료되면서 세션을 깔끔하게 닫아줘요.  
예외가 발생하더라도 자동으로 리소스가 정리되므로, 안정적인 운영이 가능합니다.

---

## 4. 통합 세션 관리의 장점

이번에 세션 관리 코드를 통합하면서 얻을 수 있는 이점은 다음과 같습니다:

- **코드의 간결함:**  
  모든 데이터베이스 접근 시 동일한 비동기 세션 관리 로직을 사용하므로, 코드가 훨씬 깔끔해졌습니다.
- **안정성 강화:**  
  `async with`를 사용하면, 예외가 발생해도 세션이 자동으로 종료되어 리소스 누수가 없어요.
- **유지보수 용이성:**  
  세션 관리 코드가 한 곳에 모여 있으니, 향후 수정이나 확장이 필요할 때 한 곳만 관리하면 됩니다.

---

## 5. 마치며

오늘은 **database.py** 파일을 비동기 방식으로 전환하고, 세션 관리 코드를 통합하는 방법을 살펴보았습니다.  
이렇게 변경하면, 앞으로 API 서버나 크롤러에서 발생하는 데이터베이스 I/O 작업을 훨씬 더 효율적으로 처리할 수 있게 됩니다.

다음 글에서는 **프로젝트 모델 개선 및 필드 업데이트**에 대해 다룰 예정이에요.

여러분의 피드백이 큰 힘이 됩니다. 다음 글에서 또 만나요!

---

이 글이 도움이 되었길 바라며, 앞으로도 지속적으로 개선된 기술들을 공유할 예정입니다. 감사합니다!
