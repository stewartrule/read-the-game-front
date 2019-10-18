export type Shot = {
  id: number
  hit: boolean;
  time: Date;
  player: {
    id: number;
    lastName: string;
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
