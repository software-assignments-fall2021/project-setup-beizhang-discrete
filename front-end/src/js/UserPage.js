import React, {useEffect, useState} from 'react';
import '../css/UserPage.css';
import Button from 'react-bootstrap/Button';
import {Modal} from 'react-bootstrap';
import { Redirect } from 'react-router';
import AvatarUpload from './AvatarUpload';
const axios = require('axios');

//A row in friend list
const FriendListItem = (props) => {
    return(
        <div className='FriendItem'>
            <img className='FriendPhoto' src={props.avatar} alt={'Friend'} />
            <p className='FriendName'>{props.username}</p>
            <p className='FriendStatus'>{props.status}</p>
        </div>
    )
}

const FriendRequestItem = (props) => {
    return(
        <div className='FriendRequestItem'>
            <img className='FriendPhoto' src={props.avatar} alt={'Friend'} />
            <p className='FriendName'>{props.username}</p>
            <p className='AcceptButton'>{props.accept}</p>
            <p className='DeclineButton'>{props.decline}</p>
        </div>
    )
}

const UserPage = (props) => {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);
    const [showModal, setModal] = useState(false)
    const openModal = () => {
        getAllUsers();
        setModal(true)
    }
    const closeModal = () => setModal(false)
    
    const [usernameToSearch, setSearchUsername] = useState('');

    const user = props.user;
    const [allUsersList, setAllUsersList] = useState([]); //GET THIS FROM API

    const getAllUsers = async () => {
        const response = await axios({
            method: "post",
            url: "/userSearch",
            data: {'searched' : usernameToSearch}
        }); 
        if(response.data) {
            setAllUsersList(response.data);
        }
        else {
            console.log("failed to get all users");
        }
    }

    useEffect(() => {
        props.updateUserProfileButton(false);
    }, [props]);

    const handleLogout = async () => {
        axios.get("/logout");
        props.setUser(null);
    }

    //Implement in DB Sprint
    const sendFriendRequest = async (senderID, receiverID) => {
        const response = await axios({
            method: "post",
            url: "/sendFriendRequest",
            data: {'senderID' : senderID, 'receiverID' : receiverID}
          }); 
        alert(response);
    }
    if(user) {
        return (
            <div className="UserPage">
                <div className='PhotoName'>
                    {/* Placeholders for photo and username */}
                    <div className='avatar-container'>
                        <img className='ProfilePhoto' src={user.avatar} alt={'Profile Icon'} />
                        <AvatarUpload/>
                    </div>
                    <h1 className='Username'>{user.username}</h1>
                </div>
    
                <h2 className='UserStats'>User Stats</h2>
                <div className='StatsBox'>
                    <p>Joined since: {user['joined_since'].slice(0,10)}</p>
                    <p>Games played: {user['games_played']}</p>
                    <p>Games won: {user['games_won']}</p>
                </div>
    
                <h3 className='FriendList'>Friend List</h3>
                <div className='FriendListBox'>
                    {user.friends.map(friendInfo => (
                        <FriendListItem key={friendInfo._id} name={<Button>{friendInfo.username}</Button>} avatar={friendInfo.avatar} status={friendInfo.status}/>
                    ))}
                </div>
    
                <h4 className='NewFriends'>New Friends</h4>
                <div className='FriendRequestBox'>
                    {user.friendRequests.length > 0 ? user.friendRequests.map(friendRequest => (
                        <FriendRequestItem name={friendRequest.username} avatar={friendRequest.avatar}
                        accept={<Button>Accept</Button>} decline={<Button>Decline</Button>}/>
                    )) : <p>No Friend Requests</p>}
                </div>
    
                <div className='AddFriend'>
                    <h4>Add Friend</h4>
                    <form className="friendSearch" onSubmit={(event) => {
                            openModal();
                            event.preventDefault(); /*prevent page reload*/
                        }}>
                        <input type="SearchUsername" placeholder={'Username'} onChange={(e) => setSearchUsername(e.target.value)}/> 
                        <Button onClick={openModal}>
                            Search
                            </Button>
                    </form>
                </div>
    
                <Modal show={showModal} onHide={() => closeModal()} >
                    <Modal.Header>
                    <Modal.Title>
                    <p>
                    Users matching '{usernameToSearch}'
                    </p>
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {/*filter all users by those whose names match the one in the search box*/}
                    {allUsersList.map(aUser => (
                        <FriendListItem key={aUser._id} username={<Button onClick={() => sendFriendRequest(user._id, aUser._id)}>{aUser.username}</Button>} avatar={aUser.avatar} status={aUser.status}/>
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => closeModal()}>
                    Close
                    </Button>
                    </Modal.Footer>
                </Modal>
    
                <Button className="logout" onClick={() => handleLogout()}>Log Out</Button>
            </div>
        )
    }
    else {
        return (
            <Redirect to="/login"/>
        )
    }
}

export default UserPage;