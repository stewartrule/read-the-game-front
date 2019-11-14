import { storiesOf } from "@storybook/react";
import * as React from "react";

import Block from "../Block";
import Nav from ".";
import NavItem from "./NavItem";

const items = [
  { label: "Games", active: false },
  { label: "Possession", active: true },
  { label: "Players", active: false },
  { label: "Timeline", active: false },
  { label: "Most Impactful Player", active: false },
  { label: "Offenses", active: false },
  { label: "Social", active: false }
];

storiesOf("Nav", module)
  .addDecorator(getStory => <Block theme="secondary">{getStory()}</Block>)
  .add("Nav", () => (
    <Nav>
      {items.map(item => (
        <NavItem to="/" key={item.label}>
          {item.label}
        </NavItem>
      ))}
    </Nav>
  ));
