import { Team, Match, calculateMatchPredictions, teams } from './worldCupData';

export interface GroupStanding {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

// Compute group standings based on matches of a specific group
export function calculateGroupStandings(groupLetter: string, groupMatches: Match[]): GroupStanding[] {
  const groupTeams = teams.filter((t) => t.group === groupLetter);
  const standingsMap: Record<string, GroupStanding> = {};

  groupTeams.forEach((team) => {
    standingsMap[team.id] = {
      team,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    };
  });

  groupMatches.forEach((match) => {
    if (match.group !== groupLetter || match.status !== 'Played') return;
    if (!match.homeTeam || !match.awayTeam) return;

    const home = standingsMap[match.homeTeam.id];
    const away = standingsMap[match.awayTeam.id];

    if (!home || !away) return;

    const hScore = match.homeScore ?? 0;
    const aScore = match.awayScore ?? 0;

    home.played += 1;
    away.played += 1;
    home.goalsFor += hScore;
    home.goalsAgainst += aScore;
    away.goalsFor += aScore;
    away.goalsAgainst += hScore;

    if (hScore > aScore) {
      home.won += 1;
      home.points += 3;
      away.lost += 1;
    } else if (hScore < aScore) {
      away.won += 1;
      away.points += 3;
      home.lost += 1;
    } else {
      home.drawn += 1;
      away.drawn += 1;
      home.points += 1;
      away.points += 1;
    }
  });

  // Calculate goal differences and convert to array
  const standings = Object.values(standingsMap).map((s) => {
    s.goalDifference = s.goalsFor - s.goalsAgainst;
    return s;
  });

  // Sort standings by: 1. Points, 2. GD, 3. GF, 4. FIFA rank (lower is better rank)
  standings.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return a.team.rank - b.team.rank;
  });

  return standings;
}

// Simulate a match score based on prediction probabilities and FIFA rank difference
export function simulateMatchScore(home: Team, away: Team): { homeScore: number; awayScore: number } {
  const pred = calculateMatchPredictions(home, away);
  
  // Decide result (Home Win, Draw, Away Win) based on probabilities
  const rand = Math.random() * 100;
  let result: 'home' | 'draw' | 'away';

  if (rand < pred.homeWin) {
    result = 'home';
  } else if (rand < pred.homeWin + pred.draw) {
    result = 'draw';
  } else {
    result = 'away';
  }

  // Generate scores based on rank and result
  // Stronger teams generally score more, but capped for realism
  const rankStrengthHome = Math.max(0, 100 - home.rank) / 25; // 0 to 4
  const rankStrengthAway = Math.max(0, 100 - away.rank) / 25; // 0 to 4

  let hScore = 0;
  let aScore = 0;

  if (result === 'home') {
    hScore = Math.floor(Math.random() * 3) + 1; // 1-3 goals
    // Maybe boost home score if rank difference is high
    if (away.rank - home.rank > 30) hScore += Math.floor(Math.random() * 2);
    aScore = Math.floor(Math.random() * hScore); // less than home score
  } else if (result === 'away') {
    aScore = Math.floor(Math.random() * 3) + 1; // 1-3 goals
    if (home.rank - away.rank > 30) aScore += Math.floor(Math.random() * 2);
    hScore = Math.floor(Math.random() * aScore); // less than away score
  } else {
    // Draw
    hScore = Math.floor(Math.random() * 3); // 0-2 goals
    aScore = hScore;
  }

  return { homeScore: hScore, awayScore: aScore };
}

// Predict champion based on monte carlo simulation odds, or simple hierarchy
// We will return the team with the highest tournament prediction odds for the UI,
// but let users select/predict their own path.
export function getAIChampionPrediction(): Team {
  return teams.find(t => t.id === 'arg') || teams[0]; // Argentina has highest prob
}

