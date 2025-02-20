"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

export default function ClientLayout({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) {
  const { t } = useTranslation("common");

  // 디버깅을 위한 번역 테스트
  useEffect(() => {
    console.log("Translation test:", {
      title: t("title"),
      headerTitle: t("header.title"),
    });
  }, [t]);

  useEffect(() => {
    const changeLanguage = async () => {
      try {
        if (i18n.resolvedLanguage !== lang) {
          await i18n.changeLanguage(lang);
        }
      } catch (error) {
        console.error("Language change error:", error);
      }
    };
    changeLanguage();
  }, [lang]);

  return <>{children}</>;
}
