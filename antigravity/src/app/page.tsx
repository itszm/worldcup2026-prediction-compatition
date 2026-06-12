'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Trophy, Calendar, Users, Star } from 'lucide-react';
import { teams, Match, generateGroupMatches } from '../data/worldCupData';

export default function Home() {
  const [hotMatches, setHotMatches] = useState<Match[]>([]);
  const [totalRatings, setTotalRatings] = useState(0);

  // Get top 10 championship contenders
  const contenders = [...teams]
    .sort((a, b) => b.winningProb - a.winningProb)
    .slice(0, 10);

  useEffect(() => {
    // Generate matches and filter 4 exciting matches
    const allMatches = generateGroupMatches();
    const selectedHotMatches = allMatches.filter(m => 
      (m.homeTeam?.id === 'fra' && m.awayTeam?.id === 'nor') || // France vs Norway
      (m.homeTeam?.id === 'arg' && m.awayTeam?.id === 'col') || // Argentina vs Colombia
      (m.homeTeam?.id === 'bra' && m.awayTeam?.id === 'mar') || // Brazil vs Morocco
      (m.homeTeam?.id === 'esp' && m.awayTeam?.id === 'uru')    // Spain vs Uruguay
    );
    setHotMatches(selectedHotMatches.slice(0, 4));

    // Get count of ratings from localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('wc2026_ratings');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setTotalRatings(Object.keys(parsed).length);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {/* Hero Header */}
      <section className="hero-section glass-card" style={{ padding: '48px', overflow: 'hidden' }}>
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={12} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            AI Prediction & Ratings Hub
          </div>
          <h1 className="hero-title" style={{ fontSize: '3rem', fontWeight: 900 }}>
            FIFA 2026 <br />
            <span style={{ background: 'linear-gradient(to right, var(--color-neon-cyan), var(--color-neon-green))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              世界杯对阵与评分中心
            </span>
          </h1>
          <p className="hero-description" style={{ marginTop: '16px' }}>
            欢迎来到 2026 美加墨世界杯预测中心。虽然比赛硝烟将起，我们为您提供最专业的 AI 胜率盘口评估，支持您深度打分每场比赛，并支持自主点击模拟淘汰赛走向，推演您的冠军归属！
          </p>
          <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
            <Link href="/bracket" className="btn-primary">
              开始淘汰赛预测
            </Link>
            <Link href="/matches" className="btn-small" style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 24px' }}>
              查看赛程打分
            </Link>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '24px', padding: '30px', border: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ background: 'rgba(255, 183, 0, 0.1)', padding: '20px', borderRadius: '50%', marginBottom: '16px' }}>
            <Trophy size={48} style={{ color: 'var(--color-gold)', filter: 'drop-shadow(0 0 10px rgba(255, 183, 0, 0.3))' }} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>AI 夺冠最大热门</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 900, margin: '10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🇦🇷</span>
            <span>阿根廷</span>
          </div>
          <p style={{ color: 'var(--color-neon-cyan)', fontWeight: 700, fontSize: '1.1rem' }}>
            15.0% 夺冠概率
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center', marginTop: '12px', maxWidth: '200px' }}>
            梅西领衔的卫冕冠军在 FIFA 积分及近期赛事中依然保持最高胜率模型。
          </p>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px' }}>
          <div style={{ background: 'rgba(0, 229, 255, 0.1)', padding: '12px', borderRadius: '12px', color: 'var(--color-neon-cyan)' }}>
            <Users size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>48 支</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>参赛球队 (历史首次)</div>
          </div>
        </div>
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px' }}>
          <div style={{ background: 'rgba(0, 255, 136, 0.1)', padding: '12px', borderRadius: '12px', color: 'var(--color-neon-green)' }}>
            <Calendar size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>104 场</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>总比赛场次</div>
          </div>
        </div>
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px' }}>
          <div style={{ background: 'rgba(255, 42, 95, 0.1)', padding: '12px', borderRadius: '12px', color: 'var(--color-neon-pink)' }}>
            <Trophy size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>12 个</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>小组 (每组4队)</div>
          </div>
        </div>
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px' }}>
          <div style={{ background: 'rgba(255, 183, 0, 0.1)', padding: '12px', borderRadius: '12px', color: 'var(--color-gold)' }}>
            <Star size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{totalRatings} 场</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>您已评分的比赛</div>
          </div>
        </div>
      </section>

      {/* Prediction & Contenders Grid */}
      <section className="prediction-overview-grid">
        {/* Contenders Probabilities */}
        <div className="glass-card">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={20} style={{ color: 'var(--color-neon-cyan)' }} />
            AI 夺冠概率排行榜 (Top 10)
          </h2>
          <div className="chart-container">
            {contenders.map((team, idx) => (
              <div key={team.id} className="chart-row">
                <span className="chart-team-name">
                  <span style={{ marginRight: '6px' }}>{idx + 1}.</span>
                  <span style={{ marginRight: '6px' }}>{team.flag}</span>
                  {team.name}
                </span>
                <span className="chart-value">{team.winningProb}%</span>
                <div className="chart-bar-outer">
                  <div 
                    className="chart-bar-inner" 
                    style={{ width: `${(team.winningProb / 15) * 100}%` }} // Relative to Max 15% (Argentina)
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Hot Matchups */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={20} style={{ color: 'var(--color-neon-green)' }} />
            精选小组焦点对决 (AI 胜率)
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
            {hotMatches.map((match) => (
              <div 
                key={match.id} 
                style={{ 
                  padding: '16px', 
                  borderRadius: '12px', 
                  background: 'rgba(255, 255, 255, 0.02)', 
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                {/* Teams */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span>{match.homeTeam?.flag} {match.homeTeam?.name}</span>
                    <span style={{ color: 'var(--text-muted)' }}>vs</span>
                    <span>{match.awayTeam?.flag} {match.awayTeam?.name}</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Group {match.group}
                  </span>
                </div>
                {/* Predictions bar */}
                <div>
                  <div className="match-prediction-bar" style={{ height: '4px', marginBottom: '6px' }}>
                    <div className="pred-home" style={{ width: `${match.prediction.homeWin}%` }} />
                    <div className="pred-draw" style={{ width: `${match.prediction.draw}%` }} />
                    <div className="pred-away" style={{ width: `${match.prediction.awayWin}%` }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700 }}>
                    <span style={{ color: 'var(--color-neon-cyan)' }}>{match.homeTeam?.name} {match.prediction.homeWin}%</span>
                    <span style={{ color: 'var(--text-muted)' }}>平局 {match.prediction.draw}%</span>
                    <span style={{ color: 'var(--color-neon-pink)' }}>{match.awayTeam?.name} {match.prediction.awayWin}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link 
            href="/matches" 
            className="btn-small" 
            style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}
          >
            浏览完整 72 场小组赛程
          </Link>
        </div>
      </section>
    </div>
  );
}
