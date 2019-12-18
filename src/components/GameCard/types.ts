export type Shot = {
  id: string;
  hit: boolean;
  time: Date;
  fromPlayer: {
    id: string;
    lastName: string;
  };
};

export type Team = {
  id: string;
  name: string;
  control: number;
};

export type Game = {
  id: string;
  start: Date;
  stop: Date;
  homeTeamShots: Shot[];
  awayTeamShots: Shot[];
  homeTeam: Team;
  awayTeam: Team;
};
