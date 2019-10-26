import { storiesOf } from "@storybook/react";
import * as React from "react";

import { BrandColor } from "../../util/skin";
import AreaSelect from "../AreaSelect";
import { Button } from "../ButtonGroup";
import IconButton from "../IconButton/IconButton";
import PlayerItem from "../PlayerItem";
import { players } from "../PlayerItem/fixture";
import Section from "../Section";
import Dialog, { DialogBody, DialogHeader } from "./";

storiesOf("Dialog", module)
  .addDecorator(getStory => (
    <Section secondary padding={[1]}>
      {getStory()}
    </Section>
  ))
  .add("with AreaSelect", () => (
    <Dialog>
      <DialogHeader>
        <div>
          <h4>Zentrales Devensives</h4>
          <p>Devensives Mittelfeld</p>
        </div>
        <div>
          <IconButton icon="cancel" margin={[0, 1, 0, 0]} />
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
  ))
  .add("with players", () => (
    <Dialog>
      <DialogHeader>
        <div>
          <h4>Wichtigste spieler</h4>
          <p>Devensives Mittelfeld</p>
        </div>
        <div>
          <IconButton icon="cancel" margin={[0, 1, 0, 0]} />
          <IconButton icon="ok" success />
        </div>
      </DialogHeader>
      <DialogBody>
        <Section>
          {players.slice(0, 5).map((player, i) => (
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
        </Section>
      </DialogBody>
      <DialogBody compact>
        <Button primary>
          Phasendaueranalyse
          <span className="icon-right-open"></span>
        </Button>
      </DialogBody>
    </Dialog>
  ));
