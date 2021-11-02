/* --------------------------------- imports -------------------------------- */
const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const multer = require("multer");
require("dotenv").config({ silent: true });
const morgan = require("morgan");

/* ------------------------------- middleware ------------------------------- */
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "public")));

/* ------------------------------ avatar upload ----------------------------- */
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

//importing User schema
const User = require('./schemae/User').User;
// const api = *mongodb atlas api url*
// mongoose.connect(api, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, () => {
//     console.log("Mongoose is connected.");
// });

app.post("/upload-avatar", upload.single("avatar"), (req, res, next) => {
    // const query = { "_id" : req.body._id };
    // const setAvatar = { $set: { avatar: '/uploads' + req.file.filename } };
    // User.findOne(query, setAvatar, async (err, res) => {
    //     if(err) throw err;
    //     res.send('Successfully updated avatar.')
    // });
    res.send('cannot implement yet without database integration')
});

module.exports = app;