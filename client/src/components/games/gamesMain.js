import { useRouteMatch, Switch, Route } from "react-router-dom";
import SprintGame from "./routes/sprint/SprintGame";
import Sapper from './routes/match';
import Savanna from './routes/savanna-g1';
import AudioChallenge from './routes/audioChallenge-g3/audioChallenge';
import StartPage from './routes/start/start';

const GamesMain = () => {
  const match = useRouteMatch();
    return (
        // <games.Provider value={}>
            <Switch>
                <Route path={`${match.path}/`} exact component={StartPage} />
                <Route path={`${match.path}/savannah`} component={Savanna} />
                <Route path={`${match.path}/sprint`} component={SprintGame} />
                <Route path={`${match.path}/audioChallenge`} component={AudioChallenge} />
                {/* <Route path={`${match.path}/finish`} component={FinishPage} /> */}

                <Route path={`${match.path}/match`} component={Sapper} />

            </Switch>
        // </games.Provider>
    );
};

export default GamesMain;
