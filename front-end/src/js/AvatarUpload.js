import React from 'react';
import '../css/AvatarUpload.css';
import axios from 'axios';
import {useState} from 'react';

const AvatarUpload = (props) => {
    const [user, setUser] = [props.user, props.setUser];
    const [fileToUpload, setFileToUpload] = useState(null);

    const handleFile = e => {
        setFileToUpload(e.target.files[0]);
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const avatarFile = document.querySelector('#avatar-file');
        if(!avatarFile.files[0]) {
            alert("Please select a file!");
            return;
        }

        const formData = new FormData();
        formData.append("avatar", avatarFile.files[0]);
        const res = await axios.post("/uploadAvatar", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(res);
        setUser({
            ...user,
            avatar: res.data.avatar
        });
    }

    return (
        <div className='container'>
            <form className='upload-form' onSubmit={e=>handleSubmit(e)}>
                <input id="avatar-file" name="avatar" type="file" accept="image" onChange={e=>handleFile(e)}/>
                {fileToUpload ? <input className="upload-button" type="submit" value="Upload" /> : null}
            </form>
        </div>
    )
}

export default AvatarUpload;