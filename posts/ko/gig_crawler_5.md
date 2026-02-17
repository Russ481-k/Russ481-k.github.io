---
title: "FastAPI와 PostgreSQL을 활용한 아웃소싱 크롤러 개발"
date: "2025-02-12"
category: "backend"
description: "크롤러 프로젝트에 암호화 시스템을 도입했어요! Fernet을 활용한 대칭키 암호화로 프로젝트 ID를 안전하게 보호하고, CryptoUtil 클래스로 편리하게 관리할 수 있게 되었답니다. "
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
    "암호화",
    "Fernet",
    "보안",
    "cryptography",
    "데이터보호",
  ]
thumbnail: "/images/fastapi.png"
---

이번 글에서는 **암호화 시스템 구현**에 대해 자세히 소개할게요!

---

# 암호화 시스템 구현: CryptoUtil 클래스와 프로젝트 ID 보호

안녕하세요, 여러분!  
이전 글들에서 데이터베이스 비동기 처리, 세션 관리, 모델 개선, 크롤러 스케줄러 등에 대해 다뤘는데요, 이번 글에서는 **암호화 시스템 구현**에 대해 이야기해보려고 합니다.

우리 프로젝트에서는 보안이 매우 중요한 요소 중 하나입니다. 특히, 프로젝트 ID와 같이 민감한 정보는 암호화를 통해 외부로 노출되지 않도록 보호할 필요가 있죠. 이번 글에서는 **Fernet**을 활용한 대칭키 암호화 방식을 적용하여, 프로젝트 ID의 암호화와 복호화를 구현하는 방법을 소개하겠습니다.

---

## 1. 암호화가 필요한 이유

- **보안 강화:**  
  데이터가 외부에 노출되면 악의적인 공격에 취약해집니다. 암호화를 통해 중요한 정보(예: 프로젝트 ID)를 안전하게 보호할 수 있습니다.

- **데이터 무결성 유지:**  
  암호화된 데이터는 전송 중 변조 여부를 쉽게 확인할 수 있어, 데이터의 신뢰성을 보장할 수 있습니다.

- **규정 준수:**  
  여러 보안 규제와 컴플라이언스 요건을 만족시키기 위해 민감 정보를 암호화하는 것은 필수적입니다.

---

## 2. Fernet 대칭키 암호화란?

**Fernet**은 파이썬의 [cryptography](https://cryptography.io/) 라이브러리에서 제공하는 대칭키 암호화 방식입니다.

- **대칭키 암호화:** 암호화와 복호화에 동일한 키를 사용합니다.
- **사용법이 간단:** 몇 줄의 코드로 강력한 암호화 기능을 구현할 수 있습니다.
- **안전성:** 암호화된 메시지의 무결성과 인증을 보장합니다.

---

## 3. CryptoUtil 클래스 구현

이제 실제로 `CryptoUtil` 클래스를 구현해 보겠습니다. 이 클래스는 암호화와 복호화 기능을 제공하며, 주로 프로젝트 ID와 같은 민감한 데이터를 보호하는 데 사용됩니다.

```python
from cryptography.fernet import Fernet

class CryptoUtil:
    def __init__(self, key: str):
        """
        생성자: 암호화에 사용할 Fernet 인스턴스를 초기화합니다.
        :param key: Fernet 암호화 키 (문자열)
        """
        self.fernet = Fernet(key)

    def encrypt(self, data: str) -> str:
        """
        데이터를 암호화합니다.
        :param data: 암호화할 문자열 데이터
        :return: 암호화된 문자열 (토큰)
        """
        return self.fernet.encrypt(data.encode()).decode()

    def decrypt(self, token: str) -> str:
        """
        암호화된 토큰을 복호화합니다.
        :param token: 암호화된 문자열 (토큰)
        :return: 복호화된 원본 문자열
        """
        return self.fernet.decrypt(token.encode()).decode()


# 예시 사용법
if __name__ == '__main__':
    # 암호화 키는 보통 환경 변수나 설정 파일에서 안전하게 로드합니다.
    # 여기서는 예시로 새로운 키를 생성합니다.
    key = Fernet.generate_key()
    crypto_util = CryptoUtil(key)

    original_id = "project123"
    encrypted_id = crypto_util.encrypt(original_id)
    decrypted_id = crypto_util.decrypt(encrypted_id)

    print("원본 프로젝트 ID:", original_id)
    print("암호화된 프로젝트 ID:", encrypted_id)
    print("복호화된 프로젝트 ID:", decrypted_id)
```

### 3.1 코드 설명

- **초기화:**  
  `__init__` 메서드에서 전달받은 암호화 키로 `Fernet` 인스턴스를 초기화합니다.

- **encrypt 메서드:**  
  문자열 데이터를 바이트로 변환한 후 암호화하여, 다시 문자열로 디코딩합니다.

- **decrypt 메서드:**  
  암호화된 토큰을 바이트로 변환하여 복호화하고, 원래의 문자열로 디코딩합니다.

---

## 4. 설정에 암호화 키 추가하기

실제 운영 환경에서는 암호화 키를 코드에 하드코딩하지 않고, 보안 설정 파일이나 환경 변수에서 로드하는 것이 좋습니다. 예를 들어, `config.py` 파일을 만들어 아래와 같이 작성할 수 있습니다:

```python
import os

# 환경 변수에서 암호화 키를 가져오거나, 기본값을 설정합니다.
ENCRYPTION_KEY = os.getenv("ENCRYPTION_KEY", Fernet.generate_key().decode())
```

이렇게 설정해두면, 운영 환경에서 별도의 암호화 키를 안전하게 관리할 수 있어 보안성이 한층 강화됩니다.

---

## 5. 암호화 시스템의 적용

이제 API 엔드포인트나 데이터 저장 시, 프로젝트 ID를 직접 노출하는 대신 암호화된 값을 사용하면 됩니다.  
예를 들어, 프로젝트 조회 API에서는 클라이언트에게 암호화된 ID를 제공하고, 이후 클라이언트의 요청 시 해당 암호화된 ID를 복호화하여 내부 데이터베이스에서 조회할 수 있습니다.

이와 같이 암호화 시스템을 도입하면, 민감 정보의 노출 위험을 줄이고 보안을 강화할 수 있습니다.

---

## 6. 마치며

오늘은 **암호화 시스템 구현**에 대해 살펴보았습니다.  
`CryptoUtil` 클래스를 통해 간단하게 암호화와 복호화 기능을 구현할 수 있었고, 이를 통해 프로젝트 ID와 같은 민감한 데이터를 효과적으로 보호할 수 있음을 확인했습니다.

다음 글에서는 **API 엔드포인트 개선** 및 비동기 데이터베이스 쿼리 적용에 대해 다룰 예정입니다.

감사합니다. 다음 글에서 또 만나요!

---
