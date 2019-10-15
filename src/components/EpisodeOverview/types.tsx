export type Uncontrolled = {
  type: "uncontrolled";
  time: number;
  duration: number;
};

export type TeamPeriod = {
  time: number;
  team: "home" | "away";
  playerId: number;
  duration: number;
};

export type Controlled = TeamPeriod & {
  type: "controlled";
};

export type Shot = TeamPeriod & {
  type: "shot";
  hit: boolean;
};

export type Period = Uncontrolled | Controlled | Shot;
