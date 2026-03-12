"use client";

import { useEffect } from "react";
import { Header } from "@/app/Components/Header";
import { getTranslation } from "@/app/i18n";

export default function ClientLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  useEffect(() => {
    let cancelled = false;
    getTranslation(lang, "common").then(({ i18n }) => {
      if (!cancelled) {
        i18n.changeLanguage(lang);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  return (
    <>
      <Header />
      {children}
    </>
  );
}
