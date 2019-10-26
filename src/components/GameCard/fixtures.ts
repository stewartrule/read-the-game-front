import { Game } from "./types";

const time = (offset = 0) => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + offset);
  return now;
};

const teams = [
  "Dortmund",
  "Mönchengladbach",
  "Eintracht Frankfurt",
  "FC Augsburg",
  "FC Bayern München",
  "FC Ingolstadt 04",
  "FC Schalke 04",
  "RB Leipzig",
  "Hamburger SV"
];

const players = [
  "Bonmann",
  "Burki",
  "Hoffman",
  "Kimmich",
  "Muller",
  "Neuer",
  "Ulreich",
  "Werner"
];

const getShots = () =>
  players
    .slice(0, 3 + Math.round(Math.random() * players.length))
    .map((player, j) => ({
      id: `${j + 1}`,
      hit: Math.random() > 0.7,
      time: time(j * 3),
      player: {
        id: `${j + 1}`,
        lastName: player
      }
    }));

export const games: Game[] = teams.map((_, i) => {
  const homeTeamShots = getShots();
  const awayTeamShots = getShots();
  const uncontrolled = 2;
  const factor =
    1 / (homeTeamShots.length + awayTeamShots.length + uncontrolled);

  return {
    id: `${i + 1}`,
    start: time(i * 90),
    stop: time(i * 60 + 90),
    homeTeamShots,
    awayTeamShots,
    homeTeam: {
      control: homeTeamShots.length * factor,
      id: `${i + 1}`,
      name: teams[(i + 1) % teams.length]
    },
    awayTeam: {
      control: awayTeamShots.length * factor,
      id: `${i + teams.length}`,
      name: teams[i % teams.length]
    }
  };
});
