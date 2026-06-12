'use client';

import React, { useState, useEffect } from 'react';
import { Star, X } from 'lucide-react';
import { Match, MatchRating } from '../data/worldCupData';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: Match | null;
  onSubmit: (rating: MatchRating) => void;
}

const teamStarPlayers: Record<string, string[]> = {
  arg: ['Lionel Messi', 'Lautaro Martínez', 'Alexis Mac Allister', 'Enzo Fernández'],
  bra: ['Vinícius Júnior', 'Rodrygo Goes', 'Neymar Jr', 'Bruno Guimarães'],
  por: ['Cristiano Ronaldo', 'Bruno Fernandes', 'Rafael Leão', 'Bernardo Silva'],
  fra: ['Kylian Mbappé', 'Antoine Griezmann', 'Ousmane Dembélé', 'William Saliba'],
  eng: ['Harry Kane', 'Jude Bellingham', 'Bukayo Saka', 'Phil Foden'],
  esp: ['Lamine Yamal', 'Rodri Hernández', 'Pedri González', 'Nico Williams'],
  ger: ['Jamal Musiala', 'Florian Wirtz', 'Kai Havertz', 'Antonio Rüdiger'],
  ned: ['Virgil van Dijk', 'Cody Gakpo', 'Xavi Simons', 'Memphis Depay'],
  ita: ['Nicolò Barella', 'Federico Chiesa', 'Gianluigi Donnarumma', 'Alessandro Bastoni'],
  bel: ['Kevin De Bruyne', 'Romelu Lukaku', 'Jérémy Doku', 'Leandro Trossard'],
  col: ['Luis Díaz', 'James Rodríguez', 'Jhon Durán', 'Daniel Muñoz'],
  uru: ['Federico Valverde', 'Darwin Núñez', 'Ronald Araújo', 'Luis Suárez'],
  cro: ['Luka Modrić', 'Mateo Kovačić', 'Joško Gvardiol', 'Andrej Kramarić'],
  usa: ['Christian Pulisic', 'Weston McKennie', 'Gio Reyna', 'Folarin Balogun'],
  mex: ['Santiago Giménez', 'Hirving Lozano', 'Edson Álvarez', 'Luis Chávez'],
  jpn: ['Kaoru Mitoma', 'Takefusa Kubo', 'Wataru Endo', 'Takumi Minamino'],
  kor: ['Son Heung-min', 'Hwang Hee-chan', 'Kim Min-jae', 'Lee Kang-in'],
  mar: ['Achraf Hakimi', 'Hakim Ziyech', 'Sofyan Amrabat', 'Yassine Bounou'],
  sen: ['Sadio Mané', 'Nicolas Jackson', 'Kalidou Koulibaly', 'Édouard Mendy'],
  nor: ['Erling Haaland', 'Martin Ødegaard', 'Alexander Sørloth', 'Antonio Nusa'],
  tur: ['Arda Güler', 'Hakan Çalhanoğlu', 'Kenan Yıldız', 'Barış Alper Yılmaz'],
  den: ['Rasmus Højlund', 'Christian Eriksen', 'Pierre-Emile Højbjerg', 'Andreas Christensen'],
  sui: ['Granit Xhaka', 'Xherdan Shaqiri', 'Yann Sommer', 'Manuel Akanji'],
  egy: ['Mohamed Salah', 'Mostafa Mohamed', 'Trézéguet', 'Omar Marmoush']
};

export default function RatingModal({ isOpen, onClose, match, onSubmit }: RatingModalProps) {
  const [excitement, setExcitement] = useState(5);
  const [tactical, setTactical] = useState(5);
  const [referee, setReferee] = useState(5);
  const [mvp, setMvp] = useState('');
  const [customMvp, setCustomMvp] = useState('');
  const [comment, setComment] = useState('');

  // Reset ratings when match changes
  useEffect(() => {
    if (match) {
      setExcitement(5);
      setTactical(5);
      setReferee(5);
      setComment('');
      setCustomMvp('');
      
      const homePlayers = teamStarPlayers[match.homeTeam?.id || ''] || [];
      const awayPlayers = teamStarPlayers[match.awayTeam?.id || ''] || [];
      const combined = [...homePlayers, ...awayPlayers];
      setMvp(combined[0] || 'custom');
    }
  }, [match]);

  if (!isOpen || !match) return null;

  const homePlayers = teamStarPlayers[match.homeTeam?.id || ''] || [];
  const awayPlayers = teamStarPlayers[match.awayTeam?.id || ''] || [];
  const mvpOptions = [...homePlayers, ...awayPlayers];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedMvp = mvp === 'custom' ? customMvp : mvp;
    onSubmit({
      matchId: match.id,
      excitement,
      tactical,
      referee,
      mvp: selectedMvp || 'None',
      comment,
      timestamp: Date.now()
    });
    onClose();
  };

  const renderStars = (rating: number, setRating: (val: number) => void) => {
    return (
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`star-icon ${star <= rating ? 'filled' : ''}`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>
        
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>赛事深度评分</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
          为 {match.homeTeam?.flag} {match.homeTeam?.name} vs {match.awayTeam?.flag} {match.awayTeam?.name} 的比赛打分
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>精彩程度 (Excitement)</span>
              <span style={{ color: 'var(--color-gold)', fontWeight: 700 }}>{excitement} / 5</span>
            </label>
            {renderStars(excitement, setExcitement)}
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>战术水平 (Tactical Quality)</span>
              <span style={{ color: 'var(--color-gold)', fontWeight: 700 }}>{tactical} / 5</span>
            </label>
            {renderStars(tactical, setTactical)}
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>裁判判罚 (Referee Quality)</span>
              <span style={{ color: 'var(--color-gold)', fontWeight: 700 }}>{referee} / 5</span>
            </label>
            {renderStars(referee, setReferee)}
          </div>

          <div className="form-group">
            <label className="form-label">本场 MVP 球员</label>
            <select
              className="filter-select"
              style={{ width: '100%', marginBottom: mvp === 'custom' ? '12px' : '0' }}
              value={mvp}
              onChange={(e) => setMvp(e.target.value)}
            >
              {mvpOptions.map(player => (
                <option key={player} value={player}>{player}</option>
              ))}
              <option value="custom">自定义输入...</option>
            </select>
            
            {mvp === 'custom' && (
              <input
                type="text"
                className="form-input"
                placeholder="请输入 MVP 球员名字"
                value={customMvp}
                onChange={(e) => setCustomMvp(e.target.value)}
                required
              />
            )}
          </div>

          <div className="form-group">
            <label className="form-label">战术复盘 / 短评</label>
            <textarea
              className="form-textarea"
              placeholder="谈谈你对这场比赛的看法，比如战术博弈、争议判罚或闪光球员..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={200}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
            <button
              type="button"
              className="btn-small"
              style={{ flex: 1, padding: '12px' }}
              onClick={onClose}
            >
              取消
            </button>
            <button
              type="submit"
              className="btn-primary"
              style={{ flex: 2 }}
            >
              提交评分
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
