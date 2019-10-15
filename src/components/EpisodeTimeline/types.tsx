export type Uncontrolled = {
  time: number;
  control: false;
};

export type Controlled = {
  time: number;
  control: true;
  type: "home" | "away";
  playerId: number;
};

export type Period = Uncontrolled | Controlled;