// Structured list of initial Round of 32 knockout matches.
// We pre-calculate a realistic seeding based on team ranks and group-stage predictions.
export const initialKnockoutMatches = [
  // Left Bracket Path 1
  { id: 'R32-1', stage: 'Round of 32', homeTeamId: 'kor', awayTeamId: 'mor', date: '2026-06-28', time: '17:00', stadium: 'SoFi Stadium', city: 'Los Angeles' }, // A2 vs C2
  { id: 'R32-2', stage: 'Round of 32', homeTeamId: 'ita', awayTeamId: 'den', date: '2026-06-28', time: '21:00', stadium: 'MetLife Stadium', city: 'New York' },  // B1 vs A3
  { id: 'R32-3', stage: 'Round of 32', homeTeamId: 'bra', awayTeamId: 'tur', date: '2026-06-29', time: '14:00', stadium: 'Hard Rock Stadium', city: 'Miami' },    // C1 vs D3
  { id: 'R32-4', stage: 'Round of 32', homeTeamId: 'usa', awayTeamId: 'ecu', date: '2026-06-29', time: '18:00', stadium: 'AT&T Stadium', city: 'Dallas' },      // D1 vs E2

  // Left Bracket Path 2
  { id: 'R32-5', stage: 'Round of 32', homeTeamId: 'ger', awayTeamId: 'aus', date: '2026-06-30', time: '15:00', stadium: 'Mercedes-Benz Stadium', city: 'Atlanta' }, // E1 vs D2
  { id: 'R32-6', stage: 'Round of 32', homeTeamId: 'ned', awayTeamId: 'egy', date: '2026-06-30', time: '19:00', stadium: 'BC Place', city: 'Vancouver' },     // F1 vs G2
  { id: 'R32-7', stage: 'Round of 32', homeTeamId: 'bel', awayTeamId: 'jpn', date: '2026-07-01', time: '16:00', stadium: 'Lumen Field', city: 'Seattle' },     // G1 vs F2
  { id: 'R32-8', stage: 'Round of 32', homeTeamId: 'esp', awayTeamId: 'sen', date: '2026-07-01', time: '20:00', stadium: 'Estadio Azteca', city: 'Mexico City' }, // H1 vs I2

  // Right Bracket Path 1
  { id: 'R32-9', stage: 'Round of 32', homeTeamId: 'fra', awayTeamId: 'uru', date: '2026-07-02', time: '14:00', stadium: 'Lincoln Financial Field', city: 'Philadelphia' }, // I1 vs H2
  { id: 'R32-10', stage: 'Round of 32', homeTeamId: 'arg', awayTeamId: 'col', date: '2026-07-02', time: '18:00', stadium: 'NRG Stadium', city: 'Houston' },    // J1 vs K2
  { id: 'R32-11', stage: 'Round of 32', homeTeamId: 'por', awayTeamId: 'aut', date: '2026-07-03', time: '17:00', stadium: 'Arrowhead Stadium', city: 'Kansas City' }, // K1 vs J2
  { id: 'R32-12', stage: 'Round of 32', homeTeamId: 'eng', awayTeamId: 'sui', date: '2026-07-03', time: '21:00', stadium: 'Gillette Stadium', city: 'Boston' },   // L1 vs B2

  // Right Bracket Path 2
  { id: 'R32-13', stage: 'Round of 32', homeTeamId: 'mex', awayTeamId: 'swe', date: '2026-07-04', time: '13:00', stadium: 'Estadio BBVA', city: 'Monterrey' },   // A1 vs F3
  { id: 'R32-14', stage: 'Round of 32', homeTeamId: 'cro', awayTeamId: 'nor', date: '2026-07-04', time: '17:00', stadium: 'Levi\'s Stadium', city: 'San Francisco' }, // L2 vs I3
  { id: 'R32-15', stage: 'Round of 32', homeTeamId: 'civ', awayTeamId: 'par', date: '2026-07-05', time: '16:00', stadium: 'Estadio Akron', city: 'Guadalajara' }, // E3 vs D2
  { id: 'R32-16', stage: 'Round of 32', homeTeamId: 'can', awayTeamId: 'gha', date: '2026-07-05', time: '20:00', stadium: 'BMO Field', city: 'Toronto' }        // B3 vs L3 (or wildcards)
];
