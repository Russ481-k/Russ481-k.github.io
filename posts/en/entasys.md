---
title: "Entasis"
date: "2024-03-20"
category: "projects"
description: "Development of Virtual Asset Exchange"
tags:
  [
    "React",
    "Express",
    "MySQL",
    "Web3.js",
    "AWS",
    "Ganache",
    "Truffle",
    "ERC20",
    "MetaMask",
    "Figma",
  ]
thumbnail: "/images/entasis/entasis_circuit.gif"
---

## 1. Project Overview

### Project Name

- ENTASYS SIEM Solution

### Project Purpose

- Build an integrated security monitoring system that detects and responds to enterprise security threats in real-time
- Early detection of security threats by collecting and analyzing logs from various security equipment and systems
- Implementation of AI/ML-based intelligent threat detection and response system

### Core Features

1. Integrated Log Collection and Management

   - Collect logs from security devices like firewalls, IPS, WAF
   - Integration of server, network equipment, and application logs
   - Real-time log normalization and correlation analysis
   - Log original storage and tampering prevention

2. Real-time Threat Detection

   - AI-based User/Entity Behavior Analytics
   - Detection of known and unknown threats
   - Vulnerability scanning and monitoring
   - Real-time threat intelligence integration

3. Security Dashboard and Analysis

   - Intuitive integrated security dashboard
   - Real-time security event monitoring
   - Drill-down analysis and forensic capabilities
   - Automated custom report generation

4. Automated Response System
   - Automatic blocking/isolation upon threat detection
   - Staff notification and ticketing integration
   - Playbook-based response automation
   - Security device integration and control

## System Architecture

### Collection Layer

- Distributed log collector structure
- 50,000 EPS processing performance per second
- Log filtering and normalization
- Data compression and encrypted transmission

### Storage Layer

- Based on distributed storage (Elasticsearch)
- Dual storage for real-time/long-term retention
- Encrypted data storage
- Automatic backup and recovery

### Analysis Layer

- Real-time correlation analysis engine
- ML-based anomaly detection
- Threat intelligence integration
- Rule-based detection

### Presentation Layer

- HTML5-based web console
- Responsive dashboard
- Drill-down analysis tools
- Customized reporting

## Implementation Requirements

### Hardware

- Collection Server: Minimum 8 cores/32GB RAM
- Analysis Server: Minimum 16 cores/64GB RAM
- Storage: Minimum 10TB SSD

### Software

- OS: RHEL/CentOS 7 or higher
- Docker/Kubernetes
- Elasticsearch 7.x
- Node.js 16.x

## Future Roadmap

### 2024 Second Half

- AI engine advancement
- Transition to cloud-native architecture
- Expansion of global threat intelligence integration

### 2025

- Application of Zero Trust security framework
- Blockchain-based log integrity verification
- Multi-cloud integrated monitoring
