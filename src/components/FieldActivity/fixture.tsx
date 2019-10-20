import { TeamActivity } from "./types";

type TeamAreaStats = {
  x: number;
  y: number;
  passes: number;
  intercepts: number;
  offenses: number;
};

type TeamStats = TeamAreaStats[];

type Team = {
  id: number;
  stats: TeamStats;
};

let i = 1;
const getTeam = (): Team => {
  const stats: TeamAreaStats[] = [];

  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 3; y++) {
      stats.push({
        x,
        y,
        passes: Math.round(Math.random() * 5),
        intercepts: Math.round(Math.random() * 5),
        offenses: Math.round(Math.random() * 5)
      });
    }
  }

  return {
    id: ++i,
    stats
  };
};

const getTeamActivity = (team: Team, key: keyof TeamAreaStats): TeamActivity => {
  const values = team.stats.map(area => area[key]);
  const max = Math.max.apply(Math, values);
  const factor = max > 0 ? 1 / max : 0;
  return {
    ...team,
    activity: team.stats.map(area => ({
      x: area.x,
      y: area.y,
      value: factor * area[key]
    }))
  };
};

export const getActivity = (key: keyof TeamAreaStats) =>
  getTeamActivity(getTeam(), key);
