import { storiesOf } from "@storybook/react";
import * as React from "react";

import { BrandColor } from "../../util/skin";
import Section from "../Section";
import { players } from "./fixture";
import PlayerItem from ".";

storiesOf("PlayerItem", module)
  .addDecorator(getStory => <Section padding={[1]}>{getStory()}</Section>)
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
