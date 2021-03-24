import React from 'react';
import { useLocation, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import AboutTeam from './components/AboutTeam/aboutTeam';
import Header from './components/header/header';
import LoginRegister from './components/loginRegister/loginRegistration';
import Main from './components/main/main';
import NotFound from './components/notFound/notFound'

function App() {
  return (
    <>
      <Switch>
        <Route path='/404' component={NotFound} />
        <Route path='/registration' component={LoginRegister}/>
        <Route>
          <Header />
          <Switch>
            <Route path='/' exact component={Main}/>
            <Route path='/AboutTeam' component={AboutTeam}/>
          </Switch>
        </Route>
      </Switch>

    </>
  );
}

export default App;
