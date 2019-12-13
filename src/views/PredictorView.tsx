import * as React from "react";

import AreaSelect from "../components/AreaSelect";
import Block from "../components/Block";
import { Button } from "../components/ButtonGroup";
import Dialog, { DialogBody, DialogHeader } from "../components/Dialog";
import IconButton from "../components/IconButton";
import Overlay from "../components/Overlay";
import PlayerItem from "../components/PlayerItem";
import { players } from "../components/PlayerItem/fixture";
import Predictor, { PositionItemType } from "../components/Predictor";
import { initialState, reducer } from "../components/Predictor/fixture";
import {
  PredictorItemState,
  PredictorItemType
} from "../components/Predictor/types";
import RotaryKnob from "../components/RotaryKnob";
import { BrandColor, FontFamily } from "../util/skin";

const { useEffect, useState, useReducer } = React;

const PlayerList = () => (
  <Block>
    {players.slice(0, 5).map((player, i) => (
      <PlayerItem
        key={player.id}
        player={player}
        outerBorder={3}
        imageBorder={0}
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

const PredictorView: React.FC = ({}) => {
  const range = 60;
  const factor = 1 / range;

  const [playerDialogOpen, setPlayerDialogOpen] = useState(false);
  const openPlayerDialog = () => setPlayerDialogOpen(true);
  const closePlayerDialog = () => setPlayerDialogOpen(false);

  const [latest, setLatest] = useState<PredictorItemType>();

  const [items, dispatch] = useReducer(reducer, initialState);
  const active = items.find(item => item.state === PredictorItemState.active);

  const positionItem: PositionItemType | undefined = items.find(
    (item): item is PositionItemType => item.type === "position"
  );

  const areaCode = positionItem ? positionItem.value : undefined;

  const deactivate = () => dispatch({ type: "deactivate" });

  useEffect(() => {
    active && setLatest(active);
  }, [active]);

  return (
    <div>
      <Predictor
        items={items}
        onChangeDuration={item => {
          dispatch({
            type: "activate",
            item
          });
        }}
        onChangePosition={item => {
          dispatch({
            type: "activate",
            item
          });
        }}
      />

      <Button icon="up-open" onClick={openPlayerDialog}>
        Spieler Dialog / Fixme
      </Button>

      <Overlay onClick={closePlayerDialog} open={playerDialogOpen}>
        <Dialog>
          <DialogHeader>
            <div>
              <h4>Wichtigste spieler</h4>
              <p>Whäle die Länge</p>
            </div>
            <div>
              <IconButton
                icon="cancel"
                margin={[0, 1, 0, 0]}
                onClick={closePlayerDialog}
              />
              <IconButton icon="ok" success />
            </div>
          </DialogHeader>
          <DialogBody>
            <Block padding={[2, 4]}>
              <PlayerList />
            </Block>
          </DialogBody>
          <DialogBody>
            <Button primary icon="right-open">
              Alle Spieler
            </Button>
          </DialogBody>
        </Dialog>
      </Overlay>

      <Overlay
        onClick={deactivate}
        open={!!active && active.type === "duration"}
      >
        <Dialog>
          <DialogHeader>
            <div>
              <h4>Dauer der spielphase</h4>
              <p>Whäle die Länge</p>
            </div>
            <div>
              <IconButton
                icon="cancel"
                margin={[0, 1, 0, 0]}
                onClick={deactivate}
              />
              <IconButton icon="ok" success />
            </div>
          </DialogHeader>
          <DialogBody>
            <Block padding={[0, 4, 2, 4]}>
              {latest && latest.type === "duration" && (
                <RotaryKnob
                  value={latest.value * factor}
                  onStartDrag={() => {}}
                  onDrag={value => {
                    active &&
                      active.type === "duration" &&
                      dispatch({
                        item: active,
                        type: "duration",
                        value: Math.round(value * range)
                      });
                  }}
                  onEndDrag={value => {
                    active &&
                      active.type === "duration" &&
                      dispatch({
                        item: active,
                        type: "duration",
                        value: Math.round(value * range)
                      });
                  }}
                  render={({ center, value }) => (
                    <>
                      <text
                        x={center.x}
                        y={center.y - 16}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        fontFamily={FontFamily.Default}
                        fontWeight="bold"
                        style={{ textAlign: "center" }}
                        fontSize="96px"
                        fill={BrandColor.primary}
                      >
                        {Math.round(value * range).toFixed(1)}
                      </text>
                      <text
                        x={center.x}
                        y={center.y + 40}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        fontFamily={FontFamily.Default}
                        fontWeight="bold"
                        style={{ textAlign: "center" }}
                        fontSize="30px"
                        fill={BrandColor.black}
                      >
                        Sekunden
                      </text>
                    </>
                  )}
                />
              )}
            </Block>
          </DialogBody>
          <DialogBody>
            <Button primary icon="right-open">
              Phasendaueranalyse
            </Button>
          </DialogBody>
        </Dialog>
      </Overlay>
      <Overlay
        onClick={deactivate}
        open={!!active && active.type === "position"}
      >
        <Dialog>
          <DialogHeader>
            <div>
              <h4>{areaCode}</h4>
              <p>Whäle die Länge</p>
            </div>
            <div>
              <IconButton
                icon="cancel"
                margin={[0, 1, 0, 0]}
                onClick={deactivate}
              />
              <IconButton icon="ok" success />
            </div>
          </DialogHeader>
          <DialogBody>
            <Block padding={[2, 6]} fit>
              <AreaSelect
                selectedArea={areaCode}
                onSelect={code => {
                  positionItem &&
                    dispatch({
                      type: "position",
                      value: code,
                      item: positionItem
                    });
                  deactivate();
                }}
              />
            </Block>
          </DialogBody>
          <DialogBody>
            <Button primary icon="right-open">
              Balloberungsanalyse
            </Button>
          </DialogBody>
        </Dialog>
      </Overlay>
    </div>
  );
};

export default PredictorView;
