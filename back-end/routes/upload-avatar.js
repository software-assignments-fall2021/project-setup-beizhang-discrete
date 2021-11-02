const express = require("express");
const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');
const multer = require("multer");
const router = express.Router();

// save file uploads to disk at 'public/uploads'
const uploadDir = './public/uploads';
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

router.post("/upload-avatar", upload.single("avatar"), (req, res, next) => {
    if(true) {

    }
});

module.exports = router;