import { useRouteMatch, Switch, Route } from "react-router-dom";
import Savanna from "./routes/savanna-g1";
import SprintGame from "./routes/sprint/SprintGame";
import StartPage from "./routes/start/start";

const GamesMain = () => {
  const match = useRouteMatch();

  return (
    // <games.Provider value={}>
    <Switch>
      <Route path={`${match.path}/`} exact component={StartPage} />
      <Route path={`${match.path}/savannah`} component={Savanna} />
      <Route path={`${match.path}/sprint`} component={SprintGame} />
      {/* <Route path={`${match.path}/finish`} component={FinishPage} /> */}
    </Switch>
    // </games.Provider>
  );
};

export default GamesMain;
