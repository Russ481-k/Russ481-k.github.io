---
title: "FastAPI와 PostgreSQL을 활용한 아웃소싱 크롤러 개발"
date: "2025-02-12"
category: "backend"
description: "크롤러 프로젝트의 데이터 모델을 개선하고 구조를 정리해보았어요! 예산 필드 분리, 메타데이터 필드 개선, 그리고 새로운 필드 추가로 더 체계적인 데이터 관리가 가능해졌답니다. 🔧"
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
    "데이터모델링",
    "리팩토링",
    "ORM",
    "데이터구조",
  ]
thumbnail: "/images/fastapi.png"
---

# 프로젝트 모델 개선: 구조 및 필드 정리하기

안녕하세요, 여러분!  
이전 글들에서는 데이터베이스의 비동기 처리와 세션 관리 통합에 대해 알아보았는데요, 이번 글에서는 **프로젝트 모델 개선**에 대해 이야기해보려고 합니다. 데이터 모델은 애플리케이션의 핵심인데, 잘 정리된 모델은 유지보수와 확장에 큰 도움을 줍니다. 그럼 차근차근 개선 포인트를 살펴볼까요?

---

## 1. 왜 모델 개선이 필요할까요?

기존 모델을 사용하면서 몇 가지 문제점을 발견했어요. 예를 들어:

- **budget 필드 하나로 관리:**  
  한 번에 예산 정보를 관리하려다 보니, 최소/최대 예산 값을 따로 활용하기 어려웠어요.

- **metadata라는 필드명:**  
  SQLAlchemy에서는 `metadata`가 예약어로 사용되어, 다른 용도로 사용하면 충돌 위험이 있었습니다.

- **새로운 요구사항 반영:**  
  프로젝트 정보에 추가적으로 `currency`, `posted_date`, `deadline`, `skills` 등의 정보가 필요해졌습니다.

이러한 이유로, 모델을 좀 더 세분화하고 명확하게 개선하고자 했어요.

---

## 2. 구체적인 개선 내용

### 2.1 예산 필드 분리: budget_min & budget_max

기존에는 하나의 `budget` 필드로 예산 정보를 저장했다면,  
이제는 최소 예산과 최대 예산을 별도의 필드로 관리할 거예요.  
이렇게 하면 검색, 필터링, 정렬 등에서 더 세밀하게 활용할 수 있습니다.

```python
from sqlalchemy import Column, Integer

class Project(Base):
    __tablename__ = 'projects'

    id = Column(Integer, primary_key=True, index=True)
    # 기존 budget 필드 -> 두 개로 분리
    budget_min = Column(Integer, nullable=False)
    budget_max = Column(Integer, nullable=False)
```

### 2.2 예약어 충돌 해결: metadata → project_metadata

SQLAlchemy의 예약어인 `metadata` 대신, 혼동 없이 사용할 수 있도록 `project_metadata`로 변경합니다.

```python
from sqlalchemy import Column, JSON

class Project(Base):
    __tablename__ = 'projects'

    id = Column(Integer, primary_key=True, index=True)
    # 예약어 문제 해결을 위해 변경
    project_metadata = Column(JSON, nullable=True)
```

### 2.3 새로운 필드 추가

프로젝트의 세부 정보를 더욱 풍부하게 표현하기 위해 몇 가지 새로운 필드를 추가했습니다.

- **currency:** 예산 단위를 나타내는 필드
- **posted_date:** 프로젝트가 게시된 날짜
- **deadline:** 프로젝트 마감 기한
- **skills:** 프로젝트에 필요한 기술 스택 정보

```python
from sqlalchemy import Column, String, DateTime
import datetime

class Project(Base):
    __tablename__ = 'projects'

    id = Column(Integer, primary_key=True, index=True)
    budget_min = Column(Integer, nullable=False)
    budget_max = Column(Integer, nullable=False)
    project_metadata = Column(JSON, nullable=True)

    # 추가된 새로운 필드들
    currency = Column(String, default='USD')
    posted_date = Column(DateTime, default=datetime.datetime.utcnow)
    deadline = Column(DateTime, nullable=True)
    skills = Column(String, nullable=True)  # 예: "Python, JavaScript, SQL"
```

이렇게 모델을 개선하면, 데이터가 더 구조적이고 명확하게 관리되어 추후 쿼리나 데이터 분석 시에도 큰 도움이 됩니다.

---

## 3. 개선된 모델의 장점

- **명확한 데이터 표현:**  
  예산 정보를 최소/최대 값으로 분리하여 다양한 범위 검색 및 비교가 가능해집니다.
- **예약어 충돌 방지:**  
  `project_metadata`라는 명확한 필드명을 사용하여 SQLAlchemy 내 예약어와의 충돌을 피했습니다.
- **확장성 있는 모델:**  
  추가 필드를 통해 프로젝트 정보를 더욱 풍부하게 표현할 수 있고, 미래의 요구사항에도 유연하게 대응할 수 있습니다.

---

## 4. 마치며

이번 글에서는 프로젝트 모델 개선에 대해 자세히 살펴보았습니다.  
데이터베이스 모델을 체계적으로 관리하는 것은 애플리케이션의 장기적인 유지보수와 성능 개선에 큰 영향을 미칩니다.  
앞으로 남은 글에서는 **크롤러 스케줄러 구현** 및 **암호화 시스템 도입** 등, 더 많은 개선 사항들을 소개할 예정이니 많은 기대 부탁드립니다!

혹시 개선 포인트에 대해 추가로 의견이 있으시거나 질문이 있다면 언제든지 댓글로 남겨주세요. 여러분의 피드백이 큰 힘이 됩니다. 감사합니다! 🚀

---

다음 글에서 만나요!
