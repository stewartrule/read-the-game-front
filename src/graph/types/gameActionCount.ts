/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: gameActionCount
// ====================================================

export interface gameActionCount_homeTeam {
  __typename: "TeamAreaActionCount";
  count: number;
  time: Date;
  x: number;
  y: number;
}

export interface gameActionCount_awayTeam {
  __typename: "TeamAreaActionCount";
  count: number;
  time: Date;
  x: number;
  y: number;
}

export interface gameActionCount {
  __typename: "GameActionCount";
  homeTeam: gameActionCount_homeTeam[];
  awayTeam: gameActionCount_awayTeam[];
}
