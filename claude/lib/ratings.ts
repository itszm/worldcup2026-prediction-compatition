"use client";

import { useEffect, useState } from "react";

// 评分系统:每场比赛三个维度,1–10 分
//   观赏性 40% + 激烈程度 30% + 技战术 30% → 综合分
export type Rating = {
  excitement: number; // 观赏性
  intensity: number;  // 激烈程度
  tactics: number;    // 技战术
  comment?: string;
  updatedAt: number;
};

export type RatingsMap = Record<string, Rating>;

const STORAGE_KEY = "wc2026-ratings";

export function overallScore(r: Rating): number {
  return Math.round((r.excitement * 0.4 + r.intensity * 0.3 + r.tactics * 0.3) * 10) / 10;
}

export function useRatings() {
  const [ratings, setRatings] = useState<RatingsMap>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setRatings(JSON.parse(raw));
    } catch {
      // 数据损坏时重置
      localStorage.removeItem(STORAGE_KEY);
    }
    setLoaded(true);
  }, []);

  const save = (key: string, rating: Rating) => {
    setRatings((prev) => {
      const next = { ...prev, [key]: rating };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const remove = (key: string) => {
    setRatings((prev) => {
      const next = { ...prev };
      delete next[key];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return { ratings, save, remove, loaded };
}
