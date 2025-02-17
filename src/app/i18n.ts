"use client";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
  resources: {
    en: {
      common: {
        title: "Bin's Space",
        intro: "Intro",
        work: "Work",
        close: "Close",
      },
    },
    ko: {
      common: {
        title: "빈스 스페이스",
        intro: "소개",
        work: "경력",
        close: "닫기",
      },
    },
  },
  lng: "ko",
  fallbackLng: "ko",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
