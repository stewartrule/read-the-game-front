/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: scheduleGame
// ====================================================

export interface scheduleGame_homeTeamShots_fromPlayer {
  __typename: "Player";
  id: string;
  lastName: string;
}

export interface scheduleGame_homeTeamShots {
  __typename: "Shot";
  id: string;
  time: Date;
  hit: boolean;
  fromPlayer: scheduleGame_homeTeamShots_fromPlayer;
}

export interface scheduleGame_awayTeamShots_fromPlayer {
  __typename: "Player";
  id: string;
  lastName: string;
}

export interface scheduleGame_awayTeamShots {
  __typename: "Shot";
  id: string;
  time: Date;
  hit: boolean;
  fromPlayer: scheduleGame_awayTeamShots_fromPlayer;
}

export interface scheduleGame_homeTeam_players {
  __typename: "Player";
  id: string;
  lastName: string;
}

export interface scheduleGame_homeTeam {
  __typename: "Team";
  id: string;
  name: string;
  abbr: string;
  players: scheduleGame_homeTeam_players[];
}

export interface scheduleGame_awayTeam_players {
  __typename: "Player";
  id: string;
  lastName: string;
}

export interface scheduleGame_awayTeam {
  __typename: "Team";
  id: string;
  name: string;
  abbr: string;
  players: scheduleGame_awayTeam_players[];
}

export interface scheduleGame {
  __typename: "Game";
  id: string;
  start: Date;
  stop: Date;
  homeTeamShots: scheduleGame_homeTeamShots[];
  awayTeamShots: scheduleGame_awayTeamShots[];
  homeTeam: scheduleGame_homeTeam;
  awayTeam: scheduleGame_awayTeam;
}
