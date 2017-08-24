const FOOTBALL_ADDRESS = 'http://api.football-data.org';

export const FOOTBALL_URI = {
  FIXTURES: `${FOOTBALL_ADDRESS}/v1/teams/`
  // FIXTURES: `${FOOTBALL_ADDRESS}/v1/teams/57/fixtures`
};

export function getFootballUri(team) {
  return `${FOOTBALL_URI.FIXTURES}/${team.id}/fixtures`;
}

export const TEAMS = [
  { shortName: 'Arsenal', id: 57, name: 'Arsenal FC' },
  { shortName: 'Chelsea', id: 61, name: 'Chelsea FC' },
  { shortName: 'Crystal Palace', id: 354, name: 'Crystal Palace FC' },
  { shortName: 'Tottenham Hotspur', id: 73, name: 'Tottenham Hotspur FC' },
  { shortName: 'West Ham United', id: 563, name: 'West Ham United FC' },
  { shortName: 'Brentford', id: 402, name: 'Brentford FC' },
  { shortName: 'Fulham', id: 63, name: 'Fulham FC"' },
  { shortName: 'Millwall', id: 384, name: 'Millwall FC' },
  { shortName: 'Queens Park Rangers', id: 69, name: 'Queens Park Rangers' },
];

export const PERIODS = [
  { name: 'Week', days: 7 },
  { name: 'Two weeks', days: 14 },
  { name: 'Month', days: 31 },
  { name: 'Two months', days: 62 },
  { name: 'Six months', days: 186 },
  { name: 'Year', days: 365 },
];
