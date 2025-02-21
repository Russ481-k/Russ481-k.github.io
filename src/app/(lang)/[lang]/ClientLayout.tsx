"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/app/i18n";
import { Header } from "@/app/Components/Header";

export default function ClientLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initI18n = async () => {
      const { i18n } = await useTranslation(lang, "common");
      await i18n.changeLanguage(lang);
      setInitialized(true);
    };

    initI18n().catch(console.error);
  }, [lang]);

  if (!initialized) return null;

  return (
    <>
      <Header />
      {children}
    </>
  );
}
