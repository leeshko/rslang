import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import AboutTeam from './components/aboutTeam/aboutTeam';
import AboutApp from './components/aboutApp/aboutApp';
import Header from './components/header/header';
import LoginRegister from './components/loginRegister/loginRegistration';
import Main from './components/main/main';
import NotFound from './components/notFound/notFound'
import Footer from './components/footer/footer';
import GamesMain from './components/games/gamesMain';

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
            <Route path='/about-team' component={AboutTeam}/>
            <Route path='/games' component={GamesMain}/>
            <Route path='/about-app' component={AboutApp}/>
            <Route render={()=>(
                <Redirect to="/404"/>
            )} />
          </Switch>
          <Footer />
        </Route>
      </Switch>

    </>
  );
}

export default App;
