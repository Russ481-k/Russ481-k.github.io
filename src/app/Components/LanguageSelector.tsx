"use client";

import { useTranslation } from "react-i18next";

export const LanguageSelector = () => {
  const { t, i18n } = useTranslation("common");

  const toggleLanguage = async () => {
    try {
      const nextLang = i18n.resolvedLanguage === "ko" ? "en" : "ko";
      await i18n.changeLanguage(nextLang);
    } catch (error) {
      console.error("Language toggle error:", error);
    }
  };

  return (
    <div className="language_selector">
      <button className="lang_btn" onClick={toggleLanguage}>
        {i18n.resolvedLanguage === "en" ? "eng" : "kor"}
      </button>
    </div>
  );
};
