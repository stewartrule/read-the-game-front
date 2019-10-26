export type Uncontrolled = {
  start: number;
  duration: number;
  control: false;
};

export type Controlled = {
  start: number;
  control: true;
  duration: number;
  type: "home" | "away";
  playerId: number;
  active: boolean;
};

export type Period = Uncontrolled | Controlled;
