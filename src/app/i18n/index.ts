"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { resources } from "./resources";

const initI18next = async () => {
  await i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      resources,
      lng: "en",
      fallbackLng: "en",
      defaultNS: "common",
      ns: ["common"],
      react: {
        useSuspense: false,
      },
      interpolation: {
        escapeValue: false,
      },
    });
};

// i18n 초기화가 이미 되어있지 않은 경우에만 초기화
if (!i18n.isInitialized) {
  initI18next().catch((error) => {
    console.error("i18n initialization error:", error);
  });
}

// 디버깅을 위한 리소스 확인
console.log("i18n resources:", resources);
console.log("current language:", i18n.language);
console.log("resolved language:", i18n.resolvedLanguage);

export default i18n;
