import { storiesOf } from "@storybook/react";
import * as React from "react";

import { BrandColor } from "../../util/skin";
import Block from "../Block";
import Avatar from "./";

const players = [
  {
    id: 4,
    shots: [{ id: 1, hit: true }, { id: 2, hit: false }, { id: 3, hit: false }]
  },
  {
    id: 5,
    shots: [{ id: 1, hit: true }, { id: 2, hit: true }, { id: 3, hit: false }]
  },
  {
    id: 6,
    shots: [{ id: 1, hit: true }, { id: 2, hit: true }, { id: 3, hit: true }]
  }
];

const mapped = players.map(({ id, shots }, i) => {
  return {
    id,
    value: 0.2 + i * 0.3,
    image: "http://thetopforward.com/uploads/0/57134.jpg"
  };
});

storiesOf("Avatar", module)
  .addDecorator(getStory => <Block padding={[1]}>{getStory()}</Block>)
  .add("Primary", () => (
    <>
      {mapped.map((player, i) => (
        <Avatar
          key={player.id}
          image={player.image}
          value={player.value}
          color={BrandColor.primary}
          radius={30}
        />
      ))}
    </>
  ))
  .add("Secondary", () => (
    <>
      {mapped.map(player => (
        <Avatar
          key={player.id}
          image={player.image}
          value={player.value}
          color={BrandColor.secondary}
          radius={30}
        />
      ))}
    </>
  ));
