---
title: "Entasis"
date: "2024-03-20"
category: "projects"
description: "가상자산 거래소 개발"
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

## 1. 프로젝트 개요

### 프로젝트 명

- ENTASYS (엔타시스) SIEM 솔루션

### 프로젝트 목적

- 기업의 보안 위협을 실시간으로 탐지하고 대응하는 통합 보안 관제 시스템 구축
- 다양한 보안 장비와 시스템의 로그를 수집/분석하여 보안 위협 조기 발견
- AI/ML 기반의 지능형 위협 탐지 및 대응 체계 구현

### 핵심 기능

1. 통합 로그 수집 및 관리

   - 방화벽, IPS, WAF 등 보안장비 로그 수집
   - 서버, 네트워크 장비, 애플리케이션 로그 통합
   - 실시간 로그 정규화 및 상관분석
   - 로그 원본 보관 및 위/변조 방지

2. 실시간 위협 탐지

   - AI 기반 이상행위 탐지(User/Entity Behavior Analytics)
   - 알려진/알려지지 않은 위협 탐지
   - 취약점 스캐닝 및 모니터링
   - 실시간 위협 인텔리전스 연동

3. 보안 대시보드 및 분석

   - 직관적인 통합 보안 대시보드
   - 실시간 보안 이벤트 모니터링
   - 드릴다운 분석 및 포렌식 기능
   - 맞춤형 보고서 자동 생성

4. 자동화된 대응체계
   - 위협 탐지시 자동 차단/격리
   - 담당자 알림 및 티켓팅 연동
   - 플레이북 기반 대응 자동화
   - 보안장비 연동 및 제어

## 시스템 아키텍처

### 수집 계층

- 분산 로그 수집기(Collector) 구조
- 초당 50,000 EPS 처리 성능
- 로그 필터링 및 정규화
- 데이터 압축 및 암호화 전송

### 저장 계층

- 분산 스토리지(Elasticsearch) 기반
- 실시간/장기 보관 이원화
- 데이터 암호화 저장
- 자동 백업 및 복구

### 분석 계층

- 실시간 상관분석 엔진
- ML 기반 이상행위 탐지
- 위협 인텔리전스 연동
- 규칙 기반 탐지

### 표현 계층

- HTML5 기반 웹 콘솔
- 반응형 대시보드
- 드릴다운 분석 도구
- 맞춤형 보고서

## 구축 요구사항

### 하드웨어

- 수집서버: 최소 8코어/32GB RAM
- 분석서버: 최소 16코어/64GB RAM
- 저장장치: 최소 10TB SSD

### 소프트웨어

- OS: RHEL/CentOS 7 이상
- Docker/Kubernetes
- Elasticsearch 7.x
- Node.js 16.x

## 향후 로드맵

### 2024년 하반기

- AI 엔진 고도화
- 클라우드 네이티브 아키텍처 전환
- 글로벌 위협 인텔리전스 연동 확대

### 2025년

- 제로트러스트 보안 프레임워크 적용
- 블록체인 기반 로그 무결성 검증
- 멀티클라우드 통합 모니터링
