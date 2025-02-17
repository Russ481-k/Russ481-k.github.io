---
title: "React Native Expo APK 빌드 삽질기"
date: "2025-02-12"
category: "mobile"
description: "React Native Expo로 APK 빌드 시 HTTP API 사용 문제와 해결 과정에 대한 상세한 가이드"
tags: ["React Native", "Expo", "Android", "Mobile"]
thumbnail: "/images/react-native.png"
---

### React Native Expo로 APK 빌드하면서 삽질한 이야기

안녕하세요, 여러분! 오늘은 **React Native Expo를 이용해서 APK 빌드를 진행하면서 겪었던 삽질기**를 공유해보려고 합니다. 특히 `http://` API 사용 문제로 고생했던 경험이 있는데, 혹시 비슷한 문제를 겪고 있는 분이 있다면 참고가 되길 바랍니다. 😊

---

## 📦 첫 번째 빌드 – `development` 빌드

처음에는 Expo 공식 문서를 참고하면서 `eas build`를 진행했어요. `eas.json`을 아래처럼 설정하고 빌드 명령어를 실행했죠.

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  }
}
```

```bash
eas build --profile development --platform android
```

빌드 완료 후 Expo.dev에서 APK를 다운로드하고 앱을 실행했더니...  
🤦‍♂️ **"development build"라서 Expo Go 환경에서만 실행 가능하네요.**  
아, 이런... 이게 아니었죠.

그래서 `development`를 빼고 다시 빌드했습니다.

```bash
eas build --platform android
```

그러나 이번엔 **AAB 파일이 생성**되었습니다.  
AAB는 구글 플레이 스토어에 배포할 때 쓰는 포맷이어서 **로컬에서 APK 설치가 불가능**합니다.  
(저는 단순히 APK를 생성하고 싶었을 뿐인데...)

---

## 🛠 두 번째 빌드 – APK 만들기

APK를 생성하기 위해 아래와 같이 `eas.json`을 수정했습니다.

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

그리고 다시 빌드!

```bash
eas build -p android --profile preview
```

드디어 APK가 생성되었습니다! 🎉  
그런데...  
🤦‍♂️ **API에서 데이터를 불러오지 않습니다.**  
"Network Error"가 발생하면서 데이터가 표시되지 않았어요.

---

## 🤔 문제 분석 – `http://` API 차단?!

로그를 찍어보니 `AxiosError: Network Error`가 발생했더군요.  
구글링과 ChatGPT 검색 결과, **Android 9(Pie) 이상에서는 기본적으로 HTTP 트래픽이 차단**된다는 사실을 알게 됐습니다.

이를 해결하려면 **AndroidManifest.xml에 `android:usesCleartextTraffic="true"`를 추가해야 한다**는군요.  
Expo에서는 `app.json`을 수정해야 합니다.

```json
{
  "expo": {
    "android": {
      "useCleartextTraffic": true,
      "permissions": ["INTERNET", "ACCESS_NETWORK_STATE"]
    }
  }
}
```

수정 후 다시 빌드했지만...  
**또 실패**. 😭  
이번에는 `fetch`로 바꿔도 같은 `Network request failed` 에러가 발생했습니다.

---

## 🔍 최종 해결 – `expo-build-properties` 플러그인 설치

결국 Stack Overflow를 뒤지다 해결 방법을 찾았습니다.  
Expo에서는 **`expo-build-properties` 플러그인을 설치하고, `useCleartextTraffic` 설정을 추가**해야 한다는 것이었어요.

```bash
npx expo install expo-build-properties
```

그리고 `app.json`에서 플러그인을 추가했습니다.

```json
"plugins": [
  [
    "expo-build-properties",
    {
      "android": {
        "usesCleartextTraffic": true
      }
    }
  ]
]
```

다시 빌드 후 APK를 디컴파일(`apktool` 사용)해서 확인해보니...  
🤯 **`useCleartextTraffic`이 적용되지 않았습니다!!!**  
이게 무슨 일이야...

혹시 철자가 틀렸나 싶어서 다시 보니,  
`useCleartextTraffic` → **`usesCleartextTraffic`(s 추가됨)**

철자 수정 후 다시 빌드하니...  
🎉 **드디어 성공!!!**

---

## 🚨 추가 문제 – 에뮬레이터 연결 안됨?!

그런데 이걸 해결하고 보니 **에뮬레이터에서 API 요청이 안 되는 문제가 발생**했습니다.  
해결 방법은 아직 찾고 있는 중인데, Expo의 네트워크 설정을 좀 더 살펴봐야 할 것 같습니다.

---

## 📌 결론 – 삽질하면서 배운 것

1. **APK 빌드는 `buildType: "apk"` 설정을 추가해야 함**
2. **Android 9 이상에서 `http://` API를 사용하려면 `usesCleartextTraffic: true` 설정이 필요함**
3. **Expo에서는 `expo-build-properties` 플러그인을 설치해야 함**
4. **오타 조심... `useCleartextTraffic`이 아니라 `usesCleartextTraffic`(s 있음)**

이제야 빌드 과정이 익숙해진 것 같네요.  
혹시 비슷한 문제를 겪고 있다면 참고하셔서 빠르게 해결하길 바랍니다! 😆
