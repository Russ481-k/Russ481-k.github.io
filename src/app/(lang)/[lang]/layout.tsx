import "../../Styles/globals.scss";
import type { Metadata } from "next";
import ClientLayout from "./ClientLayout";
import { languages } from "@/app/i18n/settings";
import { Footer } from "@/app/Components/Footer";
import { LanguageSelectorButton } from "@/app/Components/LanguageSelectorButton";
import { TopButton } from "@/app/TopButton";
import { pretendard } from "@/app/Styles/fonts";

export const metadata: Metadata = {
  title: `Bin's Space`,
  description: "Generated by create next app",
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lang: lng }));
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!languages.includes(lang)) {
    return null;
  }

  return (
    <html lang={lang} className={pretendard.variable} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={pretendard.className} suppressHydrationWarning>
        <ClientLayout params={{ lang }}>
          {children}
          <TopButton />
          <LanguageSelectorButton />
          <Footer />
        </ClientLayout>
        <div id="modal-root" />
      </body>
    </html>
  );
}
