import { storiesOf } from "@storybook/react";
import * as React from "react";

import Section from "../Section";
import Menu from "./";
import MenuItem from "./MenuItem";

storiesOf("Menu", module)
  .addDecorator(getStory => (
    <Section secondary>
      {getStory()}
    </Section>
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
