import { storiesOf } from "@storybook/react";
import * as React from "react";

import Section from "../Section";
import GameCard from ".";
import { games } from "./fixtures";

storiesOf("GameCard", module)
  .addDecorator(getStory => <Section padding={[1, 2]}>{getStory()}</Section>)
  .add("GameCard", () => <GameCard game={games[0]} />)
  .add("GameCards", () => (
    <>
      {games.map(game => (
        <GameCard key={game.start.valueOf()} game={game} />
      ))}
    </>
  ));
