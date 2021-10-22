import React, {useEffect} from 'react'

function UserProfile(props) {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);
    return (
        <div className="UserProfile">
            {/* user profile page */}
            <center><p>user profile page goes here</p></center>
        </div>
    )
}

export default UserProfile;