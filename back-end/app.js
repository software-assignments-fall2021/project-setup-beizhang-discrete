//prof's example: https://github.com/nyu-software-engineering/express-js-starter-app/blob/master/app.js

const express = require("express");
const app = express();
const path = require("path");

// middleware imports
const multer = require("multer");
const axios = require("axios");
require("dotenv").config({ silent: true });
const morgan = require("morgan");

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static("public"));

// save file uploads to disk at 'public/uploads'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads")
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname)
        const basenameWithoutExtension = path.basename(file.originalname, extension)
        const newName = `${basenameWithoutExtension}-${Date.now()}${extension}`
        cb(null, newName)
    },
});
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
    res.send("hullo")
});

module.exports = app;