'use client';

import React, { useState, useEffect } from 'react';
import BracketVisualizer, { KnockoutMatchState } from '@/components/BracketVisualizer';
import { Team, teams, calculateMatchPredictions } from '@/data/worldCupData';
import { initialKnockoutMatches } from '@/data/standings';

export default function BracketPage() {
  const [bracket, setBracket] = useState<Record<string, KnockoutMatchState>>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('wc2026_knockout_bracket');
      if (stored) {
        try {
          setBracket(JSON.parse(stored));
        } catch (e) {
          console.error(e);
          initializeDefaultBracket();
        }
      } else {
        initializeDefaultBracket();
      }
    }
  }, []);

  const initializeDefaultBracket = () => {
    const defaultBracket: Record<string, KnockoutMatchState> = {};
    
    // Initialize Round of 32
    initialKnockoutMatches.forEach((m) => {
      const home = teams.find(t => t.id === m.homeTeamId) || null;
      const away = teams.find(t => t.id === m.awayTeamId) || null;
      defaultBracket[m.id] = {
        id: m.id,
        stage: 'Round of 32',
        homeTeam: home,
        awayTeam: away,
        winner: null
      };
    });

    // Initialize Round of 16 (8 matches)
    for (let i = 1; i <= 8; i++) {
      defaultBracket[`R16-${i}`] = { id: `R16-${i}`, stage: 'Round of 16', homeTeam: null, awayTeam: null, winner: null };
    }

    // Initialize Quarterfinals (4 matches)
    for (let i = 1; i <= 4; i++) {
      defaultBracket[`QF-${i}`] = { id: `QF-${i}`, stage: 'Quarterfinal', homeTeam: null, awayTeam: null, winner: null };
    }

    // Initialize Semifinals (2 matches)
    for (let i = 1; i <= 2; i++) {
      defaultBracket[`SF-${i}`] = { id: `SF-${i}`, stage: 'Semifinal', homeTeam: null, awayTeam: null, winner: null };
    }

    // Initialize Final (1 match)
    defaultBracket[`F-1`] = { id: `F-1`, stage: 'Final', homeTeam: null, awayTeam: null, winner: null };

    setBracket(defaultBracket);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wc2026_knockout_bracket', JSON.stringify(defaultBracket));
    }
  };

  // Helper to clear team from downstream matches if a prediction changes
  const clearTeamFromDownstream = (
    state: Record<string, KnockoutMatchState>,
    currentMatchId: string,
    teamIdToClear: string
  ) => {
    let nextMatchId = '';
    let slot: 'homeTeam' | 'awayTeam' = 'homeTeam';

    const parts = currentMatchId.split('-');
    const round = parts[0];
    const num = parseInt(parts[1], 10);

    if (round === 'R32') {
      nextMatchId = `R16-${Math.floor((num - 1) / 2) + 1}`;
      slot = num % 2 !== 0 ? 'homeTeam' : 'awayTeam';
    } else if (round === 'R16') {
      nextMatchId = `QF-${Math.floor((num - 1) / 2) + 1}`;
      slot = num % 2 !== 0 ? 'homeTeam' : 'awayTeam';
    } else if (round === 'QF') {
      nextMatchId = `SF-${Math.floor((num - 1) / 2) + 1}`;
      slot = num % 2 !== 0 ? 'homeTeam' : 'awayTeam';
    } else if (round === 'SF') {
      nextMatchId = 'F-1';
      slot = num === 1 ? 'homeTeam' : 'awayTeam';
    } else {
      return;
    }

    const nextMatch = state[nextMatchId];
    if (!nextMatch) return;

    if (nextMatch[slot]?.id === teamIdToClear) {
      nextMatch[slot] = null;
      if (nextMatch.winner?.id === teamIdToClear) {
        nextMatch.winner = null;
        clearTeamFromDownstream(state, nextMatchId, teamIdToClear);
      }
    }
  };

  // Handle selecting a winner of a match
  const handleSelectWinner = (matchId: string, winner: Team) => {
    const updated = { ...bracket };
    const match = updated[matchId];
    if (!match) return;

    const oldWinner = match.winner;
    match.winner = winner;

    // Determine the score (just a dummy realistic score based on who won)
    if (winner.id === match.homeTeam?.id) {
      match.homeScore = Math.floor(Math.random() * 2) + 2; // 2-3 goals
      match.awayScore = Math.floor(Math.random() * match.homeScore);
    } else {
      match.awayScore = Math.floor(Math.random() * 2) + 2;
      match.homeScore = Math.floor(Math.random() * match.awayScore);
    }

    // Clear old winner downstream if they were different
    if (oldWinner && oldWinner.id !== winner.id) {
      clearTeamFromDownstream(updated, matchId, oldWinner.id);
    }

    // Propagate to next round
    let nextMatchId = '';
    let slot: 'homeTeam' | 'awayTeam' = 'homeTeam';

    const parts = matchId.split('-');
    const round = parts[0];
    const num = parseInt(parts[1], 10);

    if (round === 'R32') {
      nextMatchId = `R16-${Math.floor((num - 1) / 2) + 1}`;
      slot = num % 2 !== 0 ? 'homeTeam' : 'awayTeam';
    } else if (round === 'R16') {
      nextMatchId = `QF-${Math.floor((num - 1) / 2) + 1}`;
      slot = num % 2 !== 0 ? 'homeTeam' : 'awayTeam';
    } else if (round === 'QF') {
      nextMatchId = `SF-${Math.floor((num - 1) / 2) + 1}`;
      slot = num % 2 !== 0 ? 'homeTeam' : 'awayTeam';
    } else if (round === 'SF') {
      nextMatchId = 'F-1';
      slot = num === 1 ? 'homeTeam' : 'awayTeam';
    }

    if (nextMatchId && updated[nextMatchId]) {
      updated[nextMatchId][slot] = winner;
    }

    setBracket(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wc2026_knockout_bracket', JSON.stringify(updated));
    }
  };

  // Reset predictions
  const handleReset = () => {
    initializeDefaultBracket();
  };

  // Elo-based simulation for a matchup (no draws, returns winner)
  const simulateKnockoutWinner = (home: Team, away: Team): Team => {
    const pred = calculateMatchPredictions(home, away);
    const total = pred.homeWin + pred.awayWin;
    const homePercent = (pred.homeWin / total) * 100;
    const rand = Math.random() * 100;
    return rand < homePercent ? home : away;
  };

  // Auto-simulate entire bracket stage-by-stage
  const handleAutoSimulate = () => {
    const updated = { ...bracket };

    // Stage 1: Round of 32
    for (let i = 1; i <= 16; i++) {
      const match = updated[`R32-${i}`];
      if (match && match.homeTeam && match.awayTeam) {
        const winner = simulateKnockoutWinner(match.homeTeam, match.awayTeam);
        match.winner = winner;
        if (winner.id === match.homeTeam.id) {
          match.homeScore = Math.floor(Math.random() * 2) + 2;
          match.awayScore = Math.floor(Math.random() * match.homeScore);
        } else {
          match.awayScore = Math.floor(Math.random() * 2) + 2;
          match.homeScore = Math.floor(Math.random() * match.awayScore);
        }
        
        // Propagate to R16
        const nextId = `R16-${Math.floor((i - 1) / 2) + 1}`;
        const slot = i % 2 !== 0 ? 'homeTeam' as const : 'awayTeam' as const;
        updated[nextId][slot] = winner;
      }
    }

    // Stage 2: Round of 16
    for (let i = 1; i <= 8; i++) {
      const match = updated[`R16-${i}`];
      if (match && match.homeTeam && match.awayTeam) {
        const winner = simulateKnockoutWinner(match.homeTeam, match.awayTeam);
        match.winner = winner;
        if (winner.id === match.homeTeam.id) {
          match.homeScore = Math.floor(Math.random() * 2) + 2;
          match.awayScore = Math.floor(Math.random() * match.homeScore);
        } else {
          match.awayScore = Math.floor(Math.random() * 2) + 2;
          match.homeScore = Math.floor(Math.random() * match.awayScore);
        }
        
        // Propagate to QF
        const nextId = `QF-${Math.floor((i - 1) / 2) + 1}`;
        const slot = i % 2 !== 0 ? 'homeTeam' as const : 'awayTeam' as const;
        updated[nextId][slot] = winner;
      }
    }

    // Stage 3: Quarterfinals
    for (let i = 1; i <= 4; i++) {
      const match = updated[`QF-${i}`];
      if (match && match.homeTeam && match.awayTeam) {
        const winner = simulateKnockoutWinner(match.homeTeam, match.awayTeam);
        match.winner = winner;
        if (winner.id === match.homeTeam.id) {
          match.homeScore = Math.floor(Math.random() * 2) + 2;
          match.awayScore = Math.floor(Math.random() * match.homeScore);
        } else {
          match.awayScore = Math.floor(Math.random() * 2) + 2;
          match.homeScore = Math.floor(Math.random() * match.awayScore);
        }
        
        // Propagate to SF
        const nextId = `SF-${Math.floor((i - 1) / 2) + 1}`;
        const slot = i % 2 !== 0 ? 'homeTeam' as const : 'awayTeam' as const;
        updated[nextId][slot] = winner;
      }
    }

    // Stage 4: Semifinals
    for (let i = 1; i <= 2; i++) {
      const match = updated[`SF-${i}`];
      if (match && match.homeTeam && match.awayTeam) {
        const winner = simulateKnockoutWinner(match.homeTeam, match.awayTeam);
        match.winner = winner;
        if (winner.id === match.homeTeam.id) {
          match.homeScore = Math.floor(Math.random() * 2) + 2;
          match.awayScore = Math.floor(Math.random() * match.homeScore);
        } else {
          match.awayScore = Math.floor(Math.random() * 2) + 2;
          match.homeScore = Math.floor(Math.random() * match.awayScore);
        }
        
        // Propagate to Final
        const nextId = 'F-1';
        const slot = i === 1 ? 'homeTeam' as const : 'awayTeam' as const;
        updated[nextId][slot] = winner;
      }
    }

    // Stage 5: Final
    const finalMatch = updated['F-1'];
    if (finalMatch && finalMatch.homeTeam && finalMatch.awayTeam) {
      const winner = simulateKnockoutWinner(finalMatch.homeTeam, finalMatch.awayTeam);
      finalMatch.winner = winner;
      if (winner.id === finalMatch.homeTeam.id) {
        finalMatch.homeScore = Math.floor(Math.random() * 2) + 2;
        finalMatch.awayScore = Math.floor(Math.random() * finalMatch.homeScore);
      } else {
        finalMatch.awayScore = Math.floor(Math.random() * 2) + 2;
        finalMatch.homeScore = Math.floor(Math.random() * finalMatch.awayScore);
      }
    }

    setBracket(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wc2026_knockout_bracket', JSON.stringify(updated));
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 className="page-title">淘汰赛对阵模拟</h1>
        <p className="page-subtitle" style={{ marginBottom: 0 }}>
          基于您的小组预测，开始模拟 32 强单败淘汰赛。AI 将根据球队实力实时估算每场比赛的晋级概率，协助您推演最终冠军！
        </p>
      </div>

      <BracketVisualizer
        bracket={bracket}
        onSelectWinner={handleSelectWinner}
        onReset={handleReset}
        onAutoSimulate={handleAutoSimulate}
      />
    </div>
  );
}
