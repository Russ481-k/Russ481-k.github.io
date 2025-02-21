"use client";

import { Header } from "@/app/Components/Header";
import { useTranslation } from "@/app/i18n";

export default function ClientLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  useTranslation(lang, "common").then(({ i18n }) => {
    i18n.changeLanguage(lang);
  });

  return (
    <>
      <Header />
      {children}
    </>
  );
}
