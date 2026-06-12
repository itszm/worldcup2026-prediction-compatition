"use client";

import { useState } from "react";
import { Rating, overallScore } from "@/lib/ratings";

export type RatingTarget = {
  key: string;    // 存储键,如 "m89" / "g-A-MEX-RSA"
  title: string;  // 如 "1/8决赛 M89"
  teams: string;  // 如 "🇩🇪 德国 vs 🇫🇷 法国"
};

const DIMENSIONS = [
  { key: "excitement", label: "观赏性", icon: "⚽", weight: "40%", hint: "进球、机会、戏剧性" },
  { key: "intensity", label: "激烈程度", icon: "🔥", weight: "30%", hint: "对抗、节奏、悬念" },
  { key: "tactics", label: "技战术", icon: "🧠", weight: "30%", hint: "战术博弈、个人技术" },
] as const;

function scoreColor(v: number) {
  if (v >= 8.5) return "text-emerald-300";
  if (v >= 7) return "text-sky-300";
  if (v >= 5) return "text-amber-300";
  return "text-rose-300";
}

export default function RatingModal({
  target,
  existing,
  onSave,
  onDelete,
  onClose,
}: {
  target: RatingTarget;
  existing?: Rating;
  onSave: (key: string, rating: Rating) => void;
  onDelete: (key: string) => void;
  onClose: () => void;
}) {
  const [excitement, setExcitement] = useState(existing?.excitement ?? 7);
  const [intensity, setIntensity] = useState(existing?.intensity ?? 7);
  const [tactics, setTactics] = useState(existing?.tactics ?? 7);
  const [comment, setComment] = useState(existing?.comment ?? "");

  const draft: Rating = { excitement, intensity, tactics, comment, updatedAt: Date.now() };
  const overall = overallScore(draft);
  const values = { excitement, intensity, tactics };
  const setters = { excitement: setExcitement, intensity: setIntensity, tactics: setTactics };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/95 p-6 shadow-2xl shadow-emerald-500/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-1 text-xs text-slate-400">{target.title}</div>
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">{target.teams}</h3>
          <div className="text-right">
            <div className={`text-2xl font-black tabular-nums ${scoreColor(overall)}`}>{overall.toFixed(1)}</div>
            <div className="text-[10px] text-slate-500">综合评分</div>
          </div>
        </div>

        <div className="space-y-5">
          {DIMENSIONS.map((d) => (
            <div key={d.key}>
              <div className="mb-1.5 flex items-baseline justify-between">
                <span className="text-sm text-slate-200">
                  {d.icon} {d.label}
                  <span className="ml-2 text-[10px] text-slate-500">权重 {d.weight} · {d.hint}</span>
                </span>
                <span className={`text-sm font-bold tabular-nums ${scoreColor(values[d.key])}`}>
                  {values[d.key]}
                </span>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => setters[d.key](n)}
                    aria-label={`${d.label} ${n}分`}
                    className={`h-6 flex-1 rounded transition ${
                      n <= values[d.key]
                        ? "bg-gradient-to-t from-emerald-500 to-emerald-400 shadow-sm shadow-emerald-500/40"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="短评(可选):这场比赛让你印象最深的是……"
            rows={2}
            className="w-full resize-none rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-slate-200 placeholder:text-slate-500 focus:border-emerald-400/50 focus:outline-none"
          />
        </div>

        <div className="mt-5 flex gap-2">
          {existing && (
            <button
              onClick={() => {
                onDelete(target.key);
                onClose();
              }}
              className="rounded-xl border border-rose-400/30 px-4 py-2.5 text-sm text-rose-300 transition hover:bg-rose-500/10"
            >
              删除
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/5"
          >
            取消
          </button>
          <button
            onClick={() => {
              onSave(target.key, draft);
              onClose();
            }}
            className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            保存评分
          </button>
        </div>
      </div>
    </div>
  );
}
