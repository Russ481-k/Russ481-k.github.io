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
thumbnail: "/images/entasys/entaasys_search_term.gif"
---

# Data Flow

## 1. OpenSearch Data Processing

### 1.1 Query Optimization

```typescript
// opensearch.ts
export const buildOptimizedQuery = (searchParams: SearchParams) => {
  return {
    index: "logs-*",
    body: {
      query: {
        bool: {
          must: [
            {
              range: {
                "@timestamp": {
                  gte: searchParams.timeFrom,
                  lte: searchParams.timeTo,
                  format: "strict_date_time",
                  time_zone: "+09:00",
                },
              },
            },
            // Additional filters
          ],
        },
      },
      sort: [{ "@timestamp": "asc" }],
      _source: ["Select only required fields"],
    },
    scroll: "2m",
    size: 1000,
  };
};
```

### 1.2 Using Scroll API

```typescript
async function* scrollSearch(client: Client, query: SearchParams) {
  let response = await client.search(buildOptimizedQuery(query));
  let scrollId = response._scroll_id;

  while (true) {
    yield response.hits.hits;

    if (!response.hits.hits.length) break;

    response = await client.scroll({
      scroll_id: scrollId,
      scroll: "2m",
    });
  }
}
```

### 1.3 Circuit Breaker Settings

```yaml
# opensearch.yml
indices.breaker.total.limit: 70%
indices.breaker.request.limit: 60%
indices.breaker.fielddata.limit: 40%
```

### 1.4 Data Transformation Pipeline

```typescript
interface TransformPipeline {
  preProcess: (data: RawData) => ProcessedData;
  transform: (data: ProcessedData) => TransformedData;
  validate: (data: TransformedData) => boolean;
  format: (data: TransformedData) => string;
}
```

## 2. File Processing Process

### 2.1 Chunk Management

```typescript
interface ChunkManager {
  chunkSize: number;
  maxParallel: number;
  chunks: Map<string, ChunkStatus>;

  calculateChunks(totalSize: number): number;
  processChunk(chunkId: string): Promise<void>;
  mergeChunks(chunks: string[]): Promise<string>;
}
```

### 2.2 Stream Processing

```typescript
class DownloadStream extends Transform {
  constructor(options: TransformOptions) {
    super(options);
  }

  _transform(chunk: any, encoding: string, callback: Function) {
    // Memory-efficient transformation processing
    const transformed = this.transformData(chunk);
    this.push(transformed);
    callback();
  }
}
```

### 2.3 File System Operations

```typescript
class FileManager {
  async createTempFile(chunkId: string): Promise<string> {
    const path = `${TEMP_DIR}/${chunkId}.tmp`;
    await fs.promises.mkdir(TEMP_DIR, { recursive: true });
    return path;
  }

  async mergeFiles(files: string[], output: string): Promise<void> {
    const writeStream = fs.createWriteStream(output);
    for (const file of files) {
      await pipeline(fs.createReadStream(file), writeStream);
    }
  }
}
```

## 3. Progress Tracking

### 3.1 Progress Calculation

```typescript
interface ProgressTracker {
  totalRows: number;
  processedRows: number;
  startTime: number;

  calculateProgress(): number;
  estimateTimeRemaining(): number;
  calculateSpeed(): number;
}
```

### 3.2 Status Updates

```typescript
class ProgressEmitter extends EventEmitter {
  private updateInterval: number = 1000;
  private lastUpdate: number = 0;

  emitProgress(progress: ProgressData) {
    const now = Date.now();
    if (now - this.lastUpdate >= this.updateInterval) {
      this.emit("progress", progress);
      this.lastUpdate = now;
    }
  }
}
```

## 4. Memory Management

### 4.1 Memory Monitoring

```typescript
class MemoryMonitor {
  private maxMemoryUsage: number;
  private warningThreshold: number;

  checkMemoryUsage(): MemoryStatus {
    const used = process.memoryUsage();
    return {
      heapUsed: used.heapUsed,
      heapTotal: used.heapTotal,
      external: used.external,
      warning: this.isWarningLevel(used.heapUsed),
    };
  }
}
```

### 4.2 Garbage Collection Optimization

```typescript
const gcOptimization = {
  scheduleGC() {
    if (global.gc) {
      setInterval(() => {
        if (this.shouldRunGC()) {
          global.gc();
        }
      }, 30000);
    }
  },
};
```

## 5. Error Handling Strategy

### 5.1 Error Type Definition

```typescript
enum DownloadError {
  MEMORY_LIMIT = "MEMORY_LIMIT",
  NETWORK_ERROR = "NETWORK_ERROR",
  FILE_SYSTEM = "FILE_SYSTEM",
  OPENSEARCH = "OPENSEARCH",
  TIMEOUT = "TIMEOUT",
}
```

### 5.2 Retry Mechanism

```typescript
class RetryManager {
  private maxRetries: number = 3;
  private backoffMs: number = 1000;

  async withRetry<T>(operation: () => Promise<T>, context: string): Promise<T> {
    let lastError: Error;

    for (let i = 0; i < this.maxRetries; i++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        await this.delay(this.calculateBackoff(i));
      }
    }

    throw new Error(
      `${context} failed after ${this.maxRetries} retries: ${lastError}`
    );
  }
}
```
