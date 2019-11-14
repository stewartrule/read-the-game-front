/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: areaActionCount
// ====================================================

export interface areaActionCount_homeTeam {
  __typename: "ActionCount";
  count: number;
  time: Date;
  x: number;
  y: number;
}

export interface areaActionCount_awayTeam {
  __typename: "ActionCount";
  count: number;
  time: Date;
  x: number;
  y: number;
}

export interface areaActionCount {
  __typename: "AreaActionCount";
  homeTeam: areaActionCount_homeTeam[];
  awayTeam: areaActionCount_awayTeam[];
}
