import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "NORTHSTAR 26 | 世界杯预测实验室",
  description: "2026 世界杯对阵、评分与预测可视化",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-X8KF1HKTW0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-X8KF1HKTW0');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
