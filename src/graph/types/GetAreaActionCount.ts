/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAreaActionCount
// ====================================================

export interface GetAreaActionCount_games_shotCountByArea_homeTeam {
  __typename: "ActionCount";
  count: number;
  time: Date;
  x: number;
  y: number;
}

export interface GetAreaActionCount_games_shotCountByArea_awayTeam {
  __typename: "ActionCount";
  count: number;
  time: Date;
  x: number;
  y: number;
}

export interface GetAreaActionCount_games_shotCountByArea {
  __typename: "AreaActionCount";
  homeTeam: GetAreaActionCount_games_shotCountByArea_homeTeam[];
  awayTeam: GetAreaActionCount_games_shotCountByArea_awayTeam[];
}

export interface GetAreaActionCount_games_hitCountByArea_homeTeam {
  __typename: "ActionCount";
  count: number;
  time: Date;
  x: number;
  y: number;
}

export interface GetAreaActionCount_games_hitCountByArea_awayTeam {
  __typename: "ActionCount";
  count: number;
  time: Date;
  x: number;
  y: number;
}

export interface GetAreaActionCount_games_hitCountByArea {
  __typename: "AreaActionCount";
  homeTeam: GetAreaActionCount_games_hitCountByArea_homeTeam[];
  awayTeam: GetAreaActionCount_games_hitCountByArea_awayTeam[];
}

export interface GetAreaActionCount_games_passCountByArea_homeTeam {
  __typename: "ActionCount";
  count: number;
  time: Date;
  x: number;
  y: number;
}

export interface GetAreaActionCount_games_passCountByArea_awayTeam {
  __typename: "ActionCount";
  count: number;
  time: Date;
  x: number;
  y: number;
}

export interface GetAreaActionCount_games_passCountByArea {
  __typename: "AreaActionCount";
  homeTeam: GetAreaActionCount_games_passCountByArea_homeTeam[];
  awayTeam: GetAreaActionCount_games_passCountByArea_awayTeam[];
}

export interface GetAreaActionCount_games {
  __typename: "Game";
  id: string;
  shotCountByArea: GetAreaActionCount_games_shotCountByArea;
  hitCountByArea: GetAreaActionCount_games_hitCountByArea;
  passCountByArea: GetAreaActionCount_games_passCountByArea;
}

export interface GetAreaActionCount {
  games: GetAreaActionCount_games[];
}
