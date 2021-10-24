import React, {useEffect} from 'react'
import './UserProfile.css';

function UserProfile(props) {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);
    useEffect(() => {
        props.updateUserProfileButton(false);
    }, [props]);
    return (
        <div className="UserProfile">
            {/* user profile page */}
            <center><p>user profile page goes here</p></center>
        </div>
    )
}

export default UserProfile;