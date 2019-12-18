/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetGameActionCount
// ====================================================

export interface GetGameActionCount_games_shotCountByArea_homeTeam {
  __typename: "TeamAreaActionCount";
  count: number;
  time: Date;
  x: number;
  y: number;
}

export interface GetGameActionCount_games_shotCountByArea_awayTeam {
  __typename: "TeamAreaActionCount";
  count: number;
  time: Date;
  x: number;
  y: number;
}

export interface GetGameActionCount_games_shotCountByArea {
  __typename: "GameActionCount";
  homeTeam: GetGameActionCount_games_shotCountByArea_homeTeam[];
  awayTeam: GetGameActionCount_games_shotCountByArea_awayTeam[];
}

export interface GetGameActionCount_games_hitCountByArea_homeTeam {
  __typename: "TeamAreaActionCount";
  count: number;
  time: Date;
  x: number;
  y: number;
}

export interface GetGameActionCount_games_hitCountByArea_awayTeam {
  __typename: "TeamAreaActionCount";
  count: number;
  time: Date;
  x: number;
  y: number;
}

export interface GetGameActionCount_games_hitCountByArea {
  __typename: "GameActionCount";
  homeTeam: GetGameActionCount_games_hitCountByArea_homeTeam[];
  awayTeam: GetGameActionCount_games_hitCountByArea_awayTeam[];
}

export interface GetGameActionCount_games_passCountByArea_homeTeam {
  __typename: "TeamAreaActionCount";
  count: number;
  time: Date;
  x: number;
  y: number;
}

export interface GetGameActionCount_games_passCountByArea_awayTeam {
  __typename: "TeamAreaActionCount";
  count: number;
  time: Date;
  x: number;
  y: number;
}

export interface GetGameActionCount_games_passCountByArea {
  __typename: "GameActionCount";
  homeTeam: GetGameActionCount_games_passCountByArea_homeTeam[];
  awayTeam: GetGameActionCount_games_passCountByArea_awayTeam[];
}

export interface GetGameActionCount_games {
  __typename: "Game";
  id: string;
  shotCountByArea: GetGameActionCount_games_shotCountByArea;
  hitCountByArea: GetGameActionCount_games_hitCountByArea;
  passCountByArea: GetGameActionCount_games_passCountByArea;
}

export interface GetGameActionCount {
  games: GetGameActionCount_games[];
}
