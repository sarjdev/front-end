import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/app/assets/styles/_index.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "sarj.dev - Elektrikli Araç Şarj İstasyonları Haritası",
  description:
    "Elektrikli araçlar için şarj istasyonlarını bulabileceğiniz interaktif harita uygulaması. sarj.dev ile şarj istasyonlarını bulun ve kullanımınızı kolaylaştırın.",
  keywords:
    "sarj, sarj.dev, elektrikli araç, şarj, şarj istasyonu, esarj, eşarj, şarjdev, şarj.dev, harita, şarj istasyonu",
  themeColor: "#000000",
  manifest: "/manifest.json",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1
  },
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico"
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <GoogleAnalytics gaId="G-Z3RZVVR8R1" />
    </html>
  );
}
