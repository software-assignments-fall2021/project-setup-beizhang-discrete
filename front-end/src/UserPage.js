import React, {useEffect} from 'react';
import './UserPage.css';
/* import profileicon from './profileicon.png'; */

function UserPage(props) {
    
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);

    return (
        <div className="UserProfile">

            <div className='PhotoName'>
            <img className='ProfileIcon' src={'./profileicon.png'} alt={'Profile Icon'} />
            <h1 className='Username'>Username</h1>
            </div>

            <div className='UserStats'>
                <center><h2>User Stats</h2></center>
                <div className='StatsBox'>
                    <p>Joined since: {props.datejoined}</p>
                    <p>Games played: {props.gamesplayed}</p>
                    <p>Games won: {props.gameswon}</p>
                </div>
            </div>
        </div>
    )
}

export default UserPage;