export type Activity = {
  x: number;
  y: number;
  value: number;
};

export type TeamActivity = {
  id: number
  activity: Activity[]
};
