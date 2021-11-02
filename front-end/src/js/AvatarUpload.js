import React, { useEffect } from 'react';
import '../css/AvatarUpload.css';

const AvatarUpload = (props) => {
    return (
        <div className='container'>
            <form className='upload-form' action="/upload-avatar" method="POST" enctype="multipart/form-data">
                <input name="avatar" type="file" />
                <input type="submit" value="Upload" />
            </form>
        </div>
    )
}

export default AvatarUpload;