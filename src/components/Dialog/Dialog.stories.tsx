import { storiesOf } from "@storybook/react";
import * as React from "react";
import { animated, useSpring } from "react-spring";

import { BrandColor } from "../../util/skin";
import AreaSelect from "../AreaSelect";
import { Button } from "../ButtonGroup";
import IconButton from "../IconButton/IconButton";
import PlayerItem from "../PlayerItem";
import { players } from "../PlayerItem/fixture";
import Block from "../Block";
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

const Overlay: React.FC<{ open?: boolean; onClick?: () => void }> = ({
  children,
  onClick,
  open = false
}) => {
  const style = {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    height: "100vh",
    width: "100%",
    display: "flex",
    flexShrink: 0,
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    boxSizing: "border-box",
    padding: 10
  } as const;

  const props = useSpring({
    to: { transform: open ? `translateY(0%)` : `translateY(100%)` },
    from: { transform: `translateY(100%)` }
  });

  return (
    <animated.div style={{ ...props, ...style }} onClick={onClick}>
      {children}
    </animated.div>
  );
};

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

    const props = useSpring({
      to: { transform: isOpen ? `translateY(0%)` : `translateY(100%)` },
      from: { transform: `translateY(100%)` }
    });

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
              <PlayerList />
            </DialogBody>
            <DialogBody compact>
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
          <AreaSelect onSelect={() => {}} />
        </DialogBody>
        <DialogBody compact>
          <Button primary>
            Phasendaueranalyse
            <span className="icon-right-open"></span>
          </Button>
        </DialogBody>
      </Dialog>
    </Block>
  ))
  .add("with players", () => (
    <Block padding={[2]}>
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
          <PlayerList />
        </DialogBody>
        <DialogBody compact>
          <Button primary>
            Phasendaueranalyse
            <span className="icon-right-open"></span>
          </Button>
        </DialogBody>
      </Dialog>
    </Block>
  ));
