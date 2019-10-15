import { Game } from "./types";

const teams = [
  "Borussia Dortmund",
  "Borussia Mönchengladbach",
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

const time = (offset = 0) => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + offset);
  return now;
};

const getShots = () =>
  players
    .slice(0, 3 + Math.round(Math.random() * players.length))
    .map((player, j) => ({
      hit: Math.random() > 0.7,
      time: time(j * 3),
      player: {
        id: j + 1,
        lastname: player
      }
    }));

const games: Game[] = teams.map((_, i) => {
  const shotsHome = getShots();
  const shotsAway = getShots();
  const factor = 1 / (shotsHome.length + shotsAway.length);

  return {
    start: time(i * 90),
    stop: time(i * 60 + 90),
    homeTeam: {
      control: shotsHome.length * factor,
      id: (i % teams.length) + 1,
      name: teams[i % teams.length],
      shots: shotsHome
    },
    awayTeam: {
      control: shotsAway.length * factor,
      id: i + (1 % teams.length) + 1,
      name: teams[i + (1 % teams.length)],
      shots: shotsAway
    }
  };
});

export const game = games[0];
