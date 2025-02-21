"use client";

import { useTranslation } from "react-i18next";

export const LanguageSelectorButton = () => {
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
      <button className="language_selector_button" onClick={toggleLanguage}>
        {i18n.resolvedLanguage === "en" ? "Eng" : "Kor"}
      </button>
    </div>
  );
};
