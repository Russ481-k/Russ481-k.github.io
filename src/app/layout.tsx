import "./Styles/globals.scss";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./i18n";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Bin's Space`,
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {children}
        <div id="modal-root" />
      </body>
    </html>
  );
}
