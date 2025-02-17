"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import i18next from "../i18n";

export const LanguageSelector = () => {
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState("ko");

  const toggleLanguage = () => {
    const nextLang = currentLang === "ko" ? "en" : "ko";
    setCurrentLang(nextLang);
    i18next.changeLanguage(nextLang);
    router.push(`/?lng=${nextLang}`);
  };

  return (
    <div className="language_selector">
      <button className="lang_btn" onClick={toggleLanguage}>
        {currentLang === "ko" ? "eng" : "kor"}
      </button>
    </div>
  );
};
