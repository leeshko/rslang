import { useRouteMatch, Switch, Route} from 'react-router-dom';
import Sapper from './routes/match';
import Savanna from './routes/savanna-g1';
import StartPage from './routes/start/start';

const GamesMain = () => {
    const match = useRouteMatch();

    return (
        // <games.Provider value={}>
            <Switch>
                <Route path={`${match.path}/`} exact component={StartPage} />
                <Route path={`${match.path}/savannah`} component={Savanna} />
                <Route path={`${match.path}/match`} component={Sapper} />
            </Switch>
        // </games.Provider>
    );
};

export default GamesMain;