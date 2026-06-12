'use client';

import React from 'react';
import { Trophy, ArrowRight, Sparkles } from 'lucide-react';
import { Team, calculateMatchPredictions } from '../data/worldCupData';

// Types for bracket state
export interface KnockoutMatchState {
  id: string;
  stage: string;
  homeTeam: Team | null;
  awayTeam: Team | null;
  winner: Team | null;
  homeScore?: number;
  awayScore?: number;
}

interface BracketVisualizerProps {
  bracket: Record<string, KnockoutMatchState>;
  onSelectWinner: (matchId: string, winner: Team) => void;
  onReset: () => void;
  onAutoSimulate: () => void;
}

export default function BracketVisualizer({ bracket, onSelectWinner, onReset, onAutoSimulate }: BracketVisualizerProps) {
  // Helper to calculate knockout win probability (no draws)
  const getKnockoutOdds = (home: Team | null, away: Team | null) => {
    if (!home || !away) return null;
    const pred = calculateMatchPredictions(home, away);
    // Distribute draw probability between home and away wins
    const total = pred.homeWin + pred.awayWin;
    const homePercent = Math.round((pred.homeWin / total) * 100);
    const awayPercent = 100 - homePercent;
    return { homePercent, awayPercent };
  };

  const renderMatchNode = (matchId: string) => {
    const match = bracket[matchId];
    if (!match) return null;

    const odds = getKnockoutOdds(match.homeTeam, match.awayTeam);
    const isCompleted = !!match.winner;

    return (
      <div key={match.id} className="bracket-match-node">
        <div className="bracket-node-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{match.id}</span>
          {odds && !isCompleted && (
            <span style={{ color: 'var(--color-neon-cyan)', fontWeight: 'bold' }}>
              AI: {odds.homePercent}% vs {odds.awayPercent}%
            </span>
          )}
        </div>

        {/* Home Team Slot */}
        <div
          className={`bracket-team-slot ${
            match.winner?.id === match.homeTeam?.id && match.homeTeam ? 'winner' : ''
          } ${match.winner && match.winner.id !== match.homeTeam?.id ? 'loser' : ''}`}
          onClick={() => match.homeTeam && match.awayTeam && onSelectWinner(match.id, match.homeTeam)}
          style={{ cursor: match.homeTeam && match.awayTeam ? 'pointer' : 'default' }}
        >
          <div className="bracket-team-info">
            <span>{match.homeTeam?.flag || '🏳️'}</span>
            <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '120px' }}>
              {match.homeTeam?.name || '待定'}
            </span>
            {match.homeTeam && (
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                #{match.homeTeam.rank}
              </span>
            )}
          </div>
          {match.winner && match.homeTeam && (
            <span className="bracket-team-score">{match.homeScore ?? (match.winner.id === match.homeTeam.id ? 2 : 1)}</span>
          )}
        </div>

        {/* Away Team Slot */}
        <div
          className={`bracket-team-slot ${
            match.winner?.id === match.awayTeam?.id && match.awayTeam ? 'winner' : ''
          } ${match.winner && match.winner.id !== match.awayTeam?.id ? 'loser' : ''}`}
          onClick={() => match.homeTeam && match.awayTeam && onSelectWinner(match.id, match.awayTeam)}
          style={{ cursor: match.homeTeam && match.awayTeam ? 'pointer' : 'default' }}
        >
          <div className="bracket-team-info">
            <span>{match.awayTeam?.flag || '🏳️'}</span>
            <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '120px' }}>
              {match.awayTeam?.name || '待定'}
            </span>
            {match.awayTeam && (
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                #{match.awayTeam.rank}
              </span>
            )}
          </div>
          {match.winner && match.awayTeam && (
            <span className="bracket-team-score">{match.awayScore ?? (match.winner.id === match.awayTeam.id ? 2 : 1)}</span>
          )}
        </div>
      </div>
    );
  };

  const champion = bracket['F-1']?.winner;

  // Render rounds
  const round32Ids = Array.from({ length: 16 }, (_, i) => `R32-${i + 1}`);
  const round16Ids = Array.from({ length: 8 }, (_, i) => `R16-${i + 1}`);
  const qfIds = Array.from({ length: 4 }, (_, i) => `QF-${i + 1}`);
  const sfIds = Array.from({ length: 2 }, (_, i) => `SF-${i + 1}`);

  return (
    <div className="glass-card" style={{ padding: '30px', overflowX: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>世界杯淘汰赛模拟器</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            点击对阵中的球队可选择胜者晋级下一轮，观察谁将最终夺冠！
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-small" onClick={onReset}>重置预测</button>
          <button className="btn-primary" onClick={onAutoSimulate}>AI 自动模拟</button>
        </div>
      </div>

      <div className="bracket-wrapper">
        <div className="bracket-container">
          {/* Round of 32 */}
          <div className="bracket-round" style={{ height: '800px', justifyContent: 'space-between' }}>
            <h4 style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 'bold' }}>1/16 决赛 (R32)</h4>
            {round32Ids.map((id) => renderMatchNode(id))}
          </div>

          {/* Round of 16 */}
          <div className="bracket-round" style={{ height: '800px', justifyContent: 'space-around' }}>
            <h4 style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 'bold' }}>1/8 决赛 (R16)</h4>
            {round16Ids.map((id) => renderMatchNode(id))}
          </div>

          {/* Quarterfinals */}
          <div className="bracket-round" style={{ height: '800px', justifyContent: 'space-around' }}>
            <h4 style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 'bold' }}>1/4 决赛 (QF)</h4>
            {qfIds.map((id) => renderMatchNode(id))}
          </div>

          {/* Semifinals */}
          <div className="bracket-round" style={{ height: '800px', justifyContent: 'space-around' }}>
            <h4 style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 'bold' }}>半决赛 (SF)</h4>
            {sfIds.map((id) => renderMatchNode(id))}
          </div>

          {/* Finals */}
          <div className="bracket-round" style={{ height: '800px', justifyContent: 'center', gap: '40px' }}>
            <h4 style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 'bold' }}>决赛 (Final)</h4>
            {renderMatchNode('F-1')}
          </div>

          {/* Champion Box */}
          <div className="bracket-round" style={{ height: '800px', justifyContent: 'center', alignItems: 'center', minWidth: '220px' }}>
            <h4 style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '16px' }}>冠军得主</h4>
            {champion ? (
              <div 
                className="glass-card" 
                style={{ 
                  textAlign: 'center', 
                  border: '2px solid var(--color-gold)', 
                  boxShadow: '0 0 25px rgba(255,183,0,0.25)', 
                  background: 'linear-gradient(135deg, rgba(25, 20, 10, 0.9), rgba(13, 15, 38, 0.95))',
                  padding: '30px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  animation: 'modal-enter 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
              >
                <div style={{ background: 'rgba(255, 183, 0, 0.1)', padding: '12px', borderRadius: '50%' }}>
                  <Trophy size={40} style={{ color: 'var(--color-gold)' }} />
                </div>
                <div style={{ fontSize: '3rem' }}>{champion.flag}</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-primary)' }}>{champion.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>FIFA Rank: #{champion.rank}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(0, 229, 255, 0.1)', padding: '4px 10px', borderRadius: '12px', border: '1px solid rgba(0, 229, 255, 0.2)', marginTop: '8px' }}>
                  <Sparkles size={12} style={{ color: 'var(--color-neon-cyan)' }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-neon-cyan)', fontWeight: 'bold' }}>AI 预估夺冠概率: {champion.winningProb}%</span>
                </div>
              </div>
            ) : (
              <div 
                className="glass-card" 
                style={{ 
                  textAlign: 'center', 
                  color: 'var(--text-muted)', 
                  borderStyle: 'dashed', 
                  padding: '40px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  width: '200px'
                }}
              >
                <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '12px', borderRadius: '50%', color: 'var(--text-muted)' }}>
                  <Trophy size={32} />
                </div>
                <span style={{ fontSize: '0.85rem' }}>点击左侧对阵<br/>预测冠军</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
