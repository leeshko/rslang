import React from "react";
import {
  useLocation,
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

import "./App.css";
import AboutApp from './components/aboutApp/aboutApp';
import Footer from './components/footer/footer';
import GamesMain from './components/games/gamesMain';
import AboutTeam from "./components/AboutTeam/aboutTeam";
import Header from "./components/header/header";
import LoginRegister from "./components/loginRegister/loginRegistration";
import Main from "./components/main/main";
import NotFound from "./components/notFound/notFound";
import RSLangContext from "./components/context/context";
import { defaultState, reducer } from "./components/reducer/reducer";
import EBook from "./components/eBook/EBook";
import Dictionary from "./components/dictionary/Dictionary";

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
              <Route path="/AboutApp" component={AboutApp} />
              <Route path="/games" component={GamesMain} />
              <Route path="/eBook" component={EBook} />
              <Route path="/dictionary" component={Dictionary} />
              <Route render={() => <Redirect to="/404" />} />
            </Switch>
            <Footer />
          </Route>
        </Switch>
      </Router>
    </RSLangContext.Provider>
  );
}

export default App;
