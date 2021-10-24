import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useState } from 'react';
import './App.css';
import Home from './Home';
import Header from './Header';
import UserProfile from './UserProfile'
import Tablelist from './TableList/Tablelist';
import Tablecreate from './TableList/Tablecreate';
import Game from './Game'

let isLoggedIn = false; //determines whether user profile button should say "Sign In" or "Profile"
//^ make this use state instead

const App = (props) => {
  //Sample Data
  const [tables, setTables] = useState([
    {
        id: 1095329798,
        name: "For Pro Players",
        curPlayers: 3,
        numPlayers: 7,
        startingValue: 100,
        smallBind: 20,
        bigBind: 30,
        status: "close"
    },
    {
        id: 3048768204958,
        name: "Casual",
        curPlayers: 2,
        numPlayers: 9,
        startingValue: 200,
        smallBind: 30,
        bigBind: 50,
        status: "open"
    },
    {
        id: 231507609126,
        name: "playn'chill",
        curPlayers: 1,
        numPlayers: 5,
        startingValue: 300,
        smallBind: 50,
        bigBind: 100,
        status: "open"
    },
    {
        id: 897587021358,
        name: "Something really long to see what happens",
        curPlayers: 6,
        numPlayers: 7,
        startingValue: 500,
        smallBind: 20,
        bigBind: 30,
        status: "open"
    }
  ])  

  //determines whether or not user profile button should be rendered in header
  const [showUserProfileButton, toggleShowUserProfileButton] = useState(true);
  const updateUserProfileButton = (boolean) => {
    if(boolean !== showUserProfileButton) {
      toggleShowUserProfileButton(boolean);
    }
  }

  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <Router>
        <Header showUserProfileButton={showUserProfileButton} isLoggedIn={isLoggedIn}/>
        <Switch>
          {/*home page*/}
          <Route exact path="/">
            <Home title="Home | All In Poker" updateUserProfileButton={updateUserProfileButton}/>
          </Route>

          {/*user profile page*/}
          <Route path="/user">
            <UserProfile title="User Profile | All In Poker" updateUserProfileButton={updateUserProfileButton}/>
          </Route>

          {/*join table page*/}
          <Route exact path="/tablelist">
            <Tablelist title="Join Table | All In Poker" tables={tables} updateUserProfileButton={updateUserProfileButton}/>
          </Route>

          {/*create table page*/}
          <Route exact path="/tablecreate">
            <Tablecreate title="Create Table | All In Poker" updateUserProfileButton={updateUserProfileButton}/>
          </Route>

          {/*game page*/}
          <Route path="/game" render={() => {
            updateUserProfileButton(false)
            return (<Game title="Game | All In Poker"/>);
          }}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
