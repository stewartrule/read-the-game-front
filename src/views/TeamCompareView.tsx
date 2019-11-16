import * as React from "react";
import { useState } from "react";

import ButtonGroup, { Button } from "../components/ButtonGroup";
import ApolloErrorMessage from "../components/Error/ApolloErrorMessage";
import Row, { Cell } from "../components/Row";
import Block from "../components/Block";
import SimpleRadarGraph from "../components/SimpleRadarGraph";
import TabGroup, { Tab } from "../components/TabGroup";
import { useTeamCompareQuery, useTeamUpdatedSubscription } from "../graph/team";
import { TeamCompare_teams as RawTeam } from "../graph/types/TeamCompare";
import { chunk } from "../util/array";
import { ValidKeyOf } from "../util/types";

type ValidTeamKey = ValidKeyOf<RawTeam, number>;

const maxOf = (teams: RawTeam[], key: ValidTeamKey): number =>
  teams.reduce((max: number, team: RawTeam) => {
    return team[key] > max ? team[key] : max;
  }, 0);

const getStats = (teams: RawTeam[]) => {
  const keys: ValidTeamKey[] = [
    "shotCount",
    "hitCount",
    "passCount",
    "interceptCount",
    "involvedPlayerCount",
    "averageStrength"
  ];

  const keysWithMax = keys.map(key => {
    return {
      max: maxOf(teams, key),
      key
    };
  });

  return teams.map(team => {
    return {
      id: team.id,
      name: team.name,
      stats: keysWithMax.map(({ key, max }) => ({
        label: key,
        value: team[key] * (1 / max)
      }))
    };
  });
};

const TeamCompareView: React.FC = ({}) => {
  const [tab, setTab] = useState(0);
  const { data, loading, error } = useTeamCompareQuery();

  useTeamUpdatedSubscription();

  if (error) {
    return (
      <ApolloErrorMessage
        file={__filename}
        error={error}
        message="Could not load team compare"
      />
    );
  }

  if (loading || !data) {
    return <Block theme="primary" padding={[10, 3]}></Block>;
  }

  const rows = chunk(getStats(data.teams), 3);

  const theme = tab === 0 ? "primary" : "secondary";

  return (
    <Block fit>
      <TabGroup>
        <Tab primary onClick={() => setTab(0)}>
          Gesamt
        </Tab>
        <Tab onClick={() => setTab(1)}>Bayern</Tab>
      </TabGroup>
      <Block theme={theme} padding={[3, 3, 0, 3]}>
        <ButtonGroup>
          <Button compact>Gesamt</Button>
          <Button compact active>
            Heim
          </Button>
          <Button compact>Vergleich</Button>
        </ButtonGroup>
      </Block>
      <Block fit scrollable theme={theme} padding={[3, 0, 0, 0]}>
        {rows.map(cells => (
          <Row
            theme={theme}
            padding={[0, 1, 2, 1]}
            key={cells.map(({ id }) => id).join("_")}
          >
            {cells.map(({ id, stats, name }) => (
              <Cell center padding={[0, 2]} key={id}>
                <SimpleRadarGraph
                  stats={stats}
                  color={id == "4" ? [30, 30, 30] : [255, 255, 255]}
                />
                <h6 style={{ color: "rgba(255, 255, 255, 0.7)" }}>{name}</h6>
              </Cell>
            ))}
          </Row>
        ))}
      </Block>
    </Block>
  );
};

export default TeamCompareView;
