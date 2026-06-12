export interface Team {
  id: string;
  name: string;
  flag: string;
  rank: number;
  group: string;
  winningProb: number; // Championship probability out of 100%
}

export interface Match {
  id: string;
  group?: string; // Group letter (A-L) for group stage
  stage: 'Group' | 'Round of 32' | 'Round of 16' | 'Quarterfinal' | 'Semifinal' | '3rd Place' | 'Final';
  homeTeam: Team | null; // Null represents TBD in knockout stage
  awayTeam: Team | null;
  homeScore?: number;
  awayScore?: number;
  date: string;
  time: string;
  stadium: string;
  city: string;
  status: 'Scheduled' | 'Live' | 'Played';
  liveMinute?: number;
  // Predictions: Win/Draw/Loss probabilities (out of 100%)
  prediction: {
    homeWin: number;
    draw: number;
    awayWin: number;
  };
}

export interface MatchRating {
  matchId: string;
  excitement: number; // 1-5 stars
  tactical: number; // 1-5 stars
  referee: number; // 1-5 stars
  mvp: string; // Player name
  comment: string;
  timestamp: number;
}

// 48 teams for 2026 FIFA World Cup, divided into Groups A to L (12 groups of 4)
export const teams: Team[] = [
  // Group A
  { id: 'mex', name: 'Mexico', flag: '🇲🇽', rank: 15, group: 'A', winningProb: 0.8 },
  { id: 'rsa', name: 'South Africa', flag: '🇿🇦', rank: 59, group: 'A', winningProb: 0.1 },
  { id: 'kor', name: 'South Korea', flag: '🇰🇷', rank: 22, group: 'A', winningProb: 0.5 },
  { id: 'den', name: 'Denmark', flag: '🇩🇰', rank: 16, group: 'A', winningProb: 0.6 },

  // Group B
  { id: 'can', name: 'Canada', flag: '🇨🇦', rank: 40, group: 'B', winningProb: 0.1 },
  { id: 'ita', name: 'Italy', flag: '🇮🇹', rank: 9, group: 'B', winningProb: 4.0 },
  { id: 'qat', name: 'Qatar', flag: '🇶🇦', rank: 38, group: 'B', winningProb: 0.1 },
  { id: 'sui', name: 'Switzerland', flag: '🇨🇭', rank: 19, group: 'B', winningProb: 0.6 },

  // Group C
  { id: 'bra', name: 'Brazil', flag: '🇧🇷', rank: 5, group: 'C', winningProb: 13.0 },
  { id: 'mar', name: 'Morocco', flag: '🇲🇦', rank: 13, group: 'C', winningProb: 2.0 },
  { id: 'hai', name: 'Haiti', flag: '🇭🇹', rank: 86, group: 'C', winningProb: 0.05 },
  { id: 'sco', name: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', rank: 34, group: 'C', winningProb: 0.1 },

  // Group D
  { id: 'usa', name: 'United States', flag: '🇺🇸', rank: 11, group: 'D', winningProb: 1.2 },
  { id: 'par', name: 'Paraguay', flag: '🇵🇾', rank: 56, group: 'D', winningProb: 0.1 },
  { id: 'aus', name: 'Australia', flag: '🇦🇺', rank: 25, group: 'D', winningProb: 0.2 },
  { id: 'tur', name: 'Türkiye', flag: '🇹🇷', rank: 35, group: 'D', winningProb: 0.5 },

  // Group E
  { id: 'ger', name: 'Germany', flag: '🇩🇪', rank: 16, group: 'E', winningProb: 6.0 },
  { id: 'cur', name: 'Curaçao', flag: '🇨🇼', rank: 90, group: 'E', winningProb: 0.05 },
  { id: 'civ', name: 'Ivory Coast', flag: '🇨🇮', rank: 39, group: 'E', winningProb: 0.2 },
  { id: 'ecu', name: 'Ecuador', flag: '🇪🇨', rank: 30, group: 'E', winningProb: 0.4 },

  // Group F
  { id: 'ned', name: 'Netherlands', flag: '🇳🇱', rank: 7, group: 'F', winningProb: 5.0 },
  { id: 'jpn', name: 'Japan', flag: '🇯🇵', rank: 18, group: 'F', winningProb: 1.0 },
  { id: 'swe', name: 'Sweden', flag: '🇸🇪', rank: 28, group: 'F', winningProb: 0.5 },
  { id: 'tun', name: 'Tunisia', flag: '🇹🇳', rank: 41, group: 'F', winningProb: 0.05 },

  // Group G
  { id: 'bel', name: 'Belgium', flag: '🇧🇪', rank: 3, group: 'G', winningProb: 3.0 },
  { id: 'egy', name: 'Egypt', flag: '🇪🇬', rank: 36, group: 'G', winningProb: 0.3 },
  { id: 'irn', name: 'Iran', flag: '🇮🇷', rank: 20, group: 'G', winningProb: 0.1 },
  { id: 'nzl', name: 'New Zealand', flag: '🇳🇿', rank: 104, group: 'G', winningProb: 0.05 },

  // Group H
  { id: 'esp', name: 'Spain', flag: '🇪🇸', rank: 8, group: 'H', winningProb: 9.0 },
  { id: 'cpv', name: 'Cape Verde', flag: '🇨🇻', rank: 65, group: 'H', winningProb: 0.05 },
  { id: 'ksa', name: 'Saudi Arabia', flag: '🇸🇦', rank: 53, group: 'H', winningProb: 0.1 },
  { id: 'uru', name: 'Uruguay', flag: '🇺🇾', rank: 11, group: 'H', winningProb: 3.5 },

  // Group I
  { id: 'fra', name: 'France', flag: '🇫🇷', rank: 2, group: 'I', winningProb: 12.0 },
  { id: 'sen', name: 'Senegal', flag: '🇸🇳', rank: 17, group: 'I', winningProb: 0.8 },
  { id: 'bol', name: 'Bolivia', flag: '🇧🇴', rank: 84, group: 'I', winningProb: 0.1 },
  { id: 'nor', name: 'Norway', flag: '🇳🇴', rank: 44, group: 'I', winningProb: 0.3 },

  // Group J
  { id: 'arg', name: 'Argentina', flag: '🇦🇷', rank: 1, group: 'J', winningProb: 15.0 },
  { id: 'alg', name: 'Algeria', flag: '🇩🇿', rank: 32, group: 'J', winningProb: 0.1 },
  { id: 'aut', name: 'Austria', flag: '🇦🇹', rank: 25, group: 'J', winningProb: 0.2 },
  { id: 'jor', name: 'Jordan', flag: '🇯🇴', rank: 71, group: 'J', winningProb: 0.1 },

  // Group K
  { id: 'por', name: 'Portugal', flag: '🇵🇹', rank: 6, group: 'K', winningProb: 7.0 },
  { id: 'jam', name: 'Jamaica', flag: '🇯🇲', rank: 55, group: 'K', winningProb: 0.05 },
  { id: 'uzb', name: 'Uzbekistan', flag: '🇺🇿', rank: 66, group: 'K', winningProb: 0.1 },
  { id: 'col', name: 'Colombia', flag: '🇨🇴', rank: 12, group: 'K', winningProb: 2.5 },

  // Group L
  { id: 'eng', name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rank: 4, group: 'L', winningProb: 10.0 },
  { id: 'cro', name: 'Croatia', flag: '🇭🇷', rank: 10, group: 'L', winningProb: 1.5 },
  { id: 'gha', name: 'Ghana', flag: '🇬🇭', rank: 60, group: 'L', winningProb: 0.3 },
  { id: 'pan', name: 'Panama', flag: '🇵🇦', rank: 43, group: 'L', winningProb: 0.05 }
];

export const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'] as const;

export const stadiums = [
  { name: 'MetLife Stadium', city: 'East Rutherford (NY/NJ)' },
  { name: 'SoFi Stadium', city: 'Inglewood (Los Angeles)' },
  { name: 'AT&T Stadium', city: 'Arlington (Dallas)' },
  { name: 'Mercedes-Benz Stadium', city: 'Atlanta' },
  { name: 'Hard Rock Stadium', city: 'Miami Gardens (Miami)' },
  { name: 'BC Place', city: 'Vancouver' },
  { name: 'Estadio Azteca', city: 'Mexico City' },
  { name: 'Lumen Field', city: 'Seattle' },
  { name: 'Levi\'s Stadium', city: 'Santa Clara (San Francisco)' },
  { name: 'Gillette Stadium', city: 'Foxborough (Boston)' },
  { name: 'Lincoln Financial Field', city: 'Philadelphia' },
  { name: 'NRG Stadium', city: 'Houston' },
  { name: 'Arrowhead Stadium', city: 'Kansas City' },
  { name: 'BMO Field', city: 'Toronto' },
  { name: 'Estadio BBVA', city: 'Guadalupe (Monterrey)' },
  { name: 'Estadio Akron', city: 'Zapopan (Guadalajara)' }
];

// Helper to calculate win/draw/away probabilities using ranking Elo-based approximation
export function calculateMatchPredictions(home: Team, away: Team): Match['prediction'] {
  const rankDiff = away.rank - home.rank; // Positive means home is higher ranked (lower rank number, stronger)
  
  // Base expectation using Elo-like formula
  // E = 1 / (1 + 10^(-diff / 30))
  const exponent = rankDiff / 30;
  const homeExpectation = 1 / (1 + Math.pow(10, -exponent));
  
  // Draw probability is higher for teams of similar rank, capped between 18% and 28%
  const absDiff = Math.abs(rankDiff);
  const drawProb = Math.max(18, Math.min(28, 28 - absDiff * 0.2));
  
  // Split the remaining percentage proportional to expectations
  const remaining = 100 - drawProb;
  const homeWinRaw = homeExpectation * remaining;
  const awayWinRaw = (1 - homeExpectation) * remaining;
  
  // Return rounded values that sum to 100
  const homeWin = Math.round(homeWinRaw);
  const awayWin = Math.round(awayWinRaw);
  const draw = 100 - homeWin - awayWin;
  
  return { homeWin, draw, awayWin };
}

// Generate the 72 group matches
export function generateGroupMatches(): Match[] {
  const matches: Match[] = [];
  let matchIdCounter = 1;

  groups.forEach((groupLetter) => {
    const groupTeams = teams.filter((t) => t.group === groupLetter);
    if (groupTeams.length !== 4) return;

    const [t1, t2, t3, t4] = groupTeams;

    // Standard round robin matchups:
    // Matchday 1: t1 vs t2, t3 vs t4
    // Matchday 2: t1 vs t3, t2 vs t4
    // Matchday 3: t4 vs t1, t2 vs t3
    const pairings = [
      { home: t1, away: t2, matchday: 1 },
      { home: t3, away: t4, matchday: 1 },
      { home: t1, away: t3, matchday: 2 },
      { home: t2, away: t4, matchday: 2 },
      { home: t4, away: t1, matchday: 3 },
      { home: t2, away: t3, matchday: 3 }
    ];

    pairings.forEach((pair, idx) => {
      const stadiumIdx = (matchIdCounter + idx) % stadiums.length;
      const stadium = stadiums[stadiumIdx];
      const matchId = `G-${groupLetter}-${pair.matchday}-${idx % 2 === 0 ? 1 : 2}`;

      // Calculate dates from June 12 to June 26, 2026
      const baseDay = 12 + (pair.matchday - 1) * 5 + (matchIdCounter % 3);
      const dateString = `2026-06-${baseDay.toString().padStart(2, '0')}`;
      const timeSlots = ['13:00', '16:00', '20:00'];
      const time = timeSlots[(matchIdCounter + idx) % timeSlots.length];

      matches.push({
        id: matchId,
        group: groupLetter,
        stage: 'Group',
        homeTeam: pair.home,
        awayTeam: pair.away,
        status: 'Scheduled',
        date: dateString,
        time: time,
        stadium: stadium.name,
        city: stadium.city,
        prediction: calculateMatchPredictions(pair.home, pair.away)
      });
      matchIdCounter++;
    });
  });

  return matches;
}

// Generate default ratings for simulation
export const defaultRatings: Record<string, MatchRating[]> = {
  'G-A-1-1': [
    {
      matchId: 'G-A-1-1',
      excitement: 4,
      tactical: 3,
      referee: 4,
      mvp: 'Son Heung-min',
      comment: 'Very exciting opening group stage game! South Korea displayed great discipline.',
      timestamp: Date.now() - 3600000
    }
  ]
};

// Initial championship winning odds for visual charts
export const championshipOdds = teams
  .map(t => ({ name: t.name, flag: t.flag, prob: t.winningProb }))
  .sort((a, b) => b.prob - a.prob)
  .slice(0, 10); // Top 10 contenders
