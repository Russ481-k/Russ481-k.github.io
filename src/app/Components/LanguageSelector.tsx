"use client";

import { useTranslation } from "react-i18next";
import i18n from "../i18n";

export const LanguageSelector = () => {
  const { t } = useTranslation("common");

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
        {i18n.resolvedLanguage === "en" ? "kor" : "eng"}
      </button>
    </div>
  );
};
