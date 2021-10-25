import React, {useEffect} from 'react';
import './UserPage.css';
import Button from 'react-bootstrap/Button';

const FriendListItem= (props) => {
    return(
        <div className='FriendItem'>
            <img className='FriendPhoto' src={'./profileicon.png'} alt={'Friend Photo'} />
            <p className='FriendName'>{props.name}</p>
            <p className='FriendStatus'>{props.status}</p>
            <Button>Invite</Button>
        </div>
    )
}

function UserPage(props) {
    
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);

    return (
        <div className="UserPage">

            <div className='PhotoName'>
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
                <FriendListItem name={<Button>Owen</Button>} status='Playing'/>
                <FriendListItem name={<Button>Thomas</Button>} status='Online'/>
                <FriendListItem name={<Button>Eric</Button>} status='Away'/>
                <FriendListItem name={<Button>Ben</Button>} status='Offline'/>
                <FriendListItem name={<Button>Oscar</Button>} status='Offline'/>
            </div>

            <div className='AddFriend'>
                <h4>Add Friend</h4>
                <form>
                    <input type="SearchUsername" placeholder={'Username'}/>
                    <input type='submit' value='Search'/>
                </form>
            </div>
        </div>
    )
}

export default UserPage;