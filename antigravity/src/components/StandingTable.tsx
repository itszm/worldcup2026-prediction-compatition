'use client';

import React from 'react';
import { GroupStanding } from '../data/standings';

interface StandingTableProps {
  groupLetter: string;
  standings: GroupStanding[];
}

export default function StandingTable({ groupLetter, standings }: StandingTableProps) {
  return (
    <div className="glass-card" style={{ padding: '20px' }}>
      <h3 style={{ 
        fontSize: '1.25rem', 
        fontWeight: 800, 
        marginBottom: '16px', 
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>Group {groupLetter}</span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>FIFA Rank</span>
      </h3>
      <table className="standings-table">
        <thead>
          <tr>
            <th style={{ width: '30px' }}>#</th>
            <th>球队</th>
            <th style={{ textAlign: 'center' }}>已赛</th>
            <th style={{ textAlign: 'center' }}>胜</th>
            <th style={{ textAlign: 'center' }}>平</th>
            <th style={{ textAlign: 'center' }}>负</th>
            <th style={{ textAlign: 'center' }}>得/失</th>
            <th style={{ textAlign: 'center' }}>净</th>
            <th style={{ textAlign: 'center' }}>积分</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((row, index) => {
            const isQualifying = index < 2;
            return (
              <tr key={row.team.id} className="standings-row">
                <td style={{ textAlign: 'center' }}>
                  <span className={`rank-num ${isQualifying ? 'qualifying' : ''}`}>
                    {index + 1}
                  </span>
                </td>
                <td>
                  <div className="team-cell">
                    <span className="team-flag">{row.team.flag}</span>
                    <span style={{ fontWeight: 600 }}>{row.team.name}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      #{row.team.rank}
                    </span>
                  </div>
                </td>
                <td style={{ textAlign: 'center' }}>{row.played}</td>
                <td style={{ textAlign: 'center' }}>{row.won}</td>
                <td style={{ textAlign: 'center' }}>{row.drawn}</td>
                <td style={{ textAlign: 'center' }}>{row.lost}</td>
                <td style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                  {row.goalsFor}/{row.goalsAgainst}
                </td>
                <td style={{ 
                  textAlign: 'center', 
                  color: row.goalDifference > 0 ? 'var(--color-neon-green)' : row.goalDifference < 0 ? 'var(--color-neon-pink)' : 'var(--text-secondary)',
                  fontWeight: row.goalDifference !== 0 ? '600' : 'normal'
                }}>
                  {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                </td>
                <td style={{ textAlign: 'center' }} className="highlight-pts">
                  {row.points}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ display: 'flex', gap: '12px', marginTop: '16px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-neon-green)' }}></span>
          <span>小组前两名晋级 32 强</span>
        </div>
      </div>
    </div>
  );
}
