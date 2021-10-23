import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Home from './Home';
import Header from './Header';
import UserProfile from './UserProfile'
import Tablelist from './TableList/Tablelist';
import Tablecreate from './TableList/Tablecreate';

let showUserProfileButton = true; //determines whether or not user profile buttons should be rendered in header
let isLoggedIn = false; //determines whether user profile button should say "Sign In" or "Profile"

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
          <Route path="/tablelist">
            <Tablelist title = "Join Table | All In Poker"/>
          </Route>

          {/*create table page*/}
          <Route path="/tablecreate">
            <Tablecreate title = "Create Table | All In Poker"/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
