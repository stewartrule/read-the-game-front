/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetGames
// ====================================================

export interface GetGames_games_homeTeamShots_player {
  __typename: "Player";
  id: string;
  lastName: string;
}

export interface GetGames_games_homeTeamShots {
  __typename: "Shot";
  id: string;
  time: Date;
  hit: boolean;
  player: GetGames_games_homeTeamShots_player;
}

export interface GetGames_games_awayTeamShots_player {
  __typename: "Player";
  id: string;
  lastName: string;
}

export interface GetGames_games_awayTeamShots {
  __typename: "Shot";
  id: string;
  time: Date;
  hit: boolean;
  player: GetGames_games_awayTeamShots_player;
}

export interface GetGames_games_homeTeam_players {
  __typename: "Player";
  id: string;
  lastName: string;
}

export interface GetGames_games_homeTeam {
  __typename: "Team";
  id: string;
  name: string;
  abbr: string;
  players: GetGames_games_homeTeam_players[];
}

export interface GetGames_games_awayTeam_players {
  __typename: "Player";
  id: string;
  lastName: string;
}

export interface GetGames_games_awayTeam {
  __typename: "Team";
  id: string;
  name: string;
  abbr: string;
  players: GetGames_games_awayTeam_players[];
}

export interface GetGames_games {
  __typename: "Game";
  id: string;
  start: Date;
  stop: Date;
  homeTeamShots: GetGames_games_homeTeamShots[];
  awayTeamShots: GetGames_games_awayTeamShots[];
  homeTeam: GetGames_games_homeTeam;
  awayTeam: GetGames_games_awayTeam;
}

export interface GetGames {
  games: GetGames_games[];
}
