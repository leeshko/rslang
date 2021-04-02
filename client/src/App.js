import React from "react";
import {
  useLocation,
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

import "./App.css";
import AboutTeam from "./components/AboutTeam/AboutTeam";
import Games from "./components/games/games";
import Header from "./components/header/header";
import LoginRegister from "./components/loginRegister/loginRegistration";
import Main from "./components/main/main";
import NotFound from "./components/notFound/notFound";
import RSLangContext from "./components/context/context";
import { defaultState, reducer } from "./components/reducer/reducer";
function App() {
  const [state, dispatch] = React.useReducer(reducer, defaultState);
  return (
    <RSLangContext.Provider value={{ ...state, dispatch }}>
      <Router>
        <Switch>
          <Route path="/404" component={NotFound} />
          <Route path="/registration" component={LoginRegister} />
          <Route>
            <Header />
            <Switch>
              <Route path="/" exact component={Main} />
              <Route path="/AboutTeam" component={AboutTeam} />
              <Route path="/games" component={Games} />
              <Route render={() => <Redirect to="/404" />} />
            </Switch>
          </Route>
        </Switch>
      </Router>
    </RSLangContext.Provider>
  );
}

export default App;
