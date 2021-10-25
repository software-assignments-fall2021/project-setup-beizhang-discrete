import React, {useEffect, useState} from 'react';
import './UserProfile.css';
import Button from 'react-bootstrap/Button';
import {Modal} from 'react-bootstrap'

//A row in friend list
const FriendListItem= (props) => {
    return(
        <div className='FriendItem'>
            <img className='FriendPhoto' src={'./profileicon.png'} alt={'Friend Photo'} />
            <p className='FriendName'>{props.name}</p>
            <p className='FriendStatus'>{props.status}</p>
        </div>
    )
}

const UserProfile = (props) => {
    const [showModal, setModal] = useState(false)
    const openModal = () => setModal(true)
    const closeModal = () => setModal(false)
    
    const [usernameToSearch, setSearchUsername] = useState('')
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);

    return (
        <div className="UserProfile">

            <div className='PhotoName'>
                {/* Placeholders for photo and username */}
                <img className='ProfilePhoto' src={'./profileicon.png'} alt={'Profile Icon'} />
                <h1 className='Username'>Username</h1>
            </div>

            <h2 className='UserStats'>User Stats</h2>
            <div className='StatsBox'>
                <p>Joined since: {props.datejoined}</p>
                <p>Games played: {props.gamesplayed}</p>
                <p>Games won: {props.gameswon}</p>
            </div>

            <h3 className='FriendList'>Friend List</h3>
            <div className='FriendListBox'>
                {/* Hard-coded friends */}
                <FriendListItem name={<Button>Owen</Button>} status='Playing'/>
                <FriendListItem name={<Button>Thomas</Button>} status='Online'/>
                <FriendListItem name={<Button>Eric</Button>} status='Away'/>
                <FriendListItem name={<Button>Ben</Button>} status='Offline'/>
                <FriendListItem name={<Button>Oscar</Button>} status='Offline'/>
            </div>

            <div className='AddFriend'>
                <h4>Add Friend</h4>
                <form>
                    <input type="SearchUsername" placeholder={'Username'} onChange={(e) => setSearchUsername(e.target.value)}/> 
                    <Button onClick={()=>{
                        //search for users here on backend
                        openModal()
                        }}>
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

export default UserProfile;