import { storiesOf } from "@storybook/react";
import * as React from "react";

import Block from "../Block";
import Menu from "./";
import MenuItem from "./MenuItem";

storiesOf("Menu", module)
  .addDecorator(getStory => (
    <Block theme="secondary">
      {getStory()}
    </Block>
  ))
  .add("Menu", () => (
    <Menu head="Kein Vergleich">
      <MenuItem>Borussia Dortmund</MenuItem>
      <MenuItem>Borussia Mönchengladbach</MenuItem>
      <MenuItem>Eintracht Frankfurt</MenuItem>
      <MenuItem>FC Augsburg</MenuItem>
      <MenuItem>FC Bayern München</MenuItem>
      <MenuItem>FC Ingolstadt 04</MenuItem>
      <MenuItem>FC Schalke 04</MenuItem>
      <MenuItem active>RB Leipzig</MenuItem>
      <MenuItem>Hamburger SV</MenuItem>
    </Menu>
  ));
