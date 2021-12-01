const express = require('express');
const multer = require("multer");
const router = express.Router();
const path = require('path');
const {v4: uuidv4} = require("uuid");
const User = require('../schemae/User').User;
const fs = require('fs');
const jwt = require('jsonwebtoken');

// save file uploads to disk at 'public/uploads'
const uploadDir = path.join(__dirname, '../public/uploads');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName) //add id to the beginning to deal with case of identical image names
    },
});
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only images of .png, .jpg and .jpeg format allowed.'));
        }
    }
});

router.post("/uploadAvatar", upload.single("avatar"), (req, res) => {
    const avatar = fs.readFileSync(req.file.path);
    const encoded_avatar = avatar.toString('base64');
    const final_avatar = Buffer.from(encoded_avatar, 'base64');
    const token = req.cookies.Bearer;
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
            if(err) {
                res.send(null);
            } else {
                const query = { _id : decoded._id };
                const setAvatar = { $set: { avatar: final_avatar } };
                User.findOneAndUpdate(query, setAvatar, {new: true}, (err, user) => {
                    if(err) throw err;
                    res.send(user);
                });
            }
        });
    }
    else {
        res.send(null);
    }
});

module.exports = router;