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
thumbnail: "/images/entasys/entaasys_download_1.gif"
---

#  

## 1.  

### 1.1  

```mermaid
graph TD
    Client[] --> |WebSocket| WS[WebSocket Server]
    WS --> || DM[Download Manager]
    DM --> | | CM[Chunk Manager]
    CM --> || OS[OpenSearch]
    CM --> | | FS[File System]
    DM --> | | SM[State Manager]
```

### 1.2  

- **WebSocket Server**:   
- **Download Manager**:   
- **Chunk Manager**:   
- **State Manager**:    

## 2.  

### 2.1 

- **Framework**: Next.js 13+
- ** **: React Query
- **WebSocket**: Socket.IO-client
- **UI **: MUI/Tailwind

### 2.2 

- **Runtime**: Node.js 18+
- **WebSocket**: Socket.IO
- ****: OpenSearch
- ** **: Node.js Streams

### 2.3  

- ****: TypeScript 4.9+
- ****: Webpack/Babel
- ****: Jest
- ****: ESLint/Prettier

## 3.  

### 3.1  

![ ](/images/entasys/entaasys_login.gif)

### 3.2  

####     

![ ](/images/entasys/entaasys_search_term.gif)

####   

![ ](/images/entasys/entaasys_search.gif)

### 3.3  

####  

![ 1](/images/entasys/entaasys_download_1.gif)

####   

![ 2](/images/entasys/entaasys_download_2.gif)

### 3.4  

-    
-   
-   
-   

### 3.5  

-   
-   
-  
-   

### 3.6 

-   
-   
-  
-   

## 4.  

```bash
src/
 server/
    lib/
       downloadManager.ts      #  
       downloadChunkManager.ts #  
       stateManager.ts        #  
       opensearch.ts          # DB 
       utils/
           logger.ts          # 
           errors.ts          #  
    index.ts                   #  
 client/
    components/
       DownloadButton.tsx     #  
       ProgressBar.tsx        #  
       ErrorDisplay.tsx       #  
    hooks/
       useDownload.ts         #  
       useWebSocket.ts        #  
    utils/
        api.ts                 # API 
        format.ts              #  
 shared/
     types/                     #  
     constants/                 #  
```

## 5.  

### 5.1  

```env
# Server
PORT=8001
WS_PORT=8001
NODE_ENV=development

# OpenSearch
OPENSEARCH_HOST=localhost
OPENSEARCH_PORT=9200
OPENSEARCH_USERNAME=admin
OPENSEARCH_PASSWORD=admin

# Download
MAX_CHUNK_SIZE=500000
MAX_MEMORY_USAGE=1024
DOWNLOAD_TIMEOUT=300000
```

### 5.2  

```typescript
// config.ts
export const CONFIG = {
  download: {
    chunkSize: 500000,
    maxRetries: 3,
    timeout: 300000,
    tempDir: "./temp",
  },
  websocket: {
    pingInterval: 10000,
    pingTimeout: 5000,
  },
  opensearch: {
    scrollTimeout: "2m",
    batchSize: 1000,
  },
};
```
