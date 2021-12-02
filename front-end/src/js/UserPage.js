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
            <img className='FriendPhoto' src={`data:image/png;base64,${Buffer.from(props.avatar.data).toString('base64')}`} alt={'Friend'} />
            <p className='FriendName'>{props.name}</p>
            <p className='FriendStatus'>{props.status}</p>
        </div>
    )
}

const FriendRequestItem = (props) => {
    return(
        <div className='FriendRequestItem'>
            <img className='FriendPhoto' src={`data:image/png;base64,${Buffer.from(props.avatar.data).toString('base64')}`} alt={'Friend'} />
            <p className='FriendName'>{props.name}</p>
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

    const user = props.user, setUser = props.setUser;
    const [allUsersList, setAllUsersList] = useState([]); //GET THIS FROM API
    // console.log(user)

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

    // const [showModalFriend, setModalFriend] = useState(false)
    // const openModalFriend = (friendUsername) => {
    //     getFriendDetail(friendUsername);
    //     setModalFriend(true)
    // }
    // const closeModalFriend = () => setModalFriend(false)

    const [friendList, setFriendList] = useState([])
    const getFriendList = async (friendIDs) => {
        const response = await axios({
            method: "post",
            url: "/getFriendList",
            data: {'IDs' : friendIDs}
        }); 
        if(response.data) {
            setFriendList(response.data);
        }
        else {
            console.log("failed to get friends list");
        }
    }

    const [requestList, setRequestList] = useState([])
    const getRequestList = async (requesterIDs) => {
        const response = await axios({
            method: "post",
            url: "/getRequestList",
            data: {'IDs' : requesterIDs}
        }); 
        if(response.data) {
            setRequestList(response.data);
        }
        else {
            console.log("failed to get friend request List");
        }
    }

    useEffect(() => {
        if (user) {
            getFriendList(user.friends);
            getRequestList(user.friendRequests);
        }
    }, [user]);

    useEffect(() => {
        props.updateUserProfileButton(false);
    }, [props]);

    const handleLogout = async () => {
        axios.get("/logout");
        props.setUser(null);
    }

    //Handle friend requests, specify two users involved
    const sendFriendRequest = async (senderID, receiverID) => {
        const response = await axios({
            method: "post",
            url: "/sendFriendRequest",
            data: {'sender' : senderID, 'receiver' : receiverID}
          }); 
        alert(response.data);
    }
    const acceptFriendRequest = async (accepterID, senderID) => {
        const response = await axios({
            method: "post",
            url: "/acceptFriendRequest",
            data: {'accepter' : accepterID, 'sender' : senderID}
          }); 
        alert(response.data);
    }
    const declineFriendRequest = async (declinerID, senderID) => {
        const response = await axios({
            method: "post",
            url: "/declineFriendRequest",
            data: {'decliner' : declinerID, 'sender' : senderID}
          }); 
        alert(response.data);
    }

    if(user) {
        return (
            <div className="UserPage">
                <h1 className='Username'>{user.username}</h1>
                <div className='PhotoName'>
                    <div className='avatar-container'>
                        <img className='ProfilePhoto' 
                            src={`data:image/png;base64,${Buffer.from(user.avatar.data).toString('base64')}`}
                            alt={'Profile Icon'} />
                        <AvatarUpload user={user} setUser={setUser}/>
                    </div>
                </div>
                <div className="section-container">
                    <div className='info-box'>
                        <h4 className='UserStats'>Stats</h4>
                        <p>Joined since: {user['joined_since'].slice(0,10)}</p>
                        <p>Games played: {user['games_played']}</p>
                        <p>Games won: {user['games_won']}</p>
                    </div>
                </div>
    
                <div className="section-container">
                    <div className='info-box'>
                        <h4 className='FriendList'>Friends</h4>
                        {user.friends ? friendList.map(friend => (
                            <FriendListItem key={friend._id} name={<span className="button">{friend.username}</span>} avatar={friend.avatar} status={friend.status}/>
                        )) : <p>No friend... yet</p>}
                    </div>
                </div>

                <div className="section-container">
                    <div className='info-box'>
                        <h4 className='NewFriends'>Incoming Requests</h4>
                        {user.friendRequests.length > 0 ? requestList.map((requester, i) => (
                            <FriendRequestItem key={i} name={requester.username} avatar={requester.avatar}
                            accept={<span className="button" onClick={() => acceptFriendRequest(user._id.toString(), requester._id.toString())}>Accept</span>}
                            decline={<span className="button" onClick={() => declineFriendRequest(user._id.toString(), requester._id.toString())}>Decline</span>}/>
                        )) : <p>None... yet</p>}
                    </div>
                </div>
    
                <div className='AddFriend'>
                    <h4>Add Friend</h4>
                    <form className="friendSearch" onSubmit={(event) => {
                            openModal();
                            event.preventDefault(); /*prevent page reload*/
                        }}>
                        <input id="user-search-box" type="SearchUsername" placeholder={'Search by username...'} onChange={(e) => setSearchUsername(e.target.value)}/> 
                        <span className="search-button button" onClick={openModal}>
                            Search
                            </span>
                    </form>
                </div>

                {/* <Modal show={showModalFriend} onHide={() => closeModalFriend()} >
                    <Modal.Header>
                    <Modal.Title>
                    <p>
                    {friendDetail.username}
                    </p>
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div className='PhotoName'>
                        <div className='avatar-container'>
                            <img className='ProfilePhoto' 
                                src={`data:image/png;base64,${Buffer.from(friendDetail.avatar.data).toString('base64')}`}
                                alt={'Profile Icon'} />
                        </div>
                        <h1 className='Username'>{user.username}</h1>
                    </div>
        
                    <h2 className='UserStats'>Friend Stats</h2>
                    <div className='StatsBox'>
                        <p>Joined since: {friendDetail.joined_since.slice(0,10)}</p>
                        <p>Games played: {friendDetail.games_played}</p>
                        <p>Games won: {friendDetail.games_won}</p>
                    </div>

                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => closeModal()}>Close</Button>
                    </Modal.Footer>
                </Modal> */}
    
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
                        <FriendListItem key={aUser._id} name={<Button onClick={() => sendFriendRequest(user._id.toString(), aUser._id.toString())}>{aUser.username}</Button>} avatar={aUser.avatar} status={aUser.status}/>
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => closeModal()}>
                    Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                <div className="logout-holder">
                    <div className="logout button" onClick={() => handleLogout()}>Log Out</div>
                </div>
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