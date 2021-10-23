import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
//import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Header from './Header';
import UserProfile from './UserProfile'
import Tablelist from './TableList/Tablelist';
import Tablecreate from './TableList/Tablecreate';

//boolean that determines whether or not User Profile button appear in header.
//will depend on to-be-implemented logic (e.g. disappears on User Profile page)
let showUserProfileButton = true;

const App = (props) => {
  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <Router>
        <Header showUserProfileButton={showUserProfileButton} />
        <Switch>
          <Route exact path="/">
            <Home title="Home | All In Poker"/>
          </Route>

          <Route path="/user">
            <UserProfile title="User Profile | All In Poker"/>
          </Route>

          <Route path="/tablelist">
            <Tablelist title = "Table List"/>
          </Route>

          <Route path="/tablecreate">
            <Tablecreate title = "Table Create"/>
          </Route>


        </Switch>
      </Router>
    </div>
  );
}

export default App;
