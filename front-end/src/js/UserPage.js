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

    // const [friendDetail, setFriendDetail] = useState(null)

    // const getFriendDetail = async (friendUsername) => {
    //     const response = await axios({
    //         method: "post",
    //         url: "/getFriendDetail",
    //         data: {'name' : friendUsername}
    //     }); 
    //     if(response.data) {
    //         setFriendDetail(response.data);
    //     }
    //     else {
    //         console.log("failed to get friend detail");
    //     }
    // }

    useEffect(() => {
        props.updateUserProfileButton(false);
    }, [props]);

    const handleLogout = async () => {
        axios.get("/logout");
        props.setUser(null);
    }

    //Handle friend requests, specify two users involved
    const sendFriendRequest = async (senderUsername, receiverUsername) => {
        const response = await axios({
            method: "post",
            url: "/sendFriendRequest",
            data: {'sender' : senderUsername, 'receiver' : receiverUsername}
          }); 
        alert(response.data);
    }
    const acceptFriendRequest = async (accepterUsername, senderUsername) => {
        const response = await axios({
            method: "post",
            url: "/acceptFriendRequest",
            data: {'accepter' : accepterUsername, 'sender' : senderUsername}
          }); 
        alert(response.data);
    }
    const declineFriendRequest = async (declinerUsername, senderUsername) => {
        const response = await axios({
            method: "post",
            url: "/declineFriendRequest",
            data: {'decliner' : declinerUsername, 'sender' : senderUsername}
          }); 
        alert(response.data);
    }

    if(user) {
        return (
            <div className="UserPage">
                <div className='PhotoName'>
                    {/* Placeholders for photo and username */}
                    <div className='avatar-container'>
                        <img className='ProfilePhoto' 
                            src={`data:image/png;base64,${Buffer.from(user.avatar.data).toString('base64')}`}
                            alt={'Profile Icon'} />
                        <AvatarUpload user={user} setUser={setUser}/>
                    </div>
                    <h1 className='Username'>{user.username}</h1>
                </div>
    
                <h2 className='UserStats'>Your Stats</h2>
                <div className='StatsBox'>
                    <p>Joined since: {user['joined_since'].slice(0,10)}</p>
                    <p>Games played: {user['games_played']}</p>
                    <p>Games won: {user['games_won']}</p>
                </div>
    
                <h3 className='FriendList'>Your Friends</h3>
                <div className='FriendListBox'>
                    {user.friends.map(friendInfo => (
                        <FriendListItem key={friendInfo._id}
                        name={<Button>{friendInfo.username}</Button>}
                        avatar={friendInfo.avatar} status={friendInfo.status}/>
                    ))}
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
    
                <h4 className='NewFriends'>Incoming Friend Requests</h4>
                <div className='FriendRequestBox'>
                    {user.friendRequests.length > 0 ? user.friendRequests.map((friendRequest, i) => (
                        <FriendRequestItem key={i} name={friendRequest.username} avatar={friendRequest.avatar}
                        accept={<Button onClick={() => acceptFriendRequest(user.username, friendRequest.username)}>Accept</Button>}
                        decline={<Button onClick={() => declineFriendRequest(user.username, friendRequest.username)}>Decline</Button>}/>
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
                        <FriendListItem key={aUser._id} name={<Button onClick={() => sendFriendRequest(user.username, aUser.username)}>{aUser.username}</Button>} avatar={aUser.avatar} status={aUser.status}/>
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