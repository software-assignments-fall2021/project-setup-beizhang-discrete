/* --------------------------------- imports -------------------------------- */
require('dotenv').config()
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const morgan = require('morgan');
require("dotenv").config({ silent: true });
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const server = require('http').Server(app);
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
});

/* ------------------------------- middleware ------------------------------- */
//app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "public")));
// app.use(cors({
//     origin: "http://localhost:3000", //location of react app we're connecting to
//     credentials: true,
// }));
app.use(cors());
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
}));
app.use(cookieParser("secret"));

/* ------------------------------ chat sockets ------------------------------ */
io.on('connection', socket => {
    const handshakeData = socket.request;
    const room = handshakeData._query.id;

    socket.join(room);
    console.log(socket.id, 'has connected from room', room);

    socket.on("sendMessage", message => {
        console.log(message);
        socket.broadcast.to(room).emit("newMessage", {...message, author:"them"});
    });
});

/* ------------------------------- api routes ------------------------------ */
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

/* ------------------------------ friend routes ----------------------------- */
const addFriendRoutes = require('./routes/addFriendRoutes');
app.use(addFriendRoutes);

/* --------------------------- table routes --------------------------- */
const tableRoutes = require('./routes/tableRoutes');
app.use(tableRoutes);

/* ------------------------------ default route ----------------------------- */
app.get('*', (req, res) => {
    //res.sendFile(path.join(__dirname, '../front-end/build/index.html'));
    res.sendFile(path.join(__dirname, '../front-end/public/index.html'));
});

module.exports = server;