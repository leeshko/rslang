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
import Games from "./components/games/Games";
import Header from "./components/header/Header";
import LoginRegister from "./components/loginRegister/LoginRegistration";
import Main from "./components/main/Main";
import NotFound from "./components/notFound/NotFound";
import RSLangContext from "./components/context/context";
import { defaultState, reducer } from "./components/reducer/reducer";
import EBook from "./components/eBook/EBook";
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
              <Route path="/eBook" component={EBook} />
              <Route render={() => <Redirect to="/404" />} />
            </Switch>
          </Route>
        </Switch>
      </Router>
    </RSLangContext.Provider>
  );
}

export default App;
