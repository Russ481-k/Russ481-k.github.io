---
title: "React Native Expo APK  "
date: "2025-02-12"
category: "frontend"
description: "React Native Expo APK   HTTP API       "
tags: ["React Native", "Expo", "Android", "Mobile"]
thumbnail: "/images/react-native.png"
---

### React Native Expo APK   

, !  **React Native Expo  APK    **  .  `http://` API     ,          . 

---

##     – `development` 

 Expo    `eas build` . `eas.json`     .

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

   Expo.dev APK   ...  
‍ **"development build" Expo Go   .**  
, ...  .

 `development`   .

```bash
eas build --platform android
```

  **AAB  **.  
AAB        ** APK  **.  
(  APK   ...)

---

##     – APK 

APK     `eas.json` .

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

  !

```bash
eas build -p android --profile preview
```

 APK !   
...  
‍ **API   .**  
"Network Error"    .

---

##    – `http://` API ?!

  `AxiosError: Network Error` .  
 ChatGPT  , **Android 9(Pie)   HTTP  **   .

  **AndroidManifest.xml `android:usesCleartextTraffic="true"`  **.  
Expo `app.json`  .

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

   ...  
** **.   
 `fetch`   `Network request failed`  .

---

##    – `expo-build-properties`  

 Stack Overflow    .  
Expo **`expo-build-properties`  , `useCleartextTraffic`  **  .

```bash
npx expo install expo-build-properties
```

 `app.json`  .

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

   APK (`apktool` ) ...  
 **`useCleartextTraffic`  !!!**  
  ...

     ,  
`useCleartextTraffic` → **`usesCleartextTraffic`(s )**

    ...  
 ** !!!**

---

##    –   ?!

    ** API     **.  
     , Expo        .

---

##   –   

1. **APK  `buildType: "apk"`   **
2. **Android 9  `http://` API  `usesCleartextTraffic: true`  **
3. **Expo `expo-build-properties`   **
4. ** ... `useCleartextTraffic`  `usesCleartextTraffic`(s )**

     .  
        ! 
