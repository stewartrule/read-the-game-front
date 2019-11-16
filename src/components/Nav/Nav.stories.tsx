import { storiesOf } from "@storybook/react";
import * as React from "react";
import { HashRouter as Router } from "react-router-dom";

import Block from "../Block";
import NavItem from "./NavItem";
import Nav from ".";

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
  .addDecorator(getStory => (
    <Router>
      <Block fit>{getStory()}</Block>
    </Router>
  ))
  .add("Nav", () => (
    <Nav>
      {items.map((item, i) => (
        <NavItem to={i === 0 ? "/" : `/_${i}`} key={item.label}>
          {item.label}
        </NavItem>
      ))}
    </Nav>
  ));
