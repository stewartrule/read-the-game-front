import { Period } from "./types";

const homePlayers = Array.from("abcdefghijk").map((name, i) => ({
  id: 1 + i,
  name
}));

const awayPlayers = Array.from("lmnopqrstuv").map((name, i) => ({
  id: 20 + i,
  name
}));

export const getPeriods = (odds = 0.5) => {
  const duration = 60 * 45; // time.
  const interval = 15;
  const shotAfter = 15

  const periods: Period[] = [];
  for (let time = 0; time < duration; time += interval) {
    if (Math.random() > 0.8) {
      const last = periods[periods.length - 1];
      if (last && last.type === "uncontrolled") {
        periods[periods.length - 1] = {
          ...last,
          duration: last.duration + interval
        };
      } else {
        periods.push({
          time,
          type: "uncontrolled",
          duration: interval
        });
      }
    } else if (Math.random() > odds) {
      const last = periods[periods.length - 1];

      if (
        last &&
        last.type === "controlled" &&
        last.team === "home" &&
        Math.random() > 0.2
      ) {
        periods[periods.length - 1] = {
          ...last,
          time,
          duration: last.duration + interval
        };

        if (last.duration > shotAfter) {
          periods.push({
            time,
            type: "shot",
            team: "home",
            playerId: last.playerId,
            duration: interval,
            hit: Math.random() > 0.7
          });
        }
      } else {
        periods.push({
          time,
          type: "controlled",
          team: "home",
          playerId: homePlayers[time % homePlayers.length].id,
          duration: interval
        });
      }
    } else {
      const last = periods[periods.length - 1];

      if (
        last &&
        last.type === "controlled" &&
        last.team === "away" &&
        Math.random() > 0.2
      ) {
        periods[periods.length - 1] = {
          ...last,
          time,
          duration: last.duration + interval
        };

        if (last.duration > shotAfter) {
          periods.push({
            time,
            type: "shot",
            team: "away",
            playerId: last.playerId,
            duration: interval,
            hit: Math.random() > 0.7
          });
        }
      } else {
        periods.push({
          time,
          type: "controlled",
          team: "away",
          playerId: awayPlayers[time % awayPlayers.length].id,
          duration: interval
        });
      }
    }
  }

  return periods;
};
