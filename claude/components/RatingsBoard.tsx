"use client";

import { KNOCKOUT_BY_ID, ROUND_NAMES, TEAMS } from "@/lib/data";
import { Rating, RatingsMap, overallScore } from "@/lib/ratings";

// 把存储键还原为可读的比赛名称
function describe(key: string): { stage: string; teams: string } | null {
  if (key.startsWith("m")) {
    const m = KNOCKOUT_BY_ID[Number(key.slice(1))];
    if (!m) return null;
    return {
      stage: `${ROUND_NAMES[m.round]} M${m.id}`,
      teams: `${TEAMS[m.home].flag} ${TEAMS[m.home].name} vs ${TEAMS[m.away].flag} ${TEAMS[m.away].name}`,
    };
  }
  const g = key.match(/^g-([A-L])-(\w{3})-(\w{3})$/);
  if (g && TEAMS[g[2]] && TEAMS[g[3]]) {
    return {
      stage: `小组赛 ${g[1]} 组`,
      teams: `${TEAMS[g[2]].flag} ${TEAMS[g[2]].name} vs ${TEAMS[g[3]].flag} ${TEAMS[g[3]].name}`,
    };
  }
  return null;
}

function scoreColor(v: number) {
  if (v >= 8.5) return "text-emerald-300";
  if (v >= 7) return "text-sky-300";
  if (v >= 5) return "text-amber-300";
  return "text-rose-300";
}

export default function RatingsBoard({ ratings }: { ratings: RatingsMap }) {
  const rows = Object.entries(ratings)
    .map(([key, r]) => ({ key, r, info: describe(key), score: overallScore(r) }))
    .filter((x): x is typeof x & { info: NonNullable<ReturnType<typeof describe>> } => x.info !== null)
    .sort((a, b) => b.score - a.score);

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-sm text-slate-500">
        还没有评分。点击任意比赛卡片上的「评分」按钮,从观赏性、激烈程度、技战术三个维度为比赛打分。
      </div>
    );
  }

  const avg = rows.reduce((s, x) => s + x.score, 0) / rows.length;
  const best = rows[0];

  return (
    <div>
      <div className="mb-4 grid grid-cols-3 gap-3 text-center">
        <Stat label="已评分场次" value={`${rows.length}`} />
        <Stat label="平均综合分" value={avg.toFixed(1)} />
        <Stat label="我心中的最佳比赛" value={best.info.teams} small />
      </div>
      <div className="space-y-1.5">
        {rows.map(({ key, r, info, score }, i) => (
          <div
            key={key}
            className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm backdrop-blur"
          >
            <span className="w-5 text-center text-[11px] tabular-nums text-slate-500">{i + 1}</span>
            <span className={`w-10 text-base font-black tabular-nums ${scoreColor(score)}`}>
              {score.toFixed(1)}
            </span>
            <span className="text-slate-200">{info.teams}</span>
            <span className="text-[10px] text-slate-500">{info.stage}</span>
            <span className="ml-auto text-[10px] tabular-nums text-slate-500">
              ⚽ {r.excitement} · 🔥 {r.intensity} · 🧠 {r.tactics}
            </span>
            {r.comment && <span className="w-full pl-8 text-xs italic text-slate-400">“{r.comment}”</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur">
      <div className={`font-black text-white ${small ? "truncate text-sm leading-7" : "text-xl"}`}>{value}</div>
      <div className="text-[10px] text-slate-500">{label}</div>
    </div>
  );
}
