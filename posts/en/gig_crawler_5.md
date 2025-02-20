---
title: "Building an Outsourcing Crawler with FastAPI and PostgreSQL"
date: "2025-02-12"
category: "backend"
description: "I implemented an encryption system in the crawler project! Using Fernet symmetric key encryption to securely protect project IDs and manage them conveniently with the CryptoUtil class. 🔒"
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
