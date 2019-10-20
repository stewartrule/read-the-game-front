import { Team } from "./ScatterGram";

const count = 15;
const factor = 1 / (count - 1);

const avatar = "http://thetopforward.com/uploads/0/57134.jpg";

export const teamFixture: Team = {
  id: 1,
  players: Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: i * factor,
    y: Math.random(),
    avatar,
    scored: Math.random() > 0.7,
    substitution: Math.random() > 0.8,
    offense: Math.random() > 0.8
  }))
};
