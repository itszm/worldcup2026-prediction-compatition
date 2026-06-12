"use client";

import { useMemo, useState } from "react";
import { Activity, ArrowRight, BarChart3, Brackets, ChevronRight, CircleDot, Gauge, Globe2, Info, Menu, Radar, ShieldCheck, Sparkles, Target, Trophy, X } from "lucide-react";
import { bracket, groups, matchLabs } from "./data";

type View = "overview" | "groups" | "bracket" | "method";
const nav: { id: View; label: string }[] = [
  { id: "overview", label: "预测中心" }, { id: "groups", label: "小组全景" },
  { id: "bracket", label: "淘汰赛树" }, { id: "method", label: "评分模型" },
];
const factors = ["近期状态", "进攻上限", "防守稳定", "中场控制", "赛事情境"];
const weights = [25, 25, 20, 15, 15];

function probability(home: number[], away: number[]) {
  const score = (v: number[]) => v.reduce((sum, n, i) => sum + n * weights[i], 0) / 100;
  const hs = score(home); const as = score(away); const delta = hs - as;
  const draw = Math.max(15, 25 - Math.abs(delta) * 0.65);
  const remaining = 100 - draw;
  const h = remaining / (1 + Math.exp(-delta / 7));
  return { hs, as, home: Math.round(h), draw: Math.round(draw), away: 100 - Math.round(h) - Math.round(draw) };
}

