## Read the Game front

### Description

A while ago I ran into [this cool design](https://www.behance.net/gallery/55747919/read-the-gamecom) made by [Bureau Oberhaeuser](https://oberhaeuser.info/) on Behance, and thought it had some pretty awesome components, so I decided to create them using React, TypeScript and [Storybook](https://stewartrule.github.io/read-the-game-front/?path=/story/periodgraph--periodgraph), and also give [TypeGraphQL](https://typegraphql.ml/) and [TypeORM](https://typeorm.io/) a try for the [GraphQL backend](https://github.com/stewartrule/read-the-game-back).


### Install

```sh
yarn
```

### Storybook

```sh
yarn storybook
```

View the [example on GH Pages](https://stewartrule.github.io/read-the-game-front/?path=/story/periodgraph--periodgraph)

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
