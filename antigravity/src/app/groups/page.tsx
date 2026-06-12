'use client';

import React, { useState, useEffect } from 'react';
import StandingTable from '@/components/StandingTable';
import { Match, generateGroupMatches, groups } from '@/data/worldCupData';
import { calculateGroupStandings, simulateMatchScore } from '@/data/standings';
import { Sparkles, RefreshCw, Zap } from 'lucide-react';

export default function GroupsPage() {
  const [matches, setMatches] = useState<Match[]>([]);

  // Load matches from localStorage or generate default
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('wc2026_matches');
      if (stored) {
        try {
          setMatches(JSON.parse(stored));
        } catch (e) {
          console.error(e);
          initializeDefaultMatches();
        }
      } else {
        initializeDefaultMatches();
      }
    }
  }, []);

  const initializeDefaultMatches = () => {
    const defaultMatches = generateGroupMatches();
    setMatches(defaultMatches);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wc2026_matches', JSON.stringify(defaultMatches));
    }
  };

  // Simulate all 72 group matches at once
  const handleSimulateAll = () => {
    const updated = matches.map((match) => {
      if (match.stage !== 'Group' || !match.homeTeam || !match.awayTeam) return match;
      
      const { homeScore, awayScore } = simulateMatchScore(match.homeTeam, match.awayTeam);
      return {
        ...match,
        status: 'Played' as const,
        homeScore,
        awayScore
      };
    });

    setMatches(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wc2026_matches', JSON.stringify(updated));
    }
  };

  // Reset all group matches back to scheduled
  const handleReset = () => {
    initializeDefaultMatches();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
        <div>
          <h1 className="page-title">小组积分榜</h1>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>
            实时计算的 12 个小组积分榜单。胜积3分，平积1分，负积0分。晋级名次随模拟结果自动更新。
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            className="btn-small" 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px' }}
            onClick={handleReset}
          >
            <RefreshCw size={14} />
            重置小组赛
          </button>
          <button 
            className="btn-primary" 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px' }}
            onClick={handleSimulateAll}
          >
            <Zap size={14} />
            一键模拟全部小组赛
          </button>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', 
        gap: '24px' 
      }}>
        {groups.map((groupLetter) => {
          const groupMatches = matches.filter((m) => m.group === groupLetter);
          const standings = calculateGroupStandings(groupLetter, groupMatches);
          
          return (
            <StandingTable 
              key={groupLetter} 
              groupLetter={groupLetter} 
              standings={standings} 
            />
          );
        })}
      </div>
    </div>
  );
}
