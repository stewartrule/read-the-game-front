export type Shot = {
  hit: boolean;
  time: Date;
  player: {
    id: number;
    lastname: string;
  };
};

export type Team = {
  id: number;
  name: string;
  control: number;
  shots: Shot[];
};

export type Game = {
  start: Date;
  stop: Date;
  homeTeam: Team;
  awayTeam: Team;
};