export default function Home() {
  const [view, setView] = useState<View>("overview");
  const [menu, setMenu] = useState(false);
  const [lab, setLab] = useState(matchLabs[0]);
  const [homeFactors, setHomeFactors] = useState(lab.h);
  const [awayFactors, setAwayFactors] = useState(lab.a);
  const prediction = useMemo(() => probability(homeFactors, awayFactors), [homeFactors, awayFactors]);

  const selectLab = (id: string) => {
    const next = matchLabs.find((m) => m.id === id)!;
    setLab(next); setHomeFactors(next.h); setAwayFactors(next.a);
  };

  return (
    <main>
      <header className="topbar">
        <button className="brand" onClick={() => setView("overview")}><span className="brand-mark"><CircleDot size={20}/></span><span>NORTHSTAR <b>26</b></span></button>
        <nav className="desktop-nav">{nav.map((n) => <button className={view === n.id ? "active" : ""} key={n.id} onClick={() => setView(n.id)}>{n.label}</button>)}</nav>
        <div className="header-meta"><span className="live-dot"/> PRE-MATCH MODEL <b>v4.8</b></div>
        <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="打开菜单">{menu ? <X/> : <Menu/>}</button>
        {menu && <div className="mobile-nav">{nav.map((n) => <button key={n.id} onClick={() => { setView(n.id); setMenu(false); }}>{n.label}<ChevronRight size={16}/></button>)}</div>}
      </header>

      {view === "overview" && <>
        <section className="hero">
          <div className="hero-image"/>
          <div className="hero-grid"/>
          <div className="hero-content">
            <div className="eyebrow"><Sparkles size={14}/> 2026 · CANADA / MEXICO / USA</div>
            <h1>把不确定性<br/>变成一张<span>路线图</span></h1>
            <p>忽略已经发生的一切。基于赛前实力、阵容结构与赛事情境，重新模拟 104 场比赛的另一种未来。</p>
            <div className="hero-actions">
              <button className="primary" onClick={() => setView("bracket")}>查看完整预测 <ArrowRight size={17}/></button>
              <button className="ghost" onClick={() => setView("method")}><Radar size={17}/> 打开评分实验室</button>
            </div>
          </div>
          <div className="champion-card">
            <div className="champion-orbit"><span>🇪🇸</span></div>
            <div><small>模型首选冠军</small><h2>西班牙</h2><p>控球结构完整，年龄曲线最优</p></div>
            <strong>19<sup>%</sup></strong>
          </div>
          <div className="model-stamp">模型时间锚点 <b>2026.06.10</b> · 不含正赛赛果</div>
        </section>

        <section className="dashboard section-pad">
          <div className="section-head"><div><div className="kicker">THE CONTENDERS</div><h2>冠军概率，不只是一张榜单</h2></div><button onClick={() => setView("groups")}>全部 48 队 <ArrowRight size={16}/></button></div>
          <div className="contender-grid">
            {[
              ["01", "🇪🇸", "西班牙", 19, "+2.4", "最平衡"], ["02", "🇫🇷", "法国", 17, "+1.8", "阵容最深"],
              ["03", "🇦🇷", "阿根廷", 14, "−0.6", "卫冕经验"], ["04", "🏴", "英格兰", 13, "+1.1", "中场峰值"],
              ["05", "🇧🇷", "巴西", 12, "+0.4", "进攻天赋"], ["06", "🇵🇹", "葡萄牙", 10, "+1.5", "边路爆点"],
            ].map(([rank, flag, name, pct, move, tag], i) => <div className={`contender ${i === 0 ? "top" : ""}`} key={String(name)}>
              <span className="rank">{rank}</span><span className="flag">{flag}</span><div className="team-name"><b>{name}</b><small>{tag}</small></div>
              <div className="prob"><b>{pct}%</b><span className={String(move).startsWith("+") ? "up" : "down"}>{move}</span></div>
              <div className="prob-bar"><i style={{ width: `${Number(pct) * 4.2}%` }}/></div>
            </div>)}
          </div>
        </section>

        <section className="lab-preview section-pad">
          <div className="section-head light"><div><div className="kicker">MATCH LAB</div><h2>每场比赛，都有自己的指纹</h2></div><span className="formula-chip"><Activity size={14}/> 5 因子加权模型</span></div>
          <MatchLab lab={lab} home={homeFactors} away={awayFactors} setHome={setHomeFactors} setAway={setAwayFactors} prediction={prediction} selectLab={selectLab}/>
        </section>
      </>}

      {view === "groups" && <section className="page-view section-pad groups-page">
        <PageTitle eyebrow="12 GROUPS · 48 TEAMS" title="小组全景" desc="晋级概率为模型对小组赛 20,000 次蒙特卡洛模拟的结果；前两名直接晋级，另取 8 个成绩最好的第三名。" icon={<Globe2/>}/>
        <div className="group-grid">{groups.map((group) => <article className="group-card" key={group.id}>
          <div className="group-head"><div><span>GROUP</span><b>{group.id}</b></div><small>{group.heat}</small></div>
          <div className="group-labels"><span>球队</span><span>评分</span><span>晋级</span></div>
          {group.teams.map((team, i) => <div className="group-team" key={team.code}>
            <span className="position">{i + 1}</span><span className="flag">{team.flag}</span><div className="team-name"><b>{team.name}</b><small>{team.code}</small></div>
            <span className="rating">{team.rating}</span><div className="advance"><b>{team.advance}%</b><i><em style={{width: `${team.advance}%`}}/></i></div>
          </div>)}
        </article>)}</div>
      </section>}

      {view === "bracket" && <section className="page-view bracket-page">
        <div className="section-pad bracket-title"><PageTitle eyebrow="PROJECTED KNOCKOUT PATH" title="通往纽约的 31 场棋局" desc="这是模型根据预测小组名次生成的一条完整淘汰赛路径。比分代表最可能比分，不等于精确比分概率。" icon={<Brackets/>}/></div>
        <div className="bracket-scroll"><div className="bracket-board">
          {bracket.map((round, ri) => <div className={`round round-${ri}`} key={round.label}>
            <div className="round-title"><span>0{ri + 1}</span>{round.label}</div>
            <div className="round-matches">{round.matches.map((m, mi) => <article className={`match-card ${ri === 4 ? "final-card" : ""}`} key={`${m[0]}-${m[1]}`}>
              <small>M{String(mi + 1).padStart(2,"0")} · AI PICK</small>
              <div className={m[0].includes(m[2]) ? "winner" : ""}><span>{m[0]}</span><b>{m[3].split("–")[0]}</b></div>
              <div className={m[1].includes(m[2]) ? "winner" : ""}><span>{m[1]}</span><b>{m[3].split("–")[1]}</b></div>
              {ri === 4 && <div className="trophy-line"><Trophy size={16}/> 西班牙 · 模型冠军</div>}
            </article>)}</div>
          </div>)}
        </div></div>
        <div className="bracket-note section-pad"><Info size={16}/> 32 强席位会随“成绩最好的第三名”组合变化，因此这里展示的是模拟中出现频率最高的路径，不是官方锁定对阵。</div>
      </section>}

      {view === "method" && <section className="page-view method-page section-pad">
        <PageTitle eyebrow="TRANSPARENT BY DESIGN" title="预测不是黑箱" desc="我们的目标不是假装知道未来，而是把判断拆成可以讨论、可以修改、也可以质疑的变量。" icon={<Gauge/>}/>
        <div className="method-layout">
          <div className="method-copy">
            <div className="method-number">01</div><h3>单场 100 分评分卡</h3><p>五项指标先被标准化到 0–100，再按权重得到比赛强度分。权重会在淘汰赛阶段轻微调整，放大阵容深度和点球能力。</p>
            <div className="weight-list">{factors.map((f, i) => <div key={f}><span>{f}</span><i><em style={{width: `${weights[i] * 3.2}%`}}/></i><b>{weights[i]}%</b></div>)}</div>
            <div className="formula"><span>SCORE</span> = 状态 × .25 + 进攻 × .25 + 防守 × .20 + 控制 × .15 + 情境 × .15</div>
            <div className="method-number second">02</div><h3>从分差到胜平负</h3><p>评分差通过 Logistic 曲线转为基础胜率，再依据双方防守强度、比赛阶段和预期节奏分配平局概率。</p>
            <div className="principles"><div><ShieldCheck/><b>不使用正赛赛果</b><span>时间锚点之后的数据全部隔离</span></div><div><BarChart3/><b>20,000 次模拟</b><span>覆盖分组、第三名组合与淘汰赛</span></div><div><Target/><b>可解释输出</b><span>每个百分比都能回到五项因子</span></div></div>
          </div>
          <div className="method-lab"><MatchLab lab={lab} home={homeFactors} away={awayFactors} setHome={setHomeFactors} setAway={setAwayFactors} prediction={prediction} selectLab={selectLab} compact/></div>
        </div>
      </section>}

      <footer><div className="brand"><span className="brand-mark"><CircleDot size={18}/></span>NORTHSTAR <b>26</b></div><p>独立预测概念作品 · 分组与赛制信息参考 FIFA · 非官方产品</p><span>NO RESULTS. JUST POSSIBILITIES.</span></footer>
    </main>
  );
}

