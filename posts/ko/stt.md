---
title: "SpeechRecognition      "
date: "2025-02-12"
category: "frontend"
description: " Web Speech API     SpeechRecognition   ,      ."
tags: ["SpeechRecognition", "Web Speech API", "JavaScript", "Frontend"]
thumbnail: ""
---

!           **SpeechRecognition **   .     Web Speech API      ,           .

---

## 1. SpeechRecognition ?

SpeechRecognition         .    Web Speech API(  `webkitSpeechRecognition`) ,        .   API    ,           .

---

## 2.   

### 2.1   

 ,    SpeechRecognition  . ,     .  ,    ,           .

```tsx
class SpeechRecognition {
  private recognition: any;

  constructor() {
    //   SpeechRecognition  webkitSpeechRecognition 
    this.recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    this.setupConfig();
  }

  private setupConfig(): void {
    this.recognition.lang = "ko-KR"; //  
    this.recognition.continuous = false; //    
    this.recognition.interimResults = false; //    
  }
  // ...
}
```

  ,       .

---

### 2.2    

#### **startListening**

`startListening`      .     ,        .   ,        .

```tsx
public startListening(options: ListeningOptions): void {
  //      
  this.recognition.start();
}
```

#### **stopListening**

 `stopListening`    .    ,          .

```tsx
public stopListening(): void {
  this.recognition.stop();
}
```

---

### 2.3   : onResult onError

#### **onResult**

    , `onResult`       .       ,       .

```tsx
private onResult(callback: (text: string) => void): void {
  this.recognition.onresult = (event: SpeechRecognitionEvent) => {
    const transcript = Array.from(event.results)
      .map(result => result[0].transcript)
      .join('');
    callback(transcript);
  };
}
```

#### **onError**

,      `onError`  .         ,       .

```tsx
private onError(callback: (error: Error) => void): void {
  this.recognition.onerror = (event: any) => {
    callback(new Error(event.error));
  };
}
```

---

## 3. SpeechRecognition  

- **  →  :**  
    ,       .         .

- ** :**  
   Web Speech API   ,         .   ?

- **  :**  
       onError   ,      .       ,   .

---

## 4.   

SpeechRecognition  ,        ,            .

1. **  :**  
      , SpeechRecognition     .

2. **   :**  
            .

3. ** :**  
       ,         .

---

## 5. 

 SpeechRecognition   ,             .            .

       ,       .      !

.
