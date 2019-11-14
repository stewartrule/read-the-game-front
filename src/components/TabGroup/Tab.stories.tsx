import { storiesOf } from "@storybook/react";
import * as React from "react";

import Block from "../Block";
import Tab from "./Tab";
import TabGroup from "./";

storiesOf("Tab", module)
  .addDecorator(getStory => <Block theme="dark">{getStory()}</Block>)
  .add("toggle", () => (
    <TabGroup>
      <Tab primary>
        Heim: <strong>Bayern</strong>
      </Tab>
      <Tab>
        Ausw: <strong>Dortmund</strong>
      </Tab>
    </TabGroup>
  ))
  .add("scrollable", () => (
    <TabGroup scrollable>
      <Tab primary>Bayern</Tab>
      <Tab primary active>
        Dortmund
      </Tab>
      <Tab primary>Dortmund</Tab>
      <Tab primary>Dortmund</Tab>
      <Tab primary>Dortmund</Tab>
      <Tab primary>Dortmund</Tab>
      <Tab primary>Dortmund</Tab>
    </TabGroup>
  ));
