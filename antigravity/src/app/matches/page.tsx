'use client';

import React, { useState, useEffect } from 'react';
import MatchCard from '@/components/MatchCard';
import RatingModal from '@/components/RatingModal';
import { Match, MatchRating, generateGroupMatches, defaultRatings } from '@/data/worldCupData';
import { simulateMatchScore } from '@/data/standings';
import { Search, Filter, MessageSquare, AlertCircle } from 'lucide-react';

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [ratings, setRatings] = useState<Record<string, MatchRating[]>>({});
  
  // Rating Modal state
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load Matches
      const storedMatches = localStorage.getItem('wc2026_matches');
      if (storedMatches) {
        try {
          setMatches(JSON.parse(storedMatches));
        } catch (e) {
          console.error(e);
          initializeDefaultMatches();
        }
      } else {
        initializeDefaultMatches();
      }

      // Load Ratings
      const storedRatings = localStorage.getItem('wc2026_ratings');
      if (storedRatings) {
        try {
          setRatings(JSON.parse(storedRatings));
        } catch (e) {
          console.error(e);
          setRatings(defaultRatings);
        }
      } else {
        setRatings(defaultRatings);
        localStorage.setItem('wc2026_ratings', JSON.stringify(defaultRatings));
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

  // Simulate single match
  const handleSimulate = (matchId: string) => {
    const updated = matches.map((match) => {
      if (match.id !== matchId || !match.homeTeam || !match.awayTeam) return match;
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

  // Open Rating modal
  const handleOpenRateModal = (match: Match) => {
    setSelectedMatch(match);
    setIsRateModalOpen(true);
  };

  // Handle rating submission
  const handleRatingSubmit = (rating: MatchRating) => {
    const updatedRatings = { ...ratings };
    if (!updatedRatings[rating.matchId]) {
      updatedRatings[rating.matchId] = [];
    }
    
    // Add new rating to the list
    updatedRatings[rating.matchId].push(rating);
    setRatings(updatedRatings);

    if (typeof window !== 'undefined') {
      localStorage.setItem('wc2026_ratings', JSON.stringify(updatedRatings));
    }
  };

  // Filter matches
  const filteredMatches = matches.filter((match) => {
    const homeName = match.homeTeam?.name.toLowerCase() || '';
    const awayName = match.awayTeam?.name.toLowerCase() || '';
    const query = searchQuery.toLowerCase();
    
    const matchesSearch = homeName.includes(query) || awayName.includes(query);
    const matchesGroup = selectedGroup === 'All' || match.group === selectedGroup;
    
    let matchesStatus = true;
    if (selectedStatus === 'Scheduled') {
      matchesStatus = match.status === 'Scheduled';
    } else if (selectedStatus === 'Played') {
      matchesStatus = match.status === 'Played';
    }

    return matchesSearch && matchesGroup && matchesStatus;
  });

  // Get list of recent comments across all matches
  const allComments = Object.values(ratings)
    .flat()
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 5);

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 className="page-title">赛事中心 & 用户评分</h1>
        <p className="page-subtitle" style={{ marginBottom: 0 }}>
          浏览世界杯 72 场小组赛程，查看 AI 预测的胜平负概率。模拟比赛后，可为精彩度、战术博弈以及裁判判罚打分！
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '32px' }}>
        {/* Main Matches Panel */}
        <div>
          {/* Filters Bar */}
          <div className="filters-bar glass-card" style={{ padding: '16px 20px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '240px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '6px 12px' }}>
              <Search size={16} style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="搜索国家队..."
                style={{ background: 'none', border: 'none', color: 'var(--text-primary)', outline: 'none', width: '100%', fontSize: '0.9rem' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <select
                className="filter-select"
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
              >
                <option value="All">所有小组</option>
                {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].map(g => (
                  <option key={g} value={g}>Group {g}</option>
                ))}
              </select>

              <select
                className="filter-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="All">所有状态</option>
                <option value="Scheduled">未赛</option>
                <option value="Played">已完赛</option>
              </select>
            </div>
          </div>

          {/* Matches Grid */}
          {filteredMatches.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
              {filteredMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onSimulate={handleSimulate}
                  onOpenRateModal={handleOpenRateModal}
                  ratings={ratings[match.id]}
                />
              ))}
            </div>
          ) : (
            <div className="glass-card" style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              <AlertCircle size={40} style={{ marginBottom: '16px', color: 'var(--text-muted)' }} />
              <p>没有找到符合筛选条件的比赛</p>
            </div>
          )}
        </div>

        {/* Sidebar: Latest Reviews */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageSquare size={18} style={{ color: 'var(--color-gold)' }} />
              最新球评动态
            </h3>
            
            {allComments.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {allComments.map((comment, index) => {
                  const match = matches.find(m => m.id === comment.matchId);
                  return (
                    <div 
                      key={index} 
                      style={{ 
                        paddingBottom: index < allComments.length - 1 ? '16px' : '0', 
                        borderBottom: index < allComments.length - 1 ? '1px dashed rgba(255,255,255,0.06)' : 'none' 
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                        <span>
                          {match?.homeTeam?.flag} {match?.homeTeam?.name} vs {match?.awayTeam?.name}
                        </span>
                        <span style={{ color: 'var(--color-gold)', fontWeight: 700 }}>
                          ★ {comment.excitement}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontStyle: 'italic', lineHeight: 1.4 }}>
                        "{comment.comment || '未填写文字短评。'}"
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                        <span>MVP: {comment.mvp}</span>
                        <span>{new Date(comment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '20px 0' }}>
                暂无球评。模拟比赛并发表您的第一条评分吧！
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Rating Modal */}
      <RatingModal
        isOpen={isRateModalOpen}
        onClose={() => setIsRateModalOpen(false)}
        match={selectedMatch}
        onSubmit={handleRatingSubmit}
      />
    </div>
  );
}
