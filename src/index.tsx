import * as React from "react";
import * as ReactDOM from "react-dom";

import "./css/reset.css";
import "./css/base.css";
import "./css/fontello.css";

import PercentageBar from "./components/PercentageBar";
import ScoreBoard from "./components/ScoreBoard";
import EpisodeOverview from "./components/EpisodeOverview";

// Fixtures
import { game } from "./components/ScoreBoard/fixture";
import { getPeriods } from "./components/EpisodeOverview/fixture";

ReactDOM.render(
  <div>
    <ScoreBoard game={game} />
    <PercentageBar left={0.3} right={0.7} />
    <EpisodeOverview periods={getPeriods(0.4)} height={280} />
  </div>,
  document.getElementById("root")
);
