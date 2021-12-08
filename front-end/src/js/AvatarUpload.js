import React from 'react';
import '../css/AvatarUpload.css';
import axios from 'axios';
import {useState} from 'react';

//image compression script from:
//https://stackoverflow.com/questions/23945494/use-html5-to-resize-an-image-before-upload/39235724#39235724
const resizeImage = (settings) => {
    var file = settings.file;
    var maxSize = settings.maxSize;
    var reader = new FileReader();
    var image = new Image();
    var canvas = document.createElement('canvas');
    var dataURItoBlob = function (dataURI) {
        var bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ?
            atob(dataURI.split(',')[1]) :
            unescape(dataURI.split(',')[1]);
        var mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var max = bytes.length;
        var ia = new Uint8Array(max);
        for (var i = 0; i < max; i++)
            ia[i] = bytes.charCodeAt(i);
        return new Blob([ia], { type: mime });
    };
    var resize = function () {
        var width = image.width;
        var height = image.height;
        if (width > height) {
            if (width > maxSize) {
                height *= maxSize / width;
                width = maxSize;
            }
        } else {
            if (height > maxSize) {
                width *= maxSize / height;
                height = maxSize;
            }
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(image, 0, 0, width, height);
        var dataUrl = canvas.toDataURL('image/jpeg');
        return dataURItoBlob(dataUrl);
    };
    return new Promise(function (ok, no) {
        if (!file.type.match(/image.*/)) {
            no(new Error("Not an image"));
            return;
        }
        reader.onload = function (readerEvent) {
            image.onload = function () { return ok(resize()); };
            image.src = readerEvent.target.result;
        };
        reader.readAsDataURL(file);
    });
};

const AvatarUpload = (props) => {
    const [user, setUser] = [props.user, props.setUser];
    const [fileToUpload, setFileToUpload] = useState(null);

    const handleFile = e => {
        setFileToUpload(e.target.files[0]);
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const avatarFileElement = document.querySelector('#avatar-file');
        if(!avatarFileElement.files[0]) {
            alert("Please select a file!");
            return;
        }

        //compress image
        const originalFile = avatarFileElement.files[0];
        const compressedFile = await resizeImage({
            file: originalFile,
            maxSize: 500
        });

        const formData = new FormData();
        formData.append("avatar", compressedFile);
        const res = await axios.post("/api/uploadAvatar", formData, {
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