function PageTitle({eyebrow, title, desc, icon}: {eyebrow: string; title: string; desc: string; icon: React.ReactNode}) {
  return <div className="page-title"><div className="title-icon">{icon}</div><div><div className="kicker">{eyebrow}</div><h1>{title}</h1><p>{desc}</p></div></div>;
}

function MatchLab({ lab, home, away, setHome, setAway, prediction, selectLab, compact = false }: {
  lab: typeof matchLabs[number]; home: number[]; away: number[]; setHome: (v: number[]) => void; setAway: (v: number[]) => void;
  prediction: ReturnType<typeof probability>; selectLab: (id: string) => void; compact?: boolean;
}) {
  return <div className={`match-lab ${compact ? "compact" : ""}`}>
    <div className="lab-tabs">{matchLabs.map((m) => <button key={m.id} className={m.id === lab.id ? "active" : ""} onClick={() => selectLab(m.id)}>{m.home} × {m.away}</button>)}</div>
    <div className="lab-body">
      <div className="lab-team home"><span className="big-flag">{lab.hf}</span><small>{lab.stage}</small><h3>{lab.home}</h3><strong>{prediction.hs.toFixed(1)}</strong></div>
      <div className="factor-stack">{factors.map((factor, i) => <div className="factor-row" key={factor}>
        <input aria-label={`${lab.home}${factor}`} type="range" min="55" max="99" value={home[i]} onChange={(e) => {const v=[...home];v[i]=Number(e.target.value);setHome(v)}}/>
        <div><span>{home[i]}</span><b>{factor}</b><span>{away[i]}</span></div>
        <input aria-label={`${lab.away}${factor}`} className="reverse" type="range" min="55" max="99" value={away[i]} onChange={(e) => {const v=[...away];v[i]=Number(e.target.value);setAway(v)}}/>
      </div>)}</div>
      <div className="lab-team away"><span className="big-flag">{lab.af}</span><small>MODEL RATING</small><h3>{lab.away}</h3><strong>{prediction.as.toFixed(1)}</strong></div>
    </div>
    <div className="outcome"><div><span>{lab.home}胜</span><b>{prediction.home}%</b><i><em style={{width:`${prediction.home}%`}}/></i></div><div className="draw"><span>平局</span><b>{prediction.draw}%</b><i><em style={{width:`${prediction.draw}%`}}/></i></div><div><span>{lab.away}胜</span><b>{prediction.away}%</b><i><em style={{width:`${prediction.away}%`}}/></i></div></div>
  </div>;
}
