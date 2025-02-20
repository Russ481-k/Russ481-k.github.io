import { Header } from "@/app/Components/Header";
import { Footer } from "../Components/Footer";
import { TopButton } from "../TopButton";
import { LanguageSelector } from "../Components/LanguageSelector";

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <html lang={lng}>
      <body>
        <Header />
        {children}
        <TopButton />
        <LanguageSelector />
        <Footer />
      </body>
    </html>
  );
}
