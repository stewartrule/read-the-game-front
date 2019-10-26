## Read the Game front

### Description

A while ago I ran into [this cool design](https://www.behance.net/gallery/55747919/read-the-gamecom) made by [Bureau Oberhaeuser](https://oberhaeuser.info/) on Behance, and thought it had some pretty awesome components, so I decided to create the frontend using React, TypeScript and Storybook, and also give [TypeGraphQL](https://typegraphql.ml/) and [TypeORM](https://typeorm.io/) a try for the [GraphQL backend](https://github.com/stewartrule/read-the-game-back).


### Install

```sh
yarn
```


### Storybook

```sh
yarn storybook
```

### Running the app

First [start the GraphQL server](https://github.com/stewartrule/read-the-game-back).

Generate type definitions for the GraphQL queries.

```sh
yarn create-query-types
```

Start the app.

```sh
yarn start
```
