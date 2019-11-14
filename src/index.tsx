import "./scss/reset.scss";
import "./scss/base.scss";
import "./scss/fontello.scss";

import { ApolloProvider } from "@apollo/react-hooks";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  Route,
  HashRouter as Router,
  Switch,
  useLocation
} from "react-router-dom";

import { useTransition, animated } from "react-spring";

import client from "./client";
import Nav, { NavItem } from "./components/Nav";
import Block from "./components/Section"; //fixme
import GameControlView from "./views/GameControlView";
import GameListView from "./views/GameListView";
import PeriodGraphView from "./views/PeriodGraphView";
import TeamCompareView from "./views/TeamCompareView";
import ScatterGramView from "./views/ScatterGramView";
import TabGroup, { Tab } from "./components/TabGroup";

const routes = [
  {
    label: "Schedule",
    exact: true,
    path: "/",
    render: () => (
      <Block fit scrollable theme="soft">
        <Block padding={[0, 2, 2, 2]}>
          <GameListView />
        </Block>
      </Block>
    )
  },
  {
    label: "Period Graph",
    exact: true,
    path: "/graph",
    render: () => (
      <Block fit>
        <TabGroup scrollable>
          <Tab primary>Ajax</Tab>
          <Tab primary active>
            Feyenoord
          </Tab>
          <Tab primary>Utrecht</Tab>
          <Tab primary>Utrecht</Tab>
          <Tab primary>Utrecht</Tab>
        </TabGroup>
        <Block fit scrollable>
          <ScatterGramView />
          <Block padding={[2]}>
            <PeriodGraphView />
          </Block>
        </Block>
      </Block>
    )
  },
  {
    label: "Team Compare",
    exact: true,
    path: "/team-compare",
    render: () => <TeamCompareView />
  },
  {
    label: "Admin",
    exact: true,
    path: "/admin",
    render: () => (
      <Block fit scrollable>
        <Block padding={[0, 1, 1, 1]}>
          <GameControlView />
        </Block>
      </Block>
    )
  }
];

let prevIndex = 0;
const Main = () => {
  const location = useLocation();
  const index = routes.findIndex(({ path }) => path === location.pathname);
  const reverse = index < prevIndex;
  prevIndex = index;

  const transitions = useTransition(location, location => location.pathname, {
    from: {
      transform: `translate3d(${reverse ? "-100%" : "100%"}, 0, 0)`
    },
    enter: {
      transform: "translate3d(0%, 0, 0)"
    },
    leave: {
      transform: `translate3d(${reverse ? "100%" : "-100%"}, 0, 0)`
    },
    initial: {
      transform: "translate3d(0%, 0, 0)"
    }
  });

  return (
    <>
      {transitions.map(({ item, props, key }) => {
        return (
          <animated.div key={key} style={props} className="animated-route">
            <Switch location={item}>
              {routes.map(({ exact, path, render }) => (
                <Route key={path} exact={exact} path={path} render={render} />
              ))}
            </Switch>
          </animated.div>
        );
      })}
    </>
  );
};

const App = () => (
  <Router>
    <Nav>
      {routes.map(({ path, label }) => (
        <NavItem key={path} to={path}>
          {label}
        </NavItem>
      ))}
    </Nav>
    <div className="body">
      <Main />
    </div>
  </Router>
);

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
