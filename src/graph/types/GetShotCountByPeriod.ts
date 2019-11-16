/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetShotCountByPeriod
// ====================================================

export interface GetShotCountByPeriod_games_shotCountByPeriod_homeTeam_shots {
  __typename: "Shot";
  id: string;
  hit: boolean;
}

export interface GetShotCountByPeriod_games_shotCountByPeriod_homeTeam {
  __typename: "TeamShotCountByPeriod";
  count: number;
  shots: GetShotCountByPeriod_games_shotCountByPeriod_homeTeam_shots[];
}

export interface GetShotCountByPeriod_games_shotCountByPeriod_awayTeam_shots {
  __typename: "Shot";
  id: string;
  hit: boolean;
}

export interface GetShotCountByPeriod_games_shotCountByPeriod_awayTeam {
  __typename: "TeamShotCountByPeriod";
  count: number;
  shots: GetShotCountByPeriod_games_shotCountByPeriod_awayTeam_shots[];
}

export interface GetShotCountByPeriod_games_shotCountByPeriod {
  __typename: "ShotCountByPeriod";
  homeTeam: GetShotCountByPeriod_games_shotCountByPeriod_homeTeam[];
  awayTeam: GetShotCountByPeriod_games_shotCountByPeriod_awayTeam[];
}

export interface GetShotCountByPeriod_games {
  __typename: "Game";
  id: string;
  shotCountByPeriod: GetShotCountByPeriod_games_shotCountByPeriod;
}

export interface GetShotCountByPeriod {
  games: GetShotCountByPeriod_games[];
}
