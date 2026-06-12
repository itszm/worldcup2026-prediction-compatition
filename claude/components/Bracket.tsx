"use client";

import { KNOCKOUT_BY_ID, KnockoutMatch, ROUND_NAMES, TEAMS } from "@/lib/data";
import { RatingsMap, overallScore } from "@/lib/ratings";
import { RatingTarget } from "./RatingModal";

// 对阵图列结构:左半区 → 决赛 → 右半区(官方第73–104场对阵关系)
const COLS: { title: string; sub: string; ids: number[]; side: "L" | "R" | "C"; solo?: boolean }[] = [
  { title: "1/16 决赛", sub: "6.28 – 7.3", ids: [74, 77, 73, 75, 83, 84, 81, 82], side: "L" },
  { title: "1/8 决赛", sub: "7.4 – 7.7", ids: [89, 90, 93, 94], side: "L" },
  { title: "1/4 决赛", sub: "7.9 – 7.11", ids: [97, 98], side: "L" },
  { title: "半决赛", sub: "7.14", ids: [101], side: "L", solo: true },
  { title: "决赛", sub: "7.19 纽约", ids: [104], side: "C" },
  { title: "半决赛", sub: "7.15", ids: [102], side: "R", solo: true },
  { title: "1/4 决赛", sub: "7.9 – 7.11", ids: [99, 100], side: "R" },
  { title: "1/8 决赛", sub: "7.4 – 7.7", ids: [91, 92, 95, 96], side: "R" },
  { title: "1/16 决赛", sub: "6.28 – 7.3", ids: [76, 78, 79, 80, 86, 88, 85, 87], side: "R" },
];

function matchTarget(m: KnockoutMatch): RatingTarget {
  const h = TEAMS[m.home];
  const a = TEAMS[m.away];
  return {
    key: `m${m.id}`,
    title: `${ROUND_NAMES[m.round]} M${m.id} · ${m.date} · ${m.venue}`,
    teams: `${h.flag} ${h.name} vs ${a.flag} ${a.name}`,
  };
}

function TeamRow({ team, src, prob, winner }: { team: string; src: string; prob: number; winner: boolean }) {
  const t = TEAMS[team];
  return (
    <div className="flex items-center gap-1.5 py-0.5">
      <span className="text-base leading-none">{t.flag}</span>
      <span className={`truncate text-[13px] ${winner ? "font-semibold text-white" : "text-slate-400"}`}>
        {t.name}
      </span>
      <span className="text-[9px] text-slate-500">{src}</span>
      <span
        className={`ml-auto rounded-md px-1.5 py-px text-[10px] font-bold tabular-nums ${
          winner ? "bg-emerald-500/20 text-emerald-300" : "bg-white/5 text-slate-500"
        }`}
      >
        {prob}%
      </span>
    </div>
  );
}

export function MatchCard({
  m,
  ratings,
  onRate,
  recv,
  highlight,
}: {
  m: KnockoutMatch;
  ratings: RatingsMap;
  onRate: (t: RatingTarget) => void;
  recv?: "recv-l" | "recv-r" | "";
  highlight?: boolean;
}) {
  const rating = ratings[`m${m.id}`];
  const homeWins = m.homeProb >= 50;
  return (
    <div
      className={`bcard ${recv ?? ""} w-full rounded-xl border bg-white/[0.04] px-3 py-2 backdrop-blur transition hover:bg-white/[0.08] ${
        highlight
          ? "border-amber-400/40 shadow-lg shadow-amber-500/10"
          : "border-white/10 hover:border-emerald-400/40"
      }`}
    >
      <div className="mb-1 flex items-center justify-between text-[10px] text-slate-500">
        <span>
          M{m.id} · {m.date} · {m.venue}
        </span>
        <button
          onClick={() => onRate(matchTarget(m))}
          className={`rounded-md px-1.5 py-px font-semibold transition ${
            rating
              ? "bg-amber-400/15 text-amber-300 hover:bg-amber-400/25"
              : "bg-white/5 text-slate-400 hover:bg-white/15 hover:text-white"
          }`}
        >
          {rating ? `★ ${overallScore(rating).toFixed(1)}` : "评分"}
        </button>
      </div>
      <TeamRow team={m.home} src={m.homeSrc} prob={m.homeProb} winner={homeWins} />
      <TeamRow team={m.away} src={m.awaySrc} prob={100 - m.homeProb} winner={!homeWins} />
    </div>
  );
}

export default function Bracket({
  ratings,
  onRate,
}: {
  ratings: RatingsMap;
  onRate: (t: RatingTarget) => void;
}) {
  const final = KNOCKOUT_BY_ID[104];
  const third = KNOCKOUT_BY_ID[103];
  const champion = TEAMS[final.homeProb >= 50 ? final.home : final.away];

  return (
    <div className="overflow-x-auto pb-4">
      <div className="min-w-[2080px]">
        {/* 轮次标题行 */}
        <div className="flex">
          {COLS.map((col, i) => (
            <div key={i} className="flex-1 px-4 pb-3 text-center" style={{ minWidth: 225 }}>
              <div className={`text-sm font-bold ${col.side === "C" ? "text-amber-300" : "text-slate-200"}`}>
                {col.title}
              </div>
              <div className="text-[10px] text-slate-500">{col.sub}</div>
            </div>
          ))}
        </div>

        {/* 对阵图主体 */}
        <div className="flex h-[840px]">
          {COLS.map((col, ci) => {
            if (col.side === "C") {
              return (
                <div key={ci} className="grid flex-1 grid-rows-[1fr_auto_1fr]" style={{ minWidth: 235 }}>
                  <div className="flex flex-col items-center justify-end gap-1 pb-4">
                    <div className="text-5xl drop-shadow-[0_0_18px_rgba(251,191,36,0.45)]">🏆</div>
                    <div className="text-[10px] uppercase tracking-widest text-amber-300/80">预测冠军</div>
                    <div className="flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5">
                      <span className="text-xl">{champion.flag}</span>
                      <span className="font-black text-amber-200">{champion.name}</span>
                    </div>
                  </div>
                  <div className="px-4">
                    <MatchCard m={final} ratings={ratings} onRate={onRate} highlight />
                  </div>
                  <div className="flex flex-col justify-start gap-1 px-4 pt-6">
                    <div className="text-center text-[10px] text-slate-500">季军赛 · 7.18 迈阿密</div>
                    <MatchCard m={third} ratings={ratings} onRate={onRate} />
                  </div>
                </div>
              );
            }
            const feed = col.side === "L" ? "feed-r" : "feed-l";
            const recv: "recv-l" | "recv-r" | "" =
              col.title === "1/16 决赛" ? "" : col.side === "L" ? "recv-l" : "recv-r";
            return (
              <div key={ci} className="flex flex-1 flex-col" style={{ minWidth: 225 }}>
                {col.ids.map((id, i) => (
                  <div
                    key={id}
                    className={`bcell ${feed} ${col.solo ? "solo" : i % 2 === 0 ? "p1" : "p2"}`}
                  >
                    <MatchCard m={KNOCKOUT_BY_ID[id]} ratings={ratings} onRate={onRate} recv={recv} />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
