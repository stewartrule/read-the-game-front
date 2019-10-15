import { storiesOf } from "@storybook/react";
import * as React from "react";

import Section from "../Section";
import Tab from "./Tab";
import TabGroup from "./";

storiesOf("Tab", module)
  .addDecorator(getStory => <Section dark>{getStory()}</Section>)
  .add("Tab", () => (
    <TabGroup>
      <Tab>Bayern</Tab>
      <Tab active>Dortmun</Tab>
    </TabGroup>
  ));
