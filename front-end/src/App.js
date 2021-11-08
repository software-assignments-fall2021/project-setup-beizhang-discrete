import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useState } from 'react';
import './App.css';
import Home from './js/Home';
import Header from './js/Header';
import Login from './js/Login'
import Tablelist from './js/Tablelist';
import Tablecreate from './js/Tablecreate';
import Game from './js/Game'
import UserPage from './js/UserPage';
const axios = require('axios');

const App = (props) => {
  const [user, setUser] = useState({});
  
  /* generic helper function to fetch data */
  /* 
    api: path of data
    setState: function to modify relevant state variable 
  */
  const fetchData = (path, setState) => {
    axios.get(`/${path}`).then(res => {
      console.log(res.data);
      setState(res.data);
    }).catch(err => {
      console.log(err);
    });
  }

  const [friendList, modifyFriendList] = useState([]);
  const [allUsersList, modifyAllUsersList] = useState([]);
  const [friendRequests, modifyFriendRequests] = useState([]);
  // const [sentFriendRequests, modifySentFriendRequests] = useState([]);

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
        <Header showUserProfileButton={showUserProfileButton} isLoggedIn={user.success}/>
        <Switch>
          {/*home page*/}
          <Route exact path="/">
            <Home title="Home | All In Poker" updateUserProfileButton={updateUserProfileButton}/>
          </Route>

          {/*log in page*/}
          <Route path="/login">
            <Login title="Login | All In Poker" updateUserProfileButton={updateUserProfileButton}
              user={user} setUser={setUser}
            />
          </Route>

          {/*user profile page*/}
          <Route exact path="/user">
            <UserPage title="User Profile | All In Poker" updateUserProfileButton={updateUserProfileButton} 
              user={user} setUser={setUser} friendList={friendList} modifyFriendList={modifyFriendList}
              allUsersList={allUsersList} modifyAllUsersList={modifyAllUsersList}
              friendRequests={friendRequests} modifyFriendRequests={modifyFriendRequests}
              fetchData={fetchData}/>
          </Route>

          {/*join table page*/}
          <Route exact path="/tablelist">
            <Tablelist title="Join Table | All In Poker" updateUserProfileButton={updateUserProfileButton}
              fetchData={fetchData}
            />
          </Route>

          {/*create table page*/}
          <Route exact path="/tablecreate">
            <Tablecreate title="Create Table | All In Poker" updateUserProfileButton={updateUserProfileButton}
              friendList={friendList}
            />
          </Route>

          {/*game page*/}
          <Route path="/game">
            <Game title="Game | All In Poker" updateUserProfileButton={updateUserProfileButton}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
