/* --------------------------------- imports -------------------------------- */
const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const multer = require("multer");
require("dotenv").config({ silent: true });
const morgan = require("morgan");
const axios = require('axios');

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

/* ----------------------------------- api ---------------------------------- */

const dbURL = "https://my.api.mockaroo.com";
//mockaroo keys: 428573d0, 1e756d10
const mockarooAPIKey = '1e756d10';

const mockFriendListAPI = "/friendList.json";
app.get("/friendList", (req, res) => {
    axios.get(`${dbURL}${mockFriendListAPI}?key=${mockarooAPIKey}`)
    .then(axiosResponse => {
        res.send(axiosResponse.data);
    }).catch(err => {
        console.log(err);
    });
});

const mockAllUsersListAPI = "/allUsersList.json";
app.get("/allUsersList", (req, res) => {
    axios.get(`${dbURL}${mockAllUsersListAPI}?key=${mockarooAPIKey}`)
    .then(axiosResponse => {
        res.send(axiosResponse.data);
    }).catch(err => {
        console.log(err);
    });
});


//importing User schema
const User = require('./schemae/User').User;
// const dbURL = *mongodb atlas api url*
// mongoose.connect(api, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, () => {
//     console.log("Mongoose is connected.");
// });

app.post("/uploadAvatar", upload.single("avatar"), (req, res) => {
    // const query = { "_id" : req.body._id };
    // const setAvatar = { $set: { avatar: '/uploads' + req.file.filename } };
    // User.findOneAndUpdate(query, setAvatar, async (err, user) => {
    //     if(err) throw err;
    //     res.send(user.avatar)
    // });
    res.send('https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg')
});

const mockLoginAPI = "/login.json";
app.post("/login", (req, res) => {
    const username = req.body.username, password = req.body.password;
    axios.post(`${dbURL}${mockLoginAPI}?key=${mockarooAPIKey}`)
    .then(axiosResponse => {
        res.send(axiosResponse.data);
    }).catch(err => {
        console.log(err);
    });
});

const mockSignUpAPI = "/createAccount.json";
app.post("/signUp", (req, res) => {
    const username = req.body.username, password = req.body.password, confirmPassword = req.body.confirmPassword;
    axios.post(`${dbURL}${mockSignUpAPI}?key=${mockarooAPIKey}`)
    .then(axiosResponse => {
        res.send(axiosResponse.data);
    }).catch(err => {
        console.log(err);
    });
});

module.exports = app;