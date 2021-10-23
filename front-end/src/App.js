import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
//import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Header from './Header';
import UserProfile from './UserProfile';
import JoinTable from './JoinTable';
import CreateTable from './CreateTable';

//boolean that determines whether or not User Profile button appear in header.
//will depend on to-be-implemented logic (e.g. disappears on User Profile page)
let showUserProfileButton = true;
let isLoggedIn = false;

const App = (props) => {
  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <Router>
        <Header showUserProfileButton={showUserProfileButton} isLoggedIn={isLoggedIn}/>
        <Switch>
          {/*home page*/}
          <Route exact path="/">
            <Home title="Home | All In Poker"/>
          </Route>

          {/*user profile page*/}
          <Route path="/user">
            <UserProfile title="User Profile | All In Poker"/>
          </Route>

          {/*join table page*/}
          <Route path="/join">
            <JoinTable title="Join Table | All In Poker"/>
          </Route>

          {/*create table page*/}
          <Route path="/create">
            <CreateTable title="Create Table | All In Poker"/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
