import { storiesOf } from "@storybook/react";
import * as React from "react";

import AreaSelect from "../AreaSelect";
import { Button } from "../ButtonGroup";
import IconButton from "../IconButton/IconButton";
import Section from "../Section";
import Dialog, { DialogBody, DialogHeader } from "./";

storiesOf("Dialog", module)
  .addDecorator(getStory => (
    <Section secondary spacious>
      {getStory()}
    </Section>
  ))
  .add("Dialog", () => (
    <Dialog>
      <DialogHeader>
        <div>
          <h4>Zentrales Devensives</h4>
          <p>Devensives Mittelfeld</p>
        </div>
        <div>
          <IconButton icon="cancel" />
          <IconButton icon="ok" success />
        </div>
      </DialogHeader>
      <DialogBody>
        <AreaSelect onSelect={() => {}} />
      </DialogBody>
      <DialogBody compact>
        <Button primary>
          Phasendaueranalyse
          <span className="icon-right-open"></span>
        </Button>
      </DialogBody>
    </Dialog>
  ));
