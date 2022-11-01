import * as React from "react";

import { Button } from "../components/ButtonGroup";
import Card, { CardSection } from "../components/Card";
import Dialog, { DialogBody, DialogHeader } from "../components/Dialog";
import Overlay from "../components/Overlay";
import ApolloErrorMessage from "../components/Error/ApolloErrorMessage";
import {
  useAddShotMutation,
  useGetScheduleQuery,
  useGameUpdatedSubscription
} from "../graph/game";
import {
  GetSchedule_games_awayTeam as AwayTeam,
  GetSchedule_games_homeTeam as HomeTeam,
  GetSchedule_games_awayTeam_players as Player,
  GetSchedule_games as RawGame,
  GetSchedule_shotTypes as ShotType
} from "../graph/types/GetSchedule";

const { useState } = React;

type Team = AwayTeam | HomeTeam;

const GameCardPlaceholder = () => (
  <Card>
    <CardSection padding={[5, 1]} />
  </Card>
);

type PassDialogState = {
  open: boolean;
  data?: {
    player: Player;
    team: Team;
  };
};

type InterceptDialogState = {
  open: boolean;
  data?: {
    player: Player;
    ownTeam: Team;
    otherTeam: Team;
  };
};

const GameListView: React.FC = ({}) => {
  const { data, loading, error } = useGetScheduleQuery();

  const [passDialogState, setPassDialogState] = useState<PassDialogState>({
    open: false
  });
  const [interceptDialogState, setInterceptDialogState] =
    useState<InterceptDialogState>({ open: false });

  if (error) {
    return (
      <ApolloErrorMessage
        error={error}
        file={__filename}
        message="Could not load schedule"
      />
    );
  }

  if (loading) {
    return (
      <>
        {Array.from({ length: 5 }, (_, i) => (
          <GameCardPlaceholder key={i} />
        ))}
      </>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <>
      {data.games.map((game) => (
        <GameControlCard
          game={game}
          shotTypes={data.shotTypes}
          key={game.id}
          onPass={(player, team) => {
            setPassDialogState({
              open: true,
              data: { player, team }
            });
          }}
          onIntercept={(player, ownTeam, otherTeam) => {
            setInterceptDialogState({
              open: true,
              data: { player, ownTeam, otherTeam }
            });
          }}
        />
      ))}

      <Overlay open={passDialogState.open}>
        <Dialog>
          <DialogHeader>
            Add Pass{" "}
            {passDialogState.data &&
              `from ${passDialogState.data.player.lastName}`}{" "}
          </DialogHeader>
          <DialogBody>
            {passDialogState.data && (
              <ul>
                {passDialogState.data.team.players.map((player) => (
                  <li key={player.id}>{player.lastName}</li>
                ))}
              </ul>
            )}
          </DialogBody>
        </Dialog>
      </Overlay>

      <Overlay open={interceptDialogState.open}>
        <Dialog>
          <DialogHeader>Add Intercept from</DialogHeader>
          <DialogBody>
            <div className="table">
              {interceptDialogState.data &&
                interceptDialogState.data.otherTeam.players.map((player) => (
                  <div className="table-row" key={player.id}>
                    <div className="table-cell table-cell--grow table-cell--padded">
                      <strong>{player.lastName}</strong>
                    </div>

                    <div className="table-cell">
                      <Button
                        compact
                        onClick={() => {
                          console.log({
                            ...interceptDialogState.data,
                            interceptedBy: player
                          });
                        }}
                      >
                        Confirm
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </DialogBody>
        </Dialog>
      </Overlay>
    </>
  );
};

const ShotButton: React.FC<{
  game: RawGame;
  team: Team;
  player: Player;
  shotType: ShotType;
  hit: boolean;
}> = ({ game, team, shotType, player, hit, children }) => {
  const [addShot, { loading }] = useAddShotMutation();
  return (
    <Button
      compact
      disabled={loading}
      primary={hit}
      onClick={() => {
        addShot({
          variables: {
            gameId: Number(game.id),
            fromTeamId: Number(team.id),
            fromPlayerId: Number(player.id),
            shotTypeId: Number(shotType.id),
            hit
          }
        });
      }}
    >
      {children}
    </Button>
  );
};

const TeamControl: React.FC<{
  game: RawGame;
  team: HomeTeam | AwayTeam;
  shotTypes: ShotType[];
  onPass: (player: Player) => void;
  onIntercept: (player: Player) => void;
}> = ({ game, team, shotTypes, onPass, onIntercept }) => {
  return (
    <div className="table">
      <div className="table-head">
        <strong>{team.name}</strong>
      </div>
      <div className="table-body">
        {team.players.map((player) => (
          <div key={player.id} className="table-row">
            <div className="table-cell table-cell--grow table-cell--padded">
              <strong>{player.lastName}</strong>
            </div>

            <div className="table-cell">
              <Button
                compact
                onClick={() => {
                  onPass(player);
                }}
              >
                Pass
              </Button>
            </div>

            <div className="table-cell">
              <Button
                compact
                onClick={() => {
                  onIntercept(player);
                }}
              >
                Intercept
              </Button>
            </div>

            <div className="table-cell">
              <Button compact>Offense</Button>
            </div>
            <div className="table-cell">
              <ShotButton
                game={game}
                team={team}
                player={player}
                shotType={shotTypes[0]}
                hit={false}
              >
                Shot
              </ShotButton>
            </div>
            <div className="table-cell">
              <ShotButton
                game={game}
                team={team}
                player={player}
                shotType={shotTypes[0]}
                hit
              >
                Hit
              </ShotButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const GameControlCard: React.FC<{
  game: RawGame;
  shotTypes: ShotType[];
  onPass: (player: Player, team: Team) => void;
  onIntercept: (player: Player, ownTeam: Team, otherTeam: Team) => void;
}> = ({ game, shotTypes, onPass, onIntercept }) => {
  return (
    <Card>
      <CardSection>
        <TeamControl
          game={game}
          team={game.homeTeam}
          shotTypes={shotTypes}
          onPass={(player) => onPass(player, game.homeTeam)}
          onIntercept={(player) =>
            onIntercept(player, game.homeTeam, game.awayTeam)
          }
        />
        <TeamControl
          game={game}
          team={game.awayTeam}
          shotTypes={shotTypes}
          onPass={(player) => onPass(player, game.awayTeam)}
          onIntercept={(player) =>
            onIntercept(player, game.awayTeam, game.homeTeam)
          }
        />
      </CardSection>
    </Card>
  );
};

export default GameListView;
