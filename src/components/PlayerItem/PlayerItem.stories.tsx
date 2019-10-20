import { storiesOf } from "@storybook/react";
import * as React from "react";

import Section from "../Section";
import PlayerItem from ".";
import { BrandColor } from "../../util/skin";

const names = [
  "Bonmann",
  "Burki",
  "Hoffman",
  "Kimmich",
  "Muller",
  "Neuer",
  "Ulreich",
  "Werner"
];

const players = names.map((name, i) => ({
  id: i + 1,
  firstname: name,
  lastname: name,
  dob: new Date(),
  shots: names.map((_, j) => ({
    hit: j <= i,
    time: new Date()
  })),
  avatar: "http://thetopforward.com/uploads/0/57134.jpg"
}));

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
