import "./scss/reset.scss";
import "./scss/base.scss";
import "./scss/fontello.scss";

import * as React from "react";
import * as ReactDOM from "react-dom";

import AreaSelect from "./components/AreaSelect";
import ButtonGroup, { Button } from "./components/ButtonGroup";
import Dialog, { DialogBody, DialogHeader } from "./components/Dialog";
import FieldActivity from "./components/FieldActivity";
import { getActivity } from "./components/FieldActivity/fixture";
import GameCard from "./components/GameCard";
import { games } from "./components/GameCard/fixtures";
import IconButton from "./components/IconButton/IconButton";
import Menu, { MenuItem } from "./components/Menu";
import Nav, { NavItem } from "./components/Nav";
import PeriodGraph from "./components/PeriodGraph";
import { periodGraphValues } from "./components/PeriodGraph/fixture";
import Row, { Cell } from "./components/Row";
import ScatterGram from "./components/ScatterGram";
import { teamFixture } from "./components/ScatterGram/fixture";
import ScoreBoard from "./components/ScoreBoard";
import { game } from "./components/ScoreBoard/fixture";
import Section from "./components/Section";
import SimpleRadarGraph from "./components/SimpleRadarGraph";
import { createStats } from "./components/SimpleRadarGraph/fixture";
import TabGroup, { Tab } from "./components/TabGroup";

ReactDOM.render(
  <div>
    <ScoreBoard game={game} />
    <Section padding={[2, 4]}>
      <h2>Torzeitpunkt</h2>
      <p>Torzeitpunkt</p>
    </Section>
    <Section padding={[1, 3]}>
      <PeriodGraph values={periodGraphValues as any} />
    </Section>
    <Section padding={[2, 5]}>
      <ButtonGroup>
        <Button compact>Gesamt</Button>
        <Button compact active>
          Vergleich
        </Button>
      </ButtonGroup>
    </Section>
    <TabGroup scrollable>
      <Tab primary>
        <strong>All Teams</strong>
      </Tab>
      <Tab primary active>
        <strong>Dortmund</strong>
      </Tab>
      <Tab primary>
        <strong>Bayern</strong>
      </Tab>
      <Tab primary>
        <strong>Bayern</strong>
      </Tab>
      <Tab primary>
        <strong>Bayern</strong>
      </Tab>
    </TabGroup>
    <Section>
      <ScatterGram team={teamFixture} itemRadius={20} />
    </Section>
    <Nav>
      <NavItem>Team</NavItem>
      <NavItem active>Team</NavItem>
      <NavItem>Team</NavItem>
      <NavItem>Team</NavItem>
      <NavItem>Team</NavItem>
      <NavItem>Team</NavItem>
      <NavItem>Team</NavItem>
      <NavItem>Team</NavItem>
      <NavItem>Team</NavItem>
      <NavItem>Team</NavItem>
      <NavItem>Team</NavItem>
    </Nav>
    <TabGroup>
      <Tab primary>
        Heim: <strong>Bayern</strong>
      </Tab>
      <Tab active>
        Ausw: <strong>Dortmund</strong>
      </Tab>
    </TabGroup>
    <Section secondary padding={[3, 3]}>
      <ButtonGroup>
        <Button>Gesamt</Button>
        <Button>Heim</Button>
        <Button active>Vergleich</Button>
      </ButtonGroup>
    </Section>
    <Section secondary>
      <Menu head="Kein Vergleich">
        <MenuItem>Borussia Dortmund</MenuItem>
        <MenuItem>Borussia Mönchengladbach</MenuItem>
        <MenuItem>Eintracht Frankfurt</MenuItem>
        <MenuItem>FC Augsburg</MenuItem>
        <MenuItem>FC Bayern München</MenuItem>
        <MenuItem>FC Ingolstadt 04</MenuItem>
        <MenuItem>FC Schalke 04</MenuItem>
        <MenuItem active>RB Leipzig</MenuItem>
        <MenuItem>Hamburger SV</MenuItem>
      </Menu>
    </Section>
    <TabGroup>
      <Tab primary>
        Heim: <strong>Bayern</strong>
      </Tab>
      <Tab active>
        Ausw: <strong>Dortmund</strong>
      </Tab>
    </TabGroup>
    <Section primary padding={[3, 3]}>
      <ButtonGroup>
        <Button>Gesamt</Button>
        <Button active>Heim</Button>
        <Button>Vergleich</Button>
      </ButtonGroup>
    </Section>
    {[1, 2, 3].map(x => (
      <Row primary key={x} padding={[0, 1, 2, 1]}>
        <Cell center padding={[0, 2]}>
          <SimpleRadarGraph stats={createStats()} />
          <h6 style={{ color: "rgba(255, 255, 255, 0.7)" }}>Dortmund</h6>
        </Cell>
        <Cell center padding={[0, 2]}>
          <SimpleRadarGraph stats={createStats()} />
          <h6 style={{ color: "rgba(255, 255, 255, 0.7)" }}>Dortmund</h6>
        </Cell>
        <Cell center padding={[0, 2]}>
          <SimpleRadarGraph stats={createStats()} />
          <h6 style={{ color: "rgba(255, 255, 255, 0.7)" }}>Dortmund</h6>
        </Cell>
      </Row>
    ))}
    <Section padding={[0, 1, 2, 1]}>
      {games.slice(0, 3).map(game => (
        <GameCard game={game} key={game.start.valueOf()} />
      ))}
    </Section>
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
    <Row dark padding={[1]}>
      <Cell>Zentrales Devensives</Cell>
    </Row>
    <Row>
      <Cell padding={[1]}>
        <FieldActivity teams={[getActivity("intercepts")]} />
      </Cell>
    </Row>
    <Row>
      <Cell padding={[1]}>
        <FieldActivity teams={[getActivity("passes"), getActivity("passes")]} />
      </Cell>
    </Row>
  </div>,
  document.getElementById("root")
);
