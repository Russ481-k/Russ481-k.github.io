---
title: "Building an Outsourcing Crawler with FastAPI and PostgreSQL"
date: "2025-02-12"
category: "backend"
description: "I implemented an encryption system in the crawler project! Using Fernet symmetric key encryption to securely protect project IDs and manage them conveniently with the CryptoUtil class. "
tags:
  [
    "FastAPI",
    "PostgreSQL",
    "Python",
    "Crawler",
    "asyncio",
    "SQLAlchemy",
    "Async Processing",
    "Data Collection",
    "Real-time Processing",
    "Encryption",
    "Fernet",
    "Security",
    "cryptography",
    "Data Protection",
  ]
thumbnail: "/images/fastapi.png"
---

In this post, I'll introduce the **implementation of the encryption system** in detail!

---

# Implementing Encryption: CryptoUtil Class and Project ID Protection

Hello everyone!  
In previous posts, we covered database async processing, session management, model improvements, and crawler scheduling. Today, we'll discuss the **implementation of an encryption system**.

Security is one of the most critical elements in our project. In particular, sensitive information like project IDs needs to be protected from external exposure through encryption. In this post, I'll introduce how to implement encryption and decryption of project IDs using **Fernet** symmetric key encryption.

---

## 1. Why Do We Need Encryption?

- **Enhanced Security:**  
  When data is exposed externally, it becomes vulnerable to malicious attacks. Through encryption, we can securely protect important information (e.g., project IDs).

- **Maintaining Data Integrity:**  
  Encrypted data makes it easy to verify if tampering occurred during transmission, ensuring data reliability.

- **Regulatory Compliance:**  
  Encrypting sensitive information is essential to meet various security regulations and compliance requirements.

---

## 2. What is Fernet Symmetric Key Encryption?

**Fernet** is a symmetric key encryption method provided by Python's [cryptography](https://cryptography.io/) library.

- **Symmetric Key Encryption:** Uses the same key for encryption and decryption
- **Simple Usage:** Implements powerful encryption features with just a few lines of code
- **Security:** Ensures integrity and authentication of encrypted messages

---

## 3. Implementing the CryptoUtil Class

Now let's implement the `CryptoUtil` class. This class provides encryption and decryption functionality, primarily used to protect sensitive data like project IDs.

```python
from cryptography.fernet import Fernet

class CryptoUtil:
    def __init__(self, key: str):
        """
        Constructor: Initializes the Fernet instance for encryption.
        :param key: Fernet encryption key (string)
        """
        self.fernet = Fernet(key)

    def encrypt(self, data: str) -> str:
        """
        Encrypts the data.
        :param data: String data to encrypt
        :return: Encrypted string (token)
        """
        return self.fernet.encrypt(data.encode()).decode()

    def decrypt(self, token: str) -> str:
        """
        Decrypts the token.
        :param token: Encrypted string (token)
        :return: Decrypted original string
        """
        return self.fernet.decrypt(token.encode()).decode()


# Example usage
if __name__ == '__main__':
    # The encryption key is usually loaded safely from environment variables or configuration files.
    # Here, we create a new key for demonstration purposes.
    key = Fernet.generate_key()
    crypto_util = CryptoUtil(key)

    original_id = "project123"
    encrypted_id = crypto_util.encrypt(original_id)
    decrypted_id = crypto_util.decrypt(encrypted_id)

    print("Original project ID:", original_id)
    print("Encrypted project ID:", encrypted_id)
    print("Decrypted project ID:", decrypted_id)
```

### 3.1 Code Explanation

- **Initialization:**  
  The `__init__` method initializes the `Fernet` instance with the encryption key passed in.

- **encrypt method:**  
  Converts string data to bytes and encrypts it, then decodes it back to a string.

- **decrypt method:**  
  Converts the encrypted token to bytes and decrypts it, then decodes it back to a string.

---

## 4. Adding the Encryption Key to the Configuration

In actual operation, it is better to load the encryption key from the security configuration file or environment variables rather than hard-coding it in the code. For example, you can create a `config.py` file and write it as follows:

```python
import os

# Get the encryption key from the environment variable or set a default value.
ENCRYPTION_KEY = os.getenv("ENCRYPTION_KEY", Fernet.generate_key().decode())
```

This way, you can safely manage the encryption key in the operating environment, which further enhances security.

---

## 5. Applying the Encryption System

Now, you can use the encrypted value instead of exposing the project ID directly in API endpoints or data storage.  
For example, in a project retrieval API, you can provide the encrypted ID to the client and then decrypt it in the client's request to query the internal database.

By introducing the encryption system, you can reduce the risk of exposing sensitive information and enhance security.

---

## 6. Conclusion

Today, we looked at the implementation of the encryption system.  
We were able to implement the encryption and decryption functions simply using the `CryptoUtil` class, and we confirmed that we can effectively protect sensitive data like project IDs.

Next, we will cover **improving API endpoints** and **applying asynchronous database queries**.

Thank you! See you next time! 

---
