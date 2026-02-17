---
title: "Entasys"
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
thumbnail: "/images/entasys/entaasys_login.gif"
---

# 통신 프로토콜

## 1. WebSocket 이벤트 정의

### 1.1 이벤트 타입

```typescript
enum WebSocketEvent {
  // 다운로드 관련
  DOWNLOAD_REQUEST = "download:request",
  DOWNLOAD_START = "download:start",
  DOWNLOAD_PROGRESS = "download:progress",
  DOWNLOAD_COMPLETE = "download:complete",
  DOWNLOAD_ERROR = "download:error",

  // 상태 관련
  STATUS_UPDATE = "status:update",
  STATUS_CHECK = "status:check",

  // 시스템 관련
  SYSTEM_ERROR = "system:error",
  CONNECTION_HEALTH = "connection:health",
}
```

### 1.2 메시지 포맷

```typescript
interface WebSocketMessage<T = any> {
  event: WebSocketEvent;
  data: T;
  timestamp: number;
  requestId: string;
}

interface DownloadRequest {
  searchParams: {
    timeFrom: string;
    timeTo: string;
    filters: Filter[];
  };
  outputFormat: "csv" | "json";
  compression: boolean;
}

interface ProgressUpdate {
  requestId: string;
  progress: number;
  processedRows: number;
  totalRows: number;
  speed: number;
  estimatedTimeRemaining: number;
}
```

## 2. 메시지 흐름

### 2.1 다운로드 시작

```mermaid
sequenceDiagram
    Client->>Server: DOWNLOAD_REQUEST
    Server->>Client: DOWNLOAD_START
    loop Progress Updates
        Server->>Client: DOWNLOAD_PROGRESS
    end
    Server->>Client: DOWNLOAD_COMPLETE
```

### 2.2 에러 처리 흐름

```typescript
interface ErrorResponse {
  code: string;
  message: string;
  details?: any;
  recoverable: boolean;
  retryAfter?: number;
}

const errorHandler = {
  handleError(error: Error): ErrorResponse {
    return {
      code: determineErrorCode(error),
      message: error.message,
      recoverable: isRecoverable(error),
      retryAfter: calculateRetryDelay(error),
    };
  },
};
```

## 3. 상태 관리

### 3.1 연결 상태 관리

```typescript
class ConnectionManager {
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectDelay: number = 1000;

  async handleDisconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      await this.reconnect();
    } else {
      this.emit("connection:failed");
    }
  }
}
```

### 3.2 세션 상태

```typescript
interface SessionState {
  connected: boolean;
  lastHeartbeat: number;
  activeDownloads: Map<string, DownloadStatus>;
  systemHealth: SystemHealth;
}
```

## 4. 보안

### 4.1 인증

```typescript
interface AuthenticatedMessage extends WebSocketMessage {
  auth: {
    token: string;
    timestamp: number;
    signature: string;
  };
}

const authenticator = {
  validateMessage(message: AuthenticatedMessage): boolean {
    return (
      this.verifySignature(message) &&
      this.checkTimestamp(message.auth.timestamp)
    );
  },
};
```

### 4.2 메시지 암호화

```typescript
class MessageEncryption {
  private readonly algorithm = "aes-256-gcm";

  encrypt(message: WebSocketMessage): EncryptedMessage {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);

    return {
      encrypted: Buffer.concat([
        cipher.update(JSON.stringify(message)),
        cipher.final(),
      ]),
      iv: iv,
      tag: cipher.getAuthTag(),
    };
  }
}
```

## 5. 성능 최적화

### 5.1 메시지 압축

```typescript
class MessageCompression {
  compress(message: WebSocketMessage): Buffer {
    return zlib.deflateSync(JSON.stringify(message));
  }

  decompress(compressed: Buffer): WebSocketMessage {
    return JSON.parse(zlib.inflateSync(compressed).toString());
  }
}
```

### 5.2 배치 처리

```typescript
class MessageBatcher {
  private batchSize: number = 100;
  private batchTimeout: number = 1000;
  private batch: ProgressUpdate[] = [];

  addToBatch(update: ProgressUpdate) {
    this.batch.push(update);

    if (this.shouldFlush()) {
      this.flushBatch();
    }
  }
}
```
