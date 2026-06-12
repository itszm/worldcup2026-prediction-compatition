import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

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
        <Navbar />
        <main className="main-layout">{children}</main>
      </body>
    </html>
  );
}
