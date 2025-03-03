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
thumbnail: "/images/entasys/entaasys_search.gif"
---

# Core Components

## 1. DownloadManager

### 1.1 Initial Structure

```typescript
class DownloadManager {
  private activeDownloads: Map<string, Download>;
  private chunkManager: DownloadChunkManager;
  private eventEmitter: EventEmitter;

  constructor(config: DownloadManagerConfig) {
    this.maxConcurrent = config.maxConcurrent;
    this.tempDir = config.tempDir;
    this.chunkSize = config.chunkSize;
  }

  async createDownload(params: DownloadParams): Promise<string> {
    const downloadId = generateUniqueId();
    const download = new Download(params, this.chunkManager);
    this.activeDownloads.set(downloadId, download);
    return downloadId;
  }
}
```

### 1.2 Status of Download Management

```typescript
interface DownloadState {
  status: DownloadStatus;
  progress: number;
  error?: Error;
  startTime: number;
  endTime?: number;
  totalChunks: number;
  completedChunks: number;
}

class Download {
  private state: DownloadState;

  updateProgress(completedChunks: number) {
    this.state.completedChunks = completedChunks;
    this.state.progress = (completedChunks / this.state.totalChunks) * 100;
    this.emitProgress();
  }
}
```

## 2. DownloadChunkManager

### 2.1 Chunk Treatment

```typescript
class DownloadChunkManager {
  private activeChunks: Map<string, ChunkProcess>;
  private maxParallelChunks: number;

  async processChunk(chunk: DataChunk): Promise<void> {
    const chunkProcess = new ChunkProcess(chunk);
    this.activeChunks.set(chunk.id, chunkProcess);

    try {
      await chunkProcess.process();
      await this.mergeChunkFile(chunk.id);
    } finally {
      this.activeChunks.delete(chunk.id);
    }
  }
}
```

### 2.2 Memory Management

```typescript
class ChunkProcess {
  private memoryLimit: number;
  private buffer: Buffer;

  async processWithMemoryCheck(data: any) {
    const memoryUsage = process.memoryUsage().heapUsed;

    if (memoryUsage > this.memoryLimit) {
      await this.flushToFile();
      this.buffer = Buffer.alloc(0);
    }

    this.buffer = Buffer.concat([this.buffer, data]);
  }
}
```

## 3. File System Management

### 3.1 File Operations

```typescript
class FileSystemManager {
  private readonly baseDir: string;

  async createTempDirectory(): Promise<string> {
    const tempDir = path.join(this.baseDir, "temp", uuidv4());
    await fs.promises.mkdir(tempDir, { recursive: true });
    return tempDir;
  }

  async cleanupTempFiles(downloadId: string): Promise<void> {
    const tempDir = this.getTempDirectory(downloadId);
    await fs.promises.rm(tempDir, { recursive: true, force: true });
  }
}
```

### 3.2 Stream Processing

```typescript
class StreamManager {
  createReadStream(filePath: string, options: StreamOptions): ReadStream {
    return fs.createReadStream(filePath, {
      highWaterMark: this.calculateOptimalBufferSize(),
      ...options,
    });
  }

  async pipeWithProgress(
    readStream: ReadStream,
    writeStream: WriteStream,
    onProgress: (progress: number) => void
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      readStream.pipe(writeStream).on("error", reject).on("finish", resolve);
    });
  }
}
```

## 4. State Management

### 4.1 State Store

```typescript
class StateStore {
  private state: Map<string, any>;
  private subscribers: Set<(state: any) => void>;

  setState(key: string, value: any) {
    this.state.set(key, value);
    this.notifySubscribers();
  }

  subscribe(callback: (state: any) => void) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }
}
```

### 4.2 Event Management

```typescript
class EventManager extends EventEmitter {
  private readonly eventHistory: Map<string, any[]>;

  emitWithHistory(event: string, data: any) {
    this.saveToHistory(event, data);
    this.emit(event, data);
  }

  getEventHistory(event: string): any[] {
    return this.eventHistory.get(event) || [];
  }
}
```

## 5. Dependency Management

### 5.1 Dependency Injection

```typescript
interface Dependencies {
  fileManager: FileSystemManager;
  stateStore: StateStore;
  eventManager: EventManager;
  chunkManager: DownloadChunkManager;
}

class DependencyContainer {
  private static instance: DependencyContainer;
  private dependencies: Dependencies;

  static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
    }
    return DependencyContainer.instance;
  }

  register<K extends keyof Dependencies>(key: K, dependency: Dependencies[K]) {
    this.dependencies[key] = dependency;
  }
}
```

### 5.2 Service Locator

```typescript
class ServiceLocator {
  private static services: Map<string, any> = new Map();

  static register(name: string, service: any) {
    this.services.set(name, service);
  }

  static get<T>(name: string): T {
    if (!this.services.has(name)) {
      throw new Error(`Service ${name} not found`);
    }
    return this.services.get(name);
  }
}
```
