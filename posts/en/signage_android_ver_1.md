---
title: "Building APK with React Native Expo - A Troubleshooting Journey"
date: "2025-02-12"
category: "frontend"
description: "A detailed guide on resolving HTTP API issues when building APK with React Native Expo"
tags: ["React Native", "Expo", "Android", "Mobile"]
thumbnail: "/images/react-native.png"
---

### My Journey of Troubleshooting APK Build with React Native Expo

Hello everyone! Today I'd like to share my **troubleshooting experience while building an APK with React Native Expo**. I particularly struggled with `http://` API usage issues, and I hope this helps anyone facing similar problems. 😊

---

## 📦 First Build – `development` Build

Initially, I followed the Expo documentation and ran `eas build`. I configured `eas.json` as shown below and executed the build command.

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

After the build is complete, download the APK from Expo.dev and run the app...  
🤦‍♂️ **"development build" so it can only be run in the Expo Go environment.**  
Oh no, this wasn't what I wanted.

So I removed `development` and built again.

```bash
eas build --platform android
```

This time, **an AAB file was created**.  
AAB is the format used when distributing to the Google Play Store, so **local APK installation is not possible**.  
(I just wanted to create an APK, but...)

---

## 🛠 Second Build – Creating APK

To create an APK, I modified `eas.json` as follows.

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

And then build again!

```bash
eas build -p android --profile preview
```

Finally, the APK was created! 🎉  
However...  
🤦‍♂️ **The data is not loaded from the API.**  
The data did not appear due to the "Network Error" error.

---

## 🤔 Problem Analysis – `http://` API Blocked?!

When I checked the logs, I saw `AxiosError: Network Error`.  
After searching Google and ChatGPT, I learned that **in Android 9 (Pie) and above, HTTP traffic is blocked by default**.

To solve this, **you need to add `android:usesCleartextTraffic="true"` to AndroidManifest.xml**.  
In Expo, you need to modify `app.json`.

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

After modifying, I built again, but...  
**Failed again**. 😭  
This time, even when I changed to `fetch`, the same `Network request failed` error occurred.

---

## 🔍 Final Solution – Installing the `expo-build-properties` Plugin

After searching Stack Overflow, I found the solution.  
In Expo, **you need to install the `expo-build-properties` plugin and add the `useCleartextTraffic` setting**.

```bash
npx expo install expo-build-properties
```

Then, I added the plugin in `app.json`.

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

After building again, I decompiled the APK using `apktool` and checked it...  
🤯 **`useCleartextTraffic` was not applied!!!**  
What's this?

I thought maybe the spelling was wrong, so I checked it again,  
`useCleartextTraffic` → **`usesCleartextTraffic`(s added)**

After modifying the spelling, I built again...  
🎉 **Finally succeeded!!!**

---

## 🚨 Additional Problem – Emulator Connection Not Working?!

After solving this, **the problem of API requests not working in the emulator occurred**.  
I'm still looking for a solution, but it seems I need to look into Expo's network settings more.

---

## 📌 Conclusion – What I Learned from the Process

1. **APK build requires adding the `buildType: "apk"` setting**
2. **In Android 9 and above, `http://` API requires the `usesCleartextTraffic: true` setting**
3. **Expo requires installing the `expo-build-properties` plugin**
4. **Be careful with typos... `useCleartextTraffic` is not `usesCleartextTraffic` (s is present)**

I'm finally getting the hang of the build process.  
If you're experiencing similar issues, I hope this helps you! 😆
