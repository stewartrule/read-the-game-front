import { storiesOf } from "@storybook/react";
import * as React from "react";

import { BrandColor } from "../../util/skin";
import Block from "../Block";
import { players } from "./fixture";
import PlayerItem from ".";

storiesOf("PlayerItem", module)
  .addDecorator(getStory => <Block padding={[1]}>{getStory()}</Block>)
  .add("PlayerItem", () => (
    <>
      {players.map((player, i) => (
        <PlayerItem
          key={player.id}
          player={player}
          color={
            i % 4 === 3
              ? BrandColor.warn
              : i % 2 === 0
              ? BrandColor.primary
              : BrandColor.secondary
          }
        />
      ))}
    </>
  ));
