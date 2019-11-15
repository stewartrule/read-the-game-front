import { storiesOf } from "@storybook/react";
import * as React from "react";

import { BrandColor } from "../../util/skin";
import AreaSelect from "../AreaSelect";
import Block from "../Block";
import { Button } from "../ButtonGroup";
import IconButton from "../IconButton/IconButton";
import Overlay from "../Overlay";
import PlayerItem from "../PlayerItem";
import { players } from "../PlayerItem/fixture";
import Dialog, { DialogBody, DialogHeader } from "./";

const { useState } = React;

const PlayerList = () => (
  <Block>
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
  </Block>
);

storiesOf("Dialog", module)
  .addDecorator(getStory => (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: "100vh",
        backgroundColor: "#eee"
      }}
    >
      {getStory()}
    </div>
  ))
  .add("Animated", () => {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return (
      <>
        <Button disabled={isOpen} primary onClick={open}>
          Open
        </Button>
        <Overlay onClick={close} open={isOpen}>
          <Dialog>
            <DialogHeader>
              <div>
                <h4>Zentrales Devensives</h4>
                <p>Devensives Mittelfeld</p>
              </div>
              <div>
                <IconButton
                  icon="cancel"
                  margin={[0, 1, 0, 0]}
                  onClick={close}
                />
                <IconButton icon="ok" success onClick={close} />
              </div>
            </DialogHeader>
            <DialogBody>
              <Block padding={[2, 4]}>
                <PlayerList />
              </Block>
            </DialogBody>
            <DialogBody>
              <Button primary onClick={close}>
                Phasendaueranalyse
                <span className="icon-right-open"></span>
              </Button>
            </DialogBody>
          </Dialog>
        </Overlay>
      </>
    );
  })
  .add("with AreaSelect", () => (
    <Block padding={[2]}>
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
          <Block padding={[2, 4]}>
            <AreaSelect onSelect={() => {}} />
          </Block>
        </DialogBody>
        <DialogBody>
          <Button primary>
            Phasendaueranalyse
            <span className="icon-right-open"></span>
          </Button>
        </DialogBody>
      </Dialog>
    </Block>
  ));
