import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "2026 FIFA 世界杯预测与评分中心",
  description: "全网首个基于 AI 预测的世界杯模拟系统，支持赛程浏览、胜率分析、深度比赛打分及用户自定义淘汰赛对决模拟。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
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
        <Navbar />
        <main className="main-layout">{children}</main>
      </body>
    </html>
  );
}
