---
title: "FastAPI PostgreSQL    "
date: "2025-02-12"
category: "backend"
description: "    ! Fernet     ID  , CryptoUtil      . "
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
    "Fernet",
    "",
    "cryptography",
    "",
  ]
thumbnail: "/images/fastapi.png"
---

  **  **   !

---

#   : CryptoUtil   ID 

, !  
    ,  ,  ,     ,   **  **   .

       . ,  ID           .   **Fernet**     ,  ID     .

---

## 1.   

- ** :**  
       .    (:  ID)    .

- **  :**  
           ,     .

- ** :**  
             .

---

## 2. Fernet  ?

**Fernet**  [cryptography](https://cryptography.io/)     .

- ** :**     .
- ** :**         .
- **:**     .

---

## 3. CryptoUtil  

  `CryptoUtil`   .      ,   ID      .

```python
from cryptography.fernet import Fernet

class CryptoUtil:
    def __init__(self, key: str):
        """
        :   Fernet  .
        :param key: Fernet   ()
        """
        self.fernet = Fernet(key)

    def encrypt(self, data: str) -> str:
        """
         .
        :param data:   
        :return:   ()
        """
        return self.fernet.encrypt(data.encode()).decode()

    def decrypt(self, token: str) -> str:
        """
          .
        :param token:   ()
        :return:   
        """
        return self.fernet.decrypt(token.encode()).decode()


#  
if __name__ == '__main__':
    #         .
    #     .
    key = Fernet.generate_key()
    crypto_util = CryptoUtil(key)

    original_id = "project123"
    encrypted_id = crypto_util.encrypt(original_id)
    decrypted_id = crypto_util.decrypt(encrypted_id)

    print("  ID:", original_id)
    print("  ID:", encrypted_id)
    print("  ID:", decrypted_id)
```

### 3.1  

- **:**  
  `__init__`     `Fernet`  .

- **encrypt :**  
       ,   .

- **decrypt :**  
      ,   .

---

## 4.    

       ,        .  , `config.py`       :

```python
import os

#     ,  .
ENCRYPTION_KEY = os.getenv("ENCRYPTION_KEY", Fernet.generate_key().decode())
```

 ,            .

---

## 5.   

 API    ,  ID       .  
 ,   API   ID ,       ID      .

    ,         .

---

## 6. 

 **  **  .  
`CryptoUtil`         ,    ID        .

  **API  **        .

.    ! 

---
