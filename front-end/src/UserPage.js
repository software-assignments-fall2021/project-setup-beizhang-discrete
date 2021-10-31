import React, {useEffect, useState} from 'react';
import './UserPage.css';
import Button from 'react-bootstrap/Button';
import {Modal} from 'react-bootstrap';
import { Redirect } from 'react-router';

//A row in friend list
const FriendListItem = (props) => {
    return(
        <div className='FriendItem'>
            <img className='FriendPhoto' src={props.avatar} alt={'Friend'} />
            <p className='FriendName'>{props.name}</p>
            <p className='FriendStatus'>{props.status}</p>
        </div>
    )
}

const UserPage = (props) => {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);
    const [showModal, setModal] = useState(false)
    const openModal = () => setModal(true)
    const closeModal = () => setModal(false)
    
    const [usernameToSearch, setSearchUsername] = useState('');

    const user = props.user;
    const friendList = props.friendList;
    const allUsersList = props.allUsersList;
    
    useEffect(() => {
        props.updateUserProfileButton(false);
    }, [props]);

    if(!user.success) {
        return (
            <Redirect to="/login"/>
        )
    }

    const handleLogout = () => {
        props.setUser({});
        return (<Redirect to="/"/>)
    }

    return (
        <div className="UserPage">

            <div className='PhotoName'>
                {/* Placeholders for photo and username */}
                <img className='ProfilePhoto' src={user.avatar} alt={'Profile Icon'} />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <h1 className='Username'>{user.username}</h1>
            </div>

            <h2 className='UserStats'>User Stats</h2>
            <div className='StatsBox'>
                <p>Joined since: {user['joined_since']}</p>
                <p>Games played: {user['games_played']}</p>
                <p>Games won: {user['games_won']}</p>
            </div>

            <h3 className='FriendList'>Friend List</h3>
            <div className='FriendListBox'>
                {friendList.map(friendInfo => (
                    <FriendListItem key={friendInfo.id} name={<Button>{friendInfo.name}</Button>} avatar={friendInfo.avatar} status={friendInfo.status}/>
                ))}
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
                <Modal.Body></Modal.Body>
                <Modal.Body>
                {/*filter all users by those whose names match the one in the search box*/}
                {allUsersList.filter(
                        user => user.name.toLowerCase().includes(usernameToSearch.toLowerCase())
                    ).map(user => (
                        <FriendListItem key={user.id} name={<Button>{user.name}</Button>} avatar={user.avatar} status={user.status}/>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => closeModal()}>
                Close
                </Button>
                </Modal.Footer>
            </Modal>

            <Button onClick={() => handleLogout()}>Log Out</Button>
        </div>
    )
}

export default UserPage;