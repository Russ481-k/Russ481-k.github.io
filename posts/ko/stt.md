---
title: "SpeechRecognition 클래스로 웹 음성 인식 기능 구현하기"
date: "2025-02-12"
category: "frontend"
description: "브라우저의 Web Speech API를 활용해 음성을 텍스트로 변환하는 SpeechRecognition 클래스에 대해 알아보고, 그 주요 기능과 사용법을 소개하는 가이드입니다."
tags: ["SpeechRecognition", "Web Speech API", "JavaScript", "Frontend"]
thumbnail: "/images/speech-recognition.png"
---

안녕하세요! 오늘은 웹에서 음성 인식 기능을 쉽게 구현할 수 있도록 도와주는 **SpeechRecognition 클래스**에 대해 알아보려고 해요. 이 클래스는 브라우저에 내장된 Web Speech API를 활용해 여러분의 음성을 텍스트로 변환해 주는데요, 복잡한 설정 없이도 간편하게 음성 인식 기능을 사용할 수 있게 만들어졌답니다.

---

## 1. SpeechRecognition 클래스란?

SpeechRecognition 클래스는 마치 친구처럼 음성 인식 기능을 도와주는 역할을 해요. 브라우저에 기본 탑재된 Web Speech API(일부 브라우저에서는 `webkitSpeechRecognition`)를 감싸서, 음성을 텍스트로 변환하는 과정을 더 쉽게 만들어 주죠. 덕분에 복잡한 API를 직접 다루지 않아도 되어서, 개발자 여러분이 좀 더 편하게 음성 인식 기능을 사용할 수 있어요.

---

## 2. 주요 기능과 사용법

### 2.1 초기화 및 설정

클래스를 생성하면, 내부적으로 브라우저에 내장된 SpeechRecognition 객체가 만들어져요. 이때, 필요한 기본 설정도 같이 해두는데요. 예를 들어, 인식할 언어를 한국어로 지정하거나, 연속 인식을 꺼서 한 번에 한 문장씩 인식하도록 설정할 수 있어요.

```tsx
class SpeechRecognition {
  private recognition: any;

  constructor() {
    // 브라우저에 따라 SpeechRecognition 혹은 webkitSpeechRecognition 사용
    this.recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    this.setupConfig();
  }

  private setupConfig(): void {
    this.recognition.lang = "ko-KR"; // 한국어 인식
    this.recognition.continuous = false; // 연속 인식 여부 설정
    this.recognition.interimResults = false; // 중간 결과 제공 여부
  }
  // ...
}
```

이렇게 초기화만 해두면, 이제 음성 인식을 시작할 준비가 완료되는 거죠.

---

### 2.2 음성 인식 시작과 중지

#### **startListening**

`startListening` 메서드는 음성 인식을 시작하는 기능을 담당해요. 사용자가 마이크에 대고 말하기 시작하면, 이 메서드가 음성 데이터를 캡처해 텍스트로 변환해 준답니다. 필요한 옵션을 전달하면, 인식 과정에서 더 다양한 설정을 적용할 수도 있어요.

```tsx
public startListening(options: ListeningOptions): void {
  // 옵션에 따른 추가 설정 처리 가능
  this.recognition.start();
}
```

#### **stopListening**

반대로 `stopListening` 메서드는 음성 인식을 중지시켜요. 사용자가 말하는 것을 멈추거나, 오류가 발생했을 때 불필요하게 계속 인식하지 않도록 종료할 수 있죠.

```tsx
public stopListening(): void {
  this.recognition.stop();
}
```

---

### 2.3 이벤트 핸들러 등록: onResult와 onError

#### **onResult**

음성 인식 중에 결과가 나오면, `onResult` 콜백을 통해 그 결과를 받아볼 수 있어요. 이 콜백은 여러 번 호출될 수도 있고, 최종 인식된 텍스트를 한데 모아서 전달해 준답니다.

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

또한, 음성 인식 과정에서 오류가 발생하면 `onError` 이벤트가 발생해요. 이때 등록해둔 콜백을 통해 오류 정보를 받아볼 수 있고, 필요한 경우 사용자에게 친절하게 안내할 수 있답니다.

```tsx
private onError(callback: (error: Error) => void): void {
  this.recognition.onerror = (event: any) => {
    callback(new Error(event.error));
  };
}
```

---

## 3. SpeechRecognition 클래스의 장점

- **실시간 음성 → 텍스트 변환:**  
  사용자가 말하는 순간, 음성을 텍스트로 바꿔서 바로 사용할 수 있어요. 덕분에 음성 명령어 기반 애플리케이션을 쉽게 만들 수 있답니다.

- **간단한 인터페이스:**  
  복잡한 Web Speech API를 직접 다루지 않아도, 간단한 메서드 호출로 음성 인식을 시작하고 중지할 수 있어요. 개발자라면 정말 편리하겠죠?

- **오류 처리 기능:**  
  음성 인식 도중 문제가 생기면 onError 핸들러가 바로 작동해서, 문제를 빠르게 파악하고 대응할 수 있어요. 사용자에게 친절한 에러 메시지를 제공할 수 있으니, 서비스 품질도 높아져요.

---

## 4. 실제 활용 예시

SpeechRecognition 클래스를 활용하면, 예를 들어 음성 명령어를 통해 스마트홈 기기를 제어하거나, 디지털 사이니지 시스템에서 음성으로 콘텐츠를 전환하는 등의 다양한 애플리케이션을 만들 수 있어요.

1. **사용자 음성 입력:**  
   사용자가 마이크에 대고 말하면, SpeechRecognition 클래스가 이를 텍스트로 변환해 줍니다.

2. **명령어 처리 시스템 연계:**  
   변환된 텍스트는 이후 명령어 분석기를 통해 필요한 명령어와 매칭되어 실행되죠.

3. **실시간 피드백:**  
   명령어 실행 결과가 화면에 표시되거나, 토스트 메시지로 사용자에게 알려져서 빠른 피드백을 받을 수 있어요.

---

## 5. 마무리하며

오늘은 SpeechRecognition 클래스에 대해 알아보았는데요, 이 클래스 덕분에 웹 애플리케이션에서도 손쉽게 음성 인식 기능을 구현할 수 있게 되었어요. 음성 명령어 기능을 통해 보다 직관적이고 혁신적인 사용자 경험을 제공할 수 있답니다.

음성 인식 기능에 대해 더 궁금한 점이 있거나, 실제 구현에 도전해보고 싶다면 언제든지 시작해 보세요. 여러분의 애플리케이션에 새로운 가능성을 열어줄 거예요!

감사합니다.
