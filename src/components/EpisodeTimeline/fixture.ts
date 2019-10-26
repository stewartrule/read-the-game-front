import { Period } from "./types";

const homePlayers = Array.from("abcdefghijk").map((name, i) => ({
  id: 1 + i,
  name
}));

const awayPlayers = Array.from("lmnopqrstuv").map((name, i) => ({
  id: 20 + i,
  name
}));

const duration = 60 * 45; // time.
const interval = 10;

export const periods: Period[] = [];
for (let time = 0; time < duration; time += interval) {
  const prevIndex = periods.length - 1;
  if (Math.random() > 0.8) {
    const last = periods[prevIndex];

    if (last && last.control === false) {
      periods[prevIndex] = {
        ...last,
        duration: last.duration + interval,
        control: false
      };
    } else {
      periods.push({
        start: time,
        duration: interval,
        control: false
      });
    }
  } else if (Math.random() > 0.5) {
    const last = periods[prevIndex];

    if (last && last.control && last.type === "home") {
      periods[prevIndex] = {
        ...last,
        duration: last.duration + interval,
        type: "home",
        control: true,
        playerId: last.playerId
      };
    } else {
      periods.push({
        start: time,
        duration: interval,
        type: "home",
        active: false,
        control: true,
        playerId: homePlayers[time % homePlayers.length].id
      });
    }
  } else {
    const last = periods[prevIndex];

    if (last && last.control && last.type === "away") {
      periods[prevIndex] = {
        ...last,
        duration: last.duration + interval,
        type: "away",
        control: true,
        playerId: last.playerId
      };
    } else {
      periods.push({
        start: time,
        duration: interval,
        type: "away",
        active: false,
        control: true,
        playerId: awayPlayers[time % awayPlayers.length].id
      });
    }
  }
}
