import React from 'react';
import '../css/AvatarUpload.css';

const AvatarUpload = (props) => {
    return (
        <div className='container'>
            <form className='upload-form' action={"/uploadAvatar"} method="POST" encType="multipart/form-data">
                <input name="avatar" type="file" accept="image"/>
                <input type="submit" value="Upload" />
            </form>
        </div>
    )
}

export default AvatarUpload;