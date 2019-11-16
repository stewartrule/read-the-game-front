/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: ShotCountByPeriodUpdated
// ====================================================

export interface ShotCountByPeriodUpdated_shotCountByPeriodUpdated_shotCountByPeriod_homeTeam_shots {
  __typename: "Shot";
  id: string;
  hit: boolean;
}

export interface ShotCountByPeriodUpdated_shotCountByPeriodUpdated_shotCountByPeriod_homeTeam {
  __typename: "TeamShotCountByPeriod";
  count: number;
  shots: ShotCountByPeriodUpdated_shotCountByPeriodUpdated_shotCountByPeriod_homeTeam_shots[];
}

export interface ShotCountByPeriodUpdated_shotCountByPeriodUpdated_shotCountByPeriod_awayTeam_shots {
  __typename: "Shot";
  id: string;
  hit: boolean;
}

export interface ShotCountByPeriodUpdated_shotCountByPeriodUpdated_shotCountByPeriod_awayTeam {
  __typename: "TeamShotCountByPeriod";
  count: number;
  shots: ShotCountByPeriodUpdated_shotCountByPeriodUpdated_shotCountByPeriod_awayTeam_shots[];
}

export interface ShotCountByPeriodUpdated_shotCountByPeriodUpdated_shotCountByPeriod {
  __typename: "ShotCountByPeriod";
  homeTeam: ShotCountByPeriodUpdated_shotCountByPeriodUpdated_shotCountByPeriod_homeTeam[];
  awayTeam: ShotCountByPeriodUpdated_shotCountByPeriodUpdated_shotCountByPeriod_awayTeam[];
}

export interface ShotCountByPeriodUpdated_shotCountByPeriodUpdated {
  __typename: "Game";
  id: string;
  shotCountByPeriod: ShotCountByPeriodUpdated_shotCountByPeriodUpdated_shotCountByPeriod;
}

export interface ShotCountByPeriodUpdated {
  shotCountByPeriodUpdated: ShotCountByPeriodUpdated_shotCountByPeriodUpdated;
}
