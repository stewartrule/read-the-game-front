import * as React from "react";

import ButtonGroup, { Button } from "../components/ButtonGroup";
import PlayerItem from "../components/PlayerItem";
import { players } from "../components/PlayerItem/fixture";
import Row, { Cell } from "../components/Row";
import ScatterGram from "../components/ScatterGram";
import { teamFixture } from "../components/ScatterGram/fixture";
import Section from "../components/Section";
import { BrandColor } from "../util/skin";

const ScatterGramView: React.FC = ({}) => {
  return (
    <>
      <ScatterGram team={teamFixture} dark />
      <Row>
        <Cell padding={[2, 4]}>
          <ButtonGroup>
            <Button compact primary>
              Bayern
            </Button>
            <Button compact>B</Button>
          </ButtonGroup>
        </Cell>
      </Row>
      <Row>
        <Cell padding={[1]}>
          <PlayerList />
        </Cell>
      </Row>
    </>
  );
};

const PlayerList = () => (
  <Section>
    {players.slice(0, 5).map((player, i) => (
      <PlayerItem
        key={player.id}
        player={player}
        imageBorder={0}
        valueBorder={3}
        outerBorder={3}
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
);

export default ScatterGramView;
