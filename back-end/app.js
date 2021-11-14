/* --------------------------------- imports -------------------------------- */
require('dotenv').config()
const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
require("dotenv").config({ silent: true });
const morgan = require("morgan");
const axios = require('axios');
const cors = require('cors');
const cookieParser = require('cookie-parser');
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

/* ------------------------------- api routes ------------------------------ */

const mockarooURL = "https://my.api.mockaroo.com";
//mockaroo keys: 428573d0, 1e756d10
const mockarooAPIKey = '428573d0';
const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@all-in-poker.bsbwv.mongodb.net/allInPoker?retryWrites=true&w=majority`;
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Mongoose is connected.");
}).catch(err => {
    console.log("Unable to connect to database:", err);
});

/* ----------------------------- user and authentication ----------------------------- */
const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);

/* ------------------------------ avatar upload ----------------------------- */
const avatarUploadRoutes = require('./routes/avatarUploadRoutes');
app.use(avatarUploadRoutes);

/* ---------------------------- TODO: add friend ---------------------------- */
app.get("/friendRequests", (req, res) => {
    //send back friend requests in db
    res.send('Not implemented without db, should return list of pending friend requests');
})

app.post("/sendFriendRequest", (req, res) => {
    //add new friend request into db
    res.send(`${req.body.senderID} wants to be friend with ${req.body.receiverID}`);
})

/* ----------------------------- get friend list ---------------------------- */
const mockFriendListAPI = "/friendList.json";
app.get("/friendList", (req, res) => {
    axios.get(`${mockarooURL}${mockFriendListAPI}?key=${mockarooAPIKey}`)
    .then(axiosResponse => {
        res.send(axiosResponse.data);
    }).catch(err => {
        console.log(err);
    });
});

/* --------------------------- TODO: create table --------------------------- */
const mockCreateTableAPI = "/createTable.json";
app.post("/createTable", (req, res) => {
    const numPlayers = req.body.numPlayers, tableName = req.body.tableName, startingValue = req.body.startingValue, smallBlind = req.body.smallBlind, bigBlind = req.body.bigBlind;
    axios.post(`${mockarooURL}${mockCreateTableAPI}?key=${mockarooAPIKey}`)
    .then(axiosResponse => {
        res.send(axiosResponse.data);
    }).catch(err => {
        console.log(err);   
    });
});

/* -------------------------- TODO: get/join table -------------------------- */
const mockTableListAPI = "/tableList.json";
app.get("/tableList", (req, res) => {
    axios.get(`${mockarooURL}${mockTableListAPI}?key=${mockarooAPIKey}`)
    .then(axiosResponse => {
        res.send(axiosResponse.data);
    }).catch(err => {
        console.log(err);
    });
});

/* ------------------------------ default route ----------------------------- */
app.get('*', (req, res) => {
    //res.sendFile(path.join(__dirname, '../front-end/build/index.html'));
    res.sendFile(path.join(__dirname, '../front-end/public/index.html'));
});


//Routes for fetching all user list, friend list and user profile info, not yet implemented
// app.get('/allUsersList', (req, res) => {
//     await User.find({}, (err, result) => {
//         if (err) {
//             throw err
//         } else {
//             res.json(result)
//         }       
//     }).lean()
// })

// app.get('/user', (req, res) => {
//     await User.findById(req.query.id, (err, result) => {
//         if (err) {
//             throw err
//         } else {
//             res.json(result)
//         }
//     }).lean()
// })

// app.get('/friendList', (req, res) => {
//     await User.find({_id: {$in : req.query.friends}}, (err, result) => {
//         if (err) {
//             throw err
//         } else {
//             res.json(result)
//         }
//     }).lean()
// })

module.exports = app;