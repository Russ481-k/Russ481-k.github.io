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
    useTranslation(lang, "common").then(({ i18n }) => {
      i18n.changeLanguage(lang);
      setInitialized(true);
    });
  }, [lang]);

  if (!initialized) return null;

  return (
    <>
      <Header />
      {children}
    </>
  );
}
