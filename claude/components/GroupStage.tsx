"use client";

import { GROUPS, TEAMS } from "@/lib/data";
import { RatingsMap, overallScore } from "@/lib/ratings";
import { RatingTarget } from "./RatingModal";

// 预测晋级淘汰赛的 8 个成绩最好的小组第三
const THIRD_ADVANCING = new Set(["CZE", "BIH", "SCO", "PAR", "CIV", "SWE", "SEN", "ALG"]);

function rankStyle(pos: number, teamId: string) {
  if (pos <= 2) return { badge: "bg-emerald-500/20 text-emerald-300", row: "border-l-emerald-400/60" };
  if (pos === 3 && THIRD_ADVANCING.has(teamId))
    return { badge: "bg-amber-400/20 text-amber-300", row: "border-l-amber-400/60" };
  return { badge: "bg-white/5 text-slate-500", row: "border-l-transparent" };
}

export default function GroupStage({
  ratings,
  onRate,
}: {
  ratings: RatingsMap;
  onRate: (t: RatingTarget) => void;
}) {
  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <i className="inline-block h-2.5 w-2.5 rounded-sm bg-emerald-400/70" /> 预测小组前二(直接晋级)
        </span>
        <span className="flex items-center gap-1.5">
          <i className="inline-block h-2.5 w-2.5 rounded-sm bg-amber-400/70" /> 预测以最好小组第三晋级(8/12)
        </span>
        <span>条形为预测晋级淘汰赛概率;展开小组赛程可为每场比赛评分</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {GROUPS.map((g) => (
          <div
            key={g.id}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur transition hover:border-white/20"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="rounded-lg bg-gradient-to-r from-emerald-500/30 to-sky-500/30 px-2.5 py-1 text-sm font-black tracking-wider text-white">
                {g.id} 组
              </span>
              <span className="text-[10px] text-slate-500">预测排名 · 晋级概率</span>
            </div>

            <div className="space-y-1.5">
              {g.teams.map((gt, i) => {
                const t = TEAMS[gt.team];
                const s = rankStyle(i + 1, gt.team);
                return (
                  <div
                    key={gt.team}
                    className={`flex items-center gap-2.5 rounded-lg border-l-2 bg-white/[0.03] px-2.5 py-1.5 ${s.row}`}
                  >
                    <span className={`grid h-5 w-5 place-items-center rounded-md text-[11px] font-bold ${s.badge}`}>
                      {i + 1}
                    </span>
                    <span className="text-lg leading-none">{t.flag}</span>
                    <span className="text-sm text-slate-200">{t.name}</span>
                    <div className="ml-auto flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-400"
                          style={{ width: `${gt.qualProb}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-[11px] tabular-nums text-slate-400">
                        {gt.qualProb}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <details className="group mt-3">
              <summary className="cursor-pointer list-none text-[11px] text-slate-500 transition hover:text-slate-300">
                <span className="group-open:hidden">▸ 小组赛程(6 场,点击评分)</span>
                <span className="hidden group-open:inline">▾ 收起赛程</span>
              </summary>
              <div className="mt-2 space-y-1">
                {pairings(g.teams.map((t) => t.team)).map(([a, b]) => {
                  const key = `g-${g.id}-${a}-${b}`;
                  const r = ratings[key];
                  const ta = TEAMS[a];
                  const tb = TEAMS[b];
                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between rounded-lg bg-white/[0.03] px-2.5 py-1.5 text-xs"
                    >
                      <span className="text-slate-300">
                        {ta.flag} {ta.name} <span className="text-slate-600">vs</span> {tb.flag} {tb.name}
                      </span>
                      <button
                        onClick={() =>
                          onRate({
                            key,
                            title: `小组赛 ${g.id} 组`,
                            teams: `${ta.flag} ${ta.name} vs ${tb.flag} ${tb.name}`,
                          })
                        }
                        className={`rounded-md px-2 py-0.5 text-[10px] font-semibold transition ${
                          r
                            ? "bg-amber-400/15 text-amber-300 hover:bg-amber-400/25"
                            : "bg-white/5 text-slate-400 hover:bg-white/15 hover:text-white"
                        }`}
                      >
                        {r ? `★ ${overallScore(r).toFixed(1)}` : "评分"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}

function pairings(ids: string[]): [string, string][] {
  const out: [string, string][] = [];
  for (let i = 0; i < ids.length; i++)
    for (let j = i + 1; j < ids.length; j++) out.push([ids[i], ids[j]]);
  return out;
}
