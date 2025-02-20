---
title: "FDS Planning"
date: "2024-03-20"
category: "projects"
description: "Design of Anomaly Detection System for Blockchain-based Digital Asset Trading"
tags: ["Blockchain", "FDS", "Security", "AI"]
thumbnail: "/images/solidity.webp"
---

## System Overview

Virtual Asset FDS (VA-FDS) is a system that detects and responds to abnormal transaction patterns in blockchain networks in real-time.

### Key Features

1. **Blockchain-Specific Data Collection**

   - On-chain transaction data
   - Wallet address behavior patterns
   - Smart contract interactions
   - DEX/CEX trading data

2. **Hybrid Analysis Approach**
   - Rule-based Detection
   - Machine Learning-based Anomaly Detection
   - On-chain Data Analysis
   - Cross-chain Tracking

## Core Functions

![Profile Image 1](/images/fds.jpeg)

### 1. Real-time Transaction Monitoring

- Bulk transfer pattern detection
- Abnormal transaction amount detection
- Suspicious wallet address tracking
- Smart contract vulnerability analysis

### 2. Cross-chain Tracking System

- Bridge transaction monitoring
- Cross-chain fund flow tracking
- Cross-chain laundering pattern detection
- Bridge hacking risk detection

### 3. AI-based Pattern Analysis

- Supervised Learning: RandomForest, XGBoost
- Unsupervised Learning: Isolation Forest
- Deep Learning: LSTM, GNN
- Ensemble techniques application

## Tech Stack

### Backend

- Node.js/Python
- PostgreSQL (transaction data)
- Redis (real-time caching)
- Kafka (stream processing)

### Blockchain

- Web3.js/Ethers.js
- The Graph (data indexing)
- Chainlink (oracle)

### AI/ML

- TensorFlow/PyTorch
- scikit-learn
- NetworkX (graph analysis)

## System Architecture
