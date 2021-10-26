import React, {useEffect, useState} from 'react';
import './UserPage.css';
import Button from 'react-bootstrap/Button';
import {Modal} from 'react-bootstrap'
const axios = require('axios');

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
    
    const mockarooURL = "https://my.api.mockaroo.com/";
    const mockarooAPIKey = '428573d0';

    /* fetching mock user data */
    const mockUserInfoAPI = "userInfo.json";
    const [userInfo, setUserInfo] = useState({
        username: 'Guest',
        avatar: './profileicon.png',
        joined_since: 'N/A',
        games_played: 0,
        games_won: 0
    });
    useEffect(() => {
        async function fetchUserInfo() {
            try {
                const fetchedUserInfo = await axios.get(`${mockarooURL}${mockUserInfoAPI}?key=${mockarooAPIKey}`)
                setUserInfo(fetchedUserInfo[0]);
            } catch (err) {
                console.log(err);
            }
        }
        fetchUserInfo();
    }, []);
    /* end fetching mock user data */

    /* fetching mock friend list data */
    /* each friend object follow this schema: 
    {
        name: String,
        avatar: Image (png),
        status: random choice from [Playing, Online, Away, Offline]
        id: GUID
    }*/
    const mockFriendListAPI = "friendList.json";
    const [friendList, modifyFriendList] = useState([]);
    useEffect(() => {
        async function fetchFriendList() {
            try {
                const fetchedFriendList = await axios.get(`${mockarooURL}${mockFriendListAPI}?key=${mockarooAPIKey}`)
                modifyFriendList(fetchedFriendList);
            } catch (err) {
                console.log(err);
            }
        }
        fetchFriendList();
    }, []);
    /* end fetching mock friend list data */

    return (
        <div className="UserPage">

            <div className='PhotoName'>
                {/* Placeholders for photo and username */}
                <img className='ProfilePhoto' src={userInfo.avatar} alt={'Profile Icon'} />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <h1 className='Username'>{userInfo.username}</h1>
            </div>

            <h2 className='UserStats'>User Stats</h2>
            <div className='StatsBox'>
                <p>Joined since: {userInfo['joined_since']}</p>
                <p>Games played: {userInfo['games_played']}</p>
                <p>Games won: {userInfo['games_won']}</p>
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

            {/* Hardcoded Popup Modal => Needs to be flatlist once backend is implemented */}

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
                <FriendListItem name={<Button>Gary</Button>} status='Playing'/>
                <FriendListItem name={<Button>GaryW</Button>} status='Online'/>
                <FriendListItem name={<Button>GaryVee</Button>} status='Away'/>
                <FriendListItem name={<Button>Gary6152</Button>} status='Offline'/>
                <FriendListItem name={<Button>Garyeee</Button>} status='Offline'/>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => closeModal()}>
                Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UserPage;