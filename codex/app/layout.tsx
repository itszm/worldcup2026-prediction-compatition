import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NORTHSTAR 26 | 世界杯预测实验室",
  description: "2026 世界杯对阵、评分与预测可视化",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
