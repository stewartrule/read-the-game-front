import { Stat } from "./SimpleRadarGraph";

export const createStats = (): Stat[] => [
  { label: "A", value: 0.4 + Math.random() * 0.6 },
  { label: "B", value: 0.4 + Math.random() * 0.6 },
  { label: "C", value: 0.4 + Math.random() * 0.6 },
  { label: "D", value: 0.4 + Math.random() * 0.6 },
  { label: "E", value: 0.4 + Math.random() * 0.6 },
  { label: "F", value: 0.4 + Math.random() * 0.6 }
];
