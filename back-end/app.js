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
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');

/* ------------------------------- middleware ------------------------------- */
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(cors({
    origin: "http://localhost:3000", //location of react app we're connecting to
    credentials: true,
}));
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
}));
app.use(cookieParser("secret"));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

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

/* ------------------------------- api routes ------------------------------ */

const dbURL = "https://my.api.mockaroo.com";
//mockaroo keys: 428573d0, 1e756d10
const mockarooAPIKey = '428573d0';

//importing User schema
const User = require('./schemae/User').User;
// const dbURL = *mongodb atlas api url*
// mongoose.connect(api, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, () => {
//     console.log("Mongoose is connected.");
// });

/* -------------------------- TODO: get/join table -------------------------- */

/* --------------------------- TODO: create table --------------------------- */

/* ---------------------------- TODO: add friend ---------------------------- */

/* ----------------------------- get friend list ---------------------------- */
const mockFriendListAPI = "/friendList.json";
app.get("/friendList", (req, res) => {
    axios.get(`${dbURL}${mockFriendListAPI}?key=${mockarooAPIKey}`)
    .then(axiosResponse => {
        res.send(axiosResponse.data);
    }).catch(err => {
        console.log(err);
    });
});

/* --------------------------- get all users list --------------------------- */
const mockAllUsersListAPI = "/allUsersList.json";
app.get("/allUsersList", (req, res) => {
    axios.get(`${dbURL}${mockAllUsersListAPI}?key=${mockarooAPIKey}`)
    .then(axiosResponse => {
        res.send(axiosResponse.data);
    }).catch(err => {
        console.log(err);
    });
});

/* ------------------------------ upload avatar ----------------------------- */
app.post("/uploadAvatar", upload.single("avatar"), (req, res) => {
    // const query = { "_id" : req.body._id };
    // const setAvatar = { $set: { avatar: '/uploads' + req.file.filename } };
    // User.findOneAndUpdate(query, setAvatar, async (err, user) => {
    //     if(err) throw err;
    //     res.send(user.avatar)
    // });
    res.send('https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg')
});

/* ----------------------------- authentication ----------------------------- */
// const authenticate = (req, res, next) => {
//     passport.authenticate("local", (err, user, info) => {
//         if (err) throw err;
//         if (!user) res.send(false);
//         else {
//             req.logIn(user, err => {
//                 if (err) throw err;
//                 res.send(true);
//                 console.log(req.user);
//             });
//         }
//     })(req, res, next);
// }

/* -------------------------------- get user -------------------------------- */
app.get("/user", (req, res) => {
    res.send(req.user);
});

/* ---------------------------------- login --------------------------------- */
const mockLoginAPI = "/login.json";
app.post("/login", (req, res, next) => {
    //authenticate(req, res, next);
    //const username = req.body.username, password = req.body.password;
    axios.post(`${dbURL}${mockLoginAPI}?key=${mockarooAPIKey}`)
    .then(axiosResponse => {
        res.send(axiosResponse.data);
    }).catch(err => {
        console.log(err);
    });
});

/* ----------------------------- create account ----------------------------- */
const mockSignUpAPI = "/createAccount.json";
app.post("/signUp", (req, res, next) => {
    // User.findOne({username: req.body.username}, async (err, user) => {
    //     if (err) throw err;
    //     if (user) {
    //         res.send(false);
    //     }
    //     else {
    //         const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //         const newUser = new User({
    //             username: req.body.username,
    //             password: hashedPassword,
    //             list: []
    //         });
    //         await newUser.save();
    //         authenticate(req, res, next);
    //     }
    // });

    //should do client-side validation for these and confirmPassword
    const username = req.username, password = req.password;
    axios.post(`${dbURL}${mockSignUpAPI}?key=${mockarooAPIKey}`)
    .then(axiosResponse => {
        res.send(axiosResponse.data);
    }).catch(err => {
        console.log(err);
    });
});

/* --------------------------------- logout --------------------------------- */
app.get("/logout", function(req, res){
     req.logout();
     res.redirect("/");
});

/* ------------------------------ default route ----------------------------- */
app.get('*', (req, res) => {
    //res.sendFile(path.join(__dirname, '../front-end/build/index.html'));
    res.sendFile(path.join(__dirname, '../front-end/public/index.html'));
});

module.exports = app;