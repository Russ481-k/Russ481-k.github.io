---
title: "Entasis Engine - Infrastructure Architecture"
date: "2025-02-13"
category: "projects"
description: "Detailed infrastructure architecture and configuration for digital asset data analysis system"
tags:
  [
    "infrastructure",
    "cloud",
    "kubernetes",
    "devops",
    "security",
    "monitoring",
    "scaling",
  ]
thumbnail: ""
---

# Financial Data Analysis System Infrastructure Architecture

## 🏗️ System Architecture

### 1. Overall Architecture

```mermaid
graph TB
    subgraph External[External Systems]
        API1[Exchange API]
        API2[Data Feed]
    end

    subgraph LoadBalancer[LoadBalancer]
        LB1[AWS ALB]
        LB2[Internal L4]
    end

    subgraph ServiceMesh[Service Mesh]
        direction TB
        subgraph DataCollection[Data Collection Layer]
            DC1[Collector-1]
            DC2[Collector-2]
        end

        subgraph Processing[Processing Layer]
            P1[Spark Cluster]
            P2[Stream Processing]
        end

        subgraph AI[AI Analysis Layer]
            AI1[Model Serving]
            AI2[Training Pipeline]
        end

        subgraph API[API Layer]
            API3[REST API]
            API4[WebSocket]
        end
    end

    subgraph Storage[Storage]
        DB1[(TimescaleDB)]
        DB2[(Redis)]
        S3[Object Storage]
    end

    subgraph Monitoring[Monitoring]
        M1[Prometheus]
        M2[Grafana]
        M3[ELK Stack]
    end

    External --> LoadBalancer
    LoadBalancer --> ServiceMesh
    ServiceMesh --> Storage
    ServiceMesh --> Monitoring
```

## 🌐 Network Configuration

### 1. Network Segments

```plaintext
+------------------------+     +------------------------+
|     Public Subnet      |     |    Private Subnet      |
|------------------------|     |------------------------|
| - Load Balancer        |     | - Application Servers  |
| - Bastion Host         |     | - Database Clusters    |
| - NAT Gateway          |     | - Cache Servers        |
+------------------------+     +------------------------+
           |                              |
           |        VPC Peering           |
           +------------------------------+
```

### 2. Security Group Configuration

```yaml
security_groups:
  frontend:
    inbound:
      - port: 80
        source: 0.0.0.0/0
      - port: 443
        source: 0.0.0.0/0

  application:
    inbound:
      - port: 8080
        source: frontend_sg
      - port: 9000
        source: monitoring_sg

  database:
    inbound:
      - port: 5432
        source: application_sg
      - port: 6379
        source: application_sg
```

## 🚀 Kubernetes Cluster

### 1. Node Configuration

```yaml
node_pools:
  - name: general
    instance_type: c5.2xlarge
    min_size: 3
    max_size: 10
    labels:
      role: general

  - name: ai-inference
    instance_type: g4dn.xlarge
    min_size: 2
    max_size: 5
    labels:
      role: ai-inference

  - name: data-processing
    instance_type: r5.2xlarge
    min_size: 2
    max_size: 8
    labels:
      role: data-processing
```

### 2. Service Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: trading-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: trading-api
  template:
    metadata:
      labels:
        app: trading-api
    spec:
      containers:
        - name: trading-api
          image: trading-api:1.0.0
          resources:
            requests:
              cpu: 1
              memory: 2Gi
            limits:
              cpu: 2
              memory: 4Gi
```

## 📊 Monitoring System

### 1. Metric Collection

```yaml
prometheus:
  scrape_configs:
    - job_name: "kubernetes-pods"
      kubernetes_sd_configs:
        - role: pod
      relabel_configs:
        - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
          action: keep
          regex: true

    - job_name: "trading-metrics"
      static_configs:
        - targets: ["trading-api:9090"]
```

### 2. Alert Configuration

```yaml
alertmanager:
  config:
    route:
      receiver: "slack"
      group_wait: 30s
      group_interval: 5m
      repeat_interval: 4h

    receivers:
      - name: "slack"
        slack_configs:
          - channel: "#alerts"
            send_resolved: true
```

## 🔒 Security Configuration

### 1. Network Policy

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: api-network-policy
spec:
  podSelector:
    matchLabels:
      app: trading-api
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              role: frontend
      ports:
        - protocol: TCP
          port: 8080
```

### 2. Encryption Configuration

```yaml
encryption:
  - resources:
      - secrets
    providers:
      - aescbc:
          keys:
            - name: key1
              secret: <base64-encoded-key>
      - identity: {}
```

## 🔄 Scaling Strategy

### 1. Horizontal Scaling

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: trading-api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: trading-api
  minReplicas: 3
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

### 2. Vertical Scaling

```yaml
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: trading-api-vpa
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: trading-api
  updatePolicy:
    updateMode: Auto
```

## 🔧 Operations Management

### 1. Logging Configuration

```yaml
filebeat:
  inputs:
    - type: container
      paths:
        - /var/log/containers/*.log
      processors:
        - add_kubernetes_metadata:
            host: ${NODE_NAME}
            matchers:
              - logs_path:
                  logs_path: "/var/log/containers/"
```

### 2. Backup Policy

```yaml
backup:
  schedule: "0 1 * * *" # Daily at 01:00
  retention:
    hourly: 24
    daily: 7
    weekly: 4
    monthly: 12
  storage:
    type: s3
    bucket: backup-bucket
    region: ap-northeast-2
```

This document provides the infrastructure architecture and configuration for the financial data analysis system. It will be updated continuously to ensure stability and scalability. 🚀
