"use client";

import { useState } from "react";
import Bracket from "@/components/Bracket";
import GroupStage from "@/components/GroupStage";
import Predictions from "@/components/Predictions";
import RatingsBoard from "@/components/RatingsBoard";
import RatingModal, { RatingTarget } from "@/components/RatingModal";
import { useRatings } from "@/lib/ratings";

const TABS = [
  { id: "bracket", label: "淘汰赛对阵图", icon: "🏟️" },
  { id: "groups", label: "小组赛", icon: "🌎" },
  { id: "predictions", label: "冠军预测", icon: "🔮" },
  { id: "ratings", label: "我的评分", icon: "⭐" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function Home() {
  const [tab, setTab] = useState<TabId>("bracket");
  const [target, setTarget] = useState<RatingTarget | null>(null);
  const { ratings, save, remove } = useRatings();

  return (
    <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 pb-16 sm:px-6">
      {/* 头部 */}
      <header className="py-10 text-center">
        <div className="text-[11px] uppercase tracking-[0.4em] text-slate-400">
          FIFA World Cup 26 · United 2026
        </div>
        <h1 className="mt-2 bg-gradient-to-r from-emerald-300 via-sky-300 to-rose-300 bg-clip-text text-4xl font-black text-transparent sm:text-5xl">
          2026 美加墨世界杯
        </h1>
        <p className="mt-3 text-sm text-slate-400">
          6月11日 – 7月19日 · 美国 / 加拿大 / 墨西哥 · 16 座城市
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          <Chip>48 支球队</Chip>
          <Chip>12 个小组</Chip>
          <Chip>104 场比赛</Chip>
          <Chip>决赛 · 纽约 MetLife</Chip>
        </div>
      </header>

      {/* 标签页 */}
      <nav className="sticky top-3 z-40 mx-auto mb-8 flex w-fit max-w-full gap-1 overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/80 p-1.5 backdrop-blur-xl">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition ${
              tab === t.id
                ? "bg-gradient-to-r from-emerald-500/90 to-teal-500/90 text-white shadow-lg shadow-emerald-500/25"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </nav>

      {tab === "bracket" && (
        <>
          <p className="mb-4 text-center text-xs text-slate-500">
            高亮一方为预测晋级球队,百分比为晋级概率(含加时/点球)· 对阵结构为官方赛程,球队为赛前按小组推演的预测、不含实际赛果 · 左右滑动查看完整对阵图
          </p>
          <Bracket ratings={ratings} onRate={setTarget} />
        </>
      )}
      {tab === "groups" && <GroupStage ratings={ratings} onRate={setTarget} />}
      {tab === "predictions" && <Predictions />}
      {tab === "ratings" && <RatingsBoard ratings={ratings} />}

      {/* 页脚 */}
      <footer className="mt-14 border-t border-white/5 pt-6 text-center text-[11px] leading-relaxed text-slate-600">
        分组与赛程基于 2025年12月5日 FIFA 最终抽签结果与官方对阵结构 ·
        晋级球队与全部概率为 Claude 的纯赛前预测,不参考任何实际比赛结果,仅供娱乐 ·
        评分数据保存在本地浏览器(localStorage)
      </footer>

      {target && (
        <RatingModal
          target={target}
          existing={ratings[target.key]}
          onSave={save}
          onDelete={remove}
          onClose={() => setTarget(null)}
        />
      )}
    </main>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">
      {children}
    </span>
  );
}
