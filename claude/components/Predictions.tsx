"use client";

import { CHAMP_ODDS, FINAL_FOUR, GOLDEN_BOOT, OTHERS_PROB, TEAMS } from "@/lib/data";

const FOUR_LABELS = ["冠军", "亚军", "季军", "殿军"];

export default function Predictions() {
  const max = CHAMP_ODDS[0].prob;
  return (
    <div className="space-y-6">
      {/* 预测决赛 */}
      <div className="overflow-hidden rounded-2xl border border-amber-400/25 bg-gradient-to-br from-amber-500/10 via-transparent to-emerald-500/10 p-6 text-center">
        <div className="text-[11px] uppercase tracking-[0.3em] text-amber-300/80">预测决赛 · 7月19日 · 纽约新泽西 MetLife 球场</div>
        <div className="mt-4 flex items-center justify-center gap-6 sm:gap-10">
          <div>
            <div className="text-5xl">{TEAMS.ESP.flag}</div>
            <div className="mt-1 font-bold text-white">西班牙</div>
            <div className="text-xs text-emerald-300">胜率 54%</div>
          </div>
          <div className="text-2xl font-black text-slate-500">VS</div>
          <div>
            <div className="text-5xl">{TEAMS.ARG.flag}</div>
            <div className="mt-1 font-bold text-white">阿根廷</div>
            <div className="text-xs text-slate-400">胜率 46%</div>
          </div>
        </div>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-sm">
          🏆 <span className="font-bold text-amber-200">预测冠军:西班牙</span>
          <span className="text-amber-300/70">— 控球体系成熟,黄金一代正值当打</span>
        </div>
      </div>

      {/* 预测四强 */}
      <div className="grid gap-3 sm:grid-cols-4">
        {FINAL_FOUR.map((id, i) => {
          const t = TEAMS[id];
          return (
            <div
              key={id}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center backdrop-blur"
            >
              <div className="text-[10px] uppercase tracking-widest text-slate-500">预测{FOUR_LABELS[i]}</div>
              <div className="mt-2 text-4xl">{t.flag}</div>
              <div className="mt-1 font-bold text-white">{t.name}</div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        {/* 夺冠概率 */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur lg:col-span-3">
          <h3 className="mb-4 font-bold text-white">夺冠概率分布</h3>
          <div className="space-y-2">
            {CHAMP_ODDS.map((c) => {
              const t = TEAMS[c.team];
              return (
                <div key={c.team} className="flex items-center gap-2 text-sm">
                  <span className="w-6 text-center text-base">{t.flag}</span>
                  <span className="w-20 truncate text-slate-300">{t.name}</span>
                  <div className="h-4 flex-1 overflow-hidden rounded-md bg-white/5">
                    <div
                      className="flex h-full items-center rounded-md bg-gradient-to-r from-emerald-500/80 to-sky-500/80 pl-2"
                      style={{ width: `${(c.prob / max) * 100}%` }}
                    />
                  </div>
                  <span className="w-12 text-right font-bold tabular-nums text-emerald-300">
                    {c.prob.toFixed(1)}%
                  </span>
                </div>
              );
            })}
            <div className="flex items-center gap-2 text-sm">
              <span className="w-6 text-center">⚽</span>
              <span className="w-20 text-slate-500">其他队伍</span>
              <div className="h-4 flex-1 overflow-hidden rounded-md bg-white/5">
                <div
                  className="h-full rounded-md bg-white/15"
                  style={{ width: `${(OTHERS_PROB / max) * 100}%` }}
                />
              </div>
              <span className="w-12 text-right tabular-nums text-slate-500">{OTHERS_PROB.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 lg:col-span-2">
          {/* 金靴 */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
            <h3 className="mb-3 font-bold text-white">👟 金靴候选</h3>
            <div className="space-y-2">
              {GOLDEN_BOOT.map((p, i) => (
                <div key={p.name} className="flex items-center gap-2 text-sm">
                  <span className="w-4 text-[11px] tabular-nums text-slate-500">{i + 1}</span>
                  <span>{TEAMS[p.team].flag}</span>
                  <span className="text-slate-200">{p.name}</span>
                  <span className="ml-auto font-bold tabular-nums text-sky-300">{p.prob}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* 方法说明 */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-xs leading-relaxed text-slate-400 backdrop-blur">
            <h3 className="mb-2 text-sm font-bold text-white">预测方法</h3>
            概率为主观综合估计,参考:FIFA 排名与 Elo 积分、近两年大赛与预选赛战绩、阵容深度与核心球员状态、
            主办国主场优势(墨西哥/美国上调)、以及抽签签位与淘汰赛路径难度。
            淘汰赛每场给出晋级概率(含加时与点球),对阵图按各场概率较高一方逐轮推演生成。
            仅供娱乐,足球是圆的。⚽
          </div>
        </div>
      </div>
    </div>
  );
}
