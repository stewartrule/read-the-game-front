import { storiesOf } from "@storybook/react";
import * as React from "react";

import Block from "../Block";
import GameCard from ".";
import { games } from "./fixtures";

storiesOf("GameCard", module)
  .addDecorator(getStory => <Block padding={[1, 2]}>{getStory()}</Block>)
  .add("GameCard", () => <GameCard game={games[0]} />)
  .add("GameCards", () => (
    <>
      {games.map(game => (
        <GameCard key={game.start.valueOf()} game={game} />
      ))}
    </>
  ));
