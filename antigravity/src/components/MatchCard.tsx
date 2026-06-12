'use client';

import React from 'react';
import { Star, Trophy, Clock, MapPin } from 'lucide-react';
import { Match, MatchRating } from '../data/worldCupData';

interface MatchCardProps {
  match: Match;
  onSimulate: (matchId: string) => void;
  onOpenRateModal: (match: Match) => void;
  ratings?: MatchRating[];
}

export default function MatchCard({ match, onSimulate, onOpenRateModal, ratings = [] }: MatchCardProps) {
  const isPlayed = match.status === 'Played';
  const isLive = match.status === 'Live';

  // Calculate average ratings from reviews
  const avgExcitement = ratings.length 
    ? (ratings.reduce((sum, r) => sum + r.excitement, 0) / ratings.length).toFixed(1)
    : null;
  const avgTactical = ratings.length
    ? (ratings.reduce((sum, r) => sum + r.tactical, 0) / ratings.length).toFixed(1)
    : null;

  const mvp = ratings.length ? ratings[ratings.length - 1].mvp : null;

  return (
    <div className={`match-card ${isLive ? 'live' : ''}`}>
      {/* Header Info */}
      <div className="match-header">
        <span className="match-stage-badge">
          {match.stage === 'Group' ? `Group ${match.group}` : match.stage}
        </span>
        <span className="match-venue" title={`${match.stadium}, ${match.city}`}>
          <MapPin size={12} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }} />
          {match.city}
        </span>
      </div>

      {/* Teams and Scores */}
      <div className="match-teams">
        {/* Home Team */}
        <div className="match-team-row">
          <div className="match-team-info">
            <span className="team-flag" style={{ fontSize: '1.5rem' }}>{match.homeTeam?.flag || '🏳️'}</span>
            <span className="match-team-name">{match.homeTeam?.name || 'TBD'}</span>
          </div>
          {isPlayed && (
            <span className="match-score">{match.homeScore}</span>
          )}
        </div>

        {/* Away Team */}
        <div className="match-team-row">
          <div className="match-team-info">
            <span className="team-flag" style={{ fontSize: '1.5rem' }}>{match.awayTeam?.flag || '🏳️'}</span>
            <span className="match-team-name">{match.awayTeam?.name || 'TBD'}</span>
          </div>
          {isPlayed && (
            <span className="match-score">{match.awayScore}</span>
          )}
        </div>
      </div>

      {/* Date, Time, and Status */}
      <div className="match-date-time">
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Clock size={12} />
          {match.date} {match.time}
        </span>
        {isLive && (
          <span style={{ color: 'var(--color-neon-pink)', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
            <span className="live-pulse"></span>
            LIVE {match.liveMinute}'
          </span>
        )}
        {!isLive && !isPlayed && (
          <span style={{ color: 'var(--text-muted)' }}>即将开始</span>
        )}
        {isPlayed && (
          <span style={{ color: 'var(--color-neon-green)', fontWeight: 700 }}>已完赛</span>
        )}
      </div>

      {/* Predictions and Ratings Section */}
      {!isPlayed && match.homeTeam && match.awayTeam && (
        <div style={{ marginTop: 'auto' }}>
          <div className="match-prediction-bar">
            <div className="pred-home" style={{ width: `${match.prediction.homeWin}%` }} />
            <div className="pred-draw" style={{ width: `${match.prediction.draw}%` }} />
            <div className="pred-away" style={{ width: `${match.prediction.awayWin}%` }} />
          </div>
          <div className="prediction-labels">
            <span className="prediction-label-home">{match.prediction.homeWin}% 胜</span>
            <span style={{ color: 'var(--text-muted)' }}>{match.prediction.draw}% 平</span>
            <span className="prediction-label-away">{match.prediction.awayWin}% 胜</span>
          </div>
        </div>
      )}

      {isPlayed && (
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
          {avgExcitement && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)' }}>平均精彩度:</span>
              <span style={{ color: 'var(--color-gold)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={12} className="star-icon filled" style={{ verticalAlign: 'middle' }} />
                {avgExcitement} / 5
              </span>
            </div>
          )}
          {avgTactical && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)' }}>战术对抗度:</span>
              <span style={{ color: 'var(--color-neon-cyan)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={12} className="star-icon filled" style={{ color: 'var(--color-neon-cyan)', filter: 'none', verticalAlign: 'middle' }} />
                {avgTactical} / 5
              </span>
            </div>
          )}
          {mvp && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-neon-green)', fontWeight: 600, borderTop: '1px solid rgba(255, 255, 255, 0.04)', paddingTop: '6px', marginTop: '2px' }}>
              <Trophy size={12} />
              <span>MVP: {mvp}</span>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="match-card-actions">
        {!isPlayed && match.homeTeam && match.awayTeam ? (
          <button 
            className="btn-primary" 
            style={{ width: '100%', fontSize: '0.85rem', padding: '8px' }}
            onClick={() => onSimulate(match.id)}
          >
            AI 模拟赛果
          </button>
        ) : isPlayed ? (
          <button 
            className="btn-small" 
            style={{ width: '100%', borderColor: 'rgba(255, 183, 0, 0.3)', color: 'var(--color-gold)' }}
            onClick={() => onOpenRateModal(match)}
          >
            {ratings.length ? '再次评分' : '为比赛打分'}
          </button>
        ) : (
          <div style={{ width: '100%', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', fontStyle: 'italic' }}>
            对阵待定
          </div>
        )}
      </div>
    </div>
  );
}
