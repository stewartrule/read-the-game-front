/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSchedule
// ====================================================

export interface GetSchedule_shotTypes {
  __typename: "ShotType";
  id: string;
  name: string;
}

export interface GetSchedule_games_homeTeam_players {
  __typename: "Player";
  id: string;
  lastName: string;
}

export interface GetSchedule_games_homeTeam {
  __typename: "Team";
  id: string;
  name: string;
  abbr: string;
  players: GetSchedule_games_homeTeam_players[];
}

export interface GetSchedule_games_awayTeam_players {
  __typename: "Player";
  id: string;
  lastName: string;
}

export interface GetSchedule_games_awayTeam {
  __typename: "Team";
  id: string;
  name: string;
  abbr: string;
  players: GetSchedule_games_awayTeam_players[];
}

export interface GetSchedule_games {
  __typename: "Game";
  id: string;
  start: Date;
  stop: Date;
  homeTeam: GetSchedule_games_homeTeam;
  awayTeam: GetSchedule_games_awayTeam;
}

export interface GetSchedule {
  shotTypes: GetSchedule_shotTypes[];
  games: GetSchedule_games[];
}
