const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../schemae/User').User;
const jwt = require('jsonwebtoken');
const fs = require("fs");
const path = require("path");
const doesUserExist  = require('../utils/doesUserExist');
const googleAuth = require('../utils/google-utils')
const { body, validationResult } = require('express-validator');

//token lives for 3 days
const maxAge = 3*24*60*60;
const createToken = _id => {
    return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, {
        expiresIn: maxAge
    });
}

/* ---------------------- authentication route handlers --------------------- */
router.post("/login", async (req, res) => {
    const [username, password] = [req.body.username, req.body.password];
    const user = await User.findOne({ username : username });
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            const token = createToken(user._id);
            res.cookie("Bearer", token, { httpOnly: true, maxAge: maxAge*1000 });
            res.json({
                auth: true,
                user: user,
                token: token
            });
        }
        else {
            res.json({
                auth: false,
                message: "Incorrect password."
            });
        }
    }
    else {
        res.json({
            auth: false,
            message: "User not found. Check your username, or register a new account"
        });
    }
});

router.post("/register", body("username").isLength({min: 3}), body("password").isLength({min: 6}), async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.json({
            auth: false,
            message: "Username must be at least 3 characters long, and password must be at least 6."
        });
    }
    const [username, password] = [req.body.username, req.body.password];
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatar = fs.readFileSync(path.join(__dirname, "../public/defaultavatar.png"));
    const encoded_avatar = avatar.toString('base64');
    const final_avatar = Buffer.from(encoded_avatar, 'base64');
    try {
        //if (doesUserExist(username)) {
        if(await User.findOne({ username : username })) {
            res.json({
                auth: false,
                message: 'Username taken',
            })
        } else {
            const newUser = await User.create({
                username: username,
                password: hashedPassword,
                avatar: final_avatar,
                status: "Online",
                friends: [],
                friendRequests: [],
                joined_since: new Date(),
                games_played: 0,
                games_won: 0,
            });
            const token = createToken(newUser._id);
            res.cookie("Bearer", token, { httpOnly: true, maxAge: maxAge*1000 });
            res.json({
                auth: true,
                user: newUser,
                token: token
            });
        }
        // res.json({ user: newUser._id });
    } catch(err) {
        res.json({
            auth: false,
            message: err.toString()
        });
    }
});

router.get("/logout", (req, res) => {
    res.cookie('Bearer', '', { maxAge: 1 });
    res.send('logged out');
});

router.post("/userSearch", async (req, res) => {
    const searched = req.body.searched;
    const users = await User.find({ username: { $regex: '.*' + searched + '.*', $options : 'i'}});
    if(users) {
        res.send(users);
    }
    else {
        res.send(null);
    }
});
router.get("/user", (req, res) => {
    const token = req.cookies.Bearer;
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
            if(err) {
                res.send(null);
            } else {
                const user = await User.findOne({ _id : decoded._id });
                if(user) {
                    res.send(user);
                }
                else {
                    res.send(null);
                }
            }
        });
    }
    else {
        res.send(null);
    }
});

router.post("/changeUsername", async (req, res) => {
    const [username, newUsername, password] = [req.body.username, req.body.newusername, req.body.password];
    const user = User.findOne({username: username})
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            if(doesUserExist(newUsername)) {
                res.json({
                    auth: false,
                    message: 'Username taken'
                })
            } else {
                user.update({username: newUsername})
                const token = createToken(user._id);
                res.cookie("Bearer", token, { httpOnly: true, maxAge: maxAge*1000 });
                res.json({
                    auth: true,
                    user: user,
                    token: token
                });
            }
        }
        else {
            res.json({
                auth: false,
                message: "Incorrect password."
            });
        }
    }
});

router.post("/changePassword", async (req, res) => {
    const [username, newPassword, password] = [req.body.username, req.body.newpassword, req.body.password];
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = User.findOne({username: username})
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            user.update({password: hashedPassword})
            const token = createToken(user._id);
            res.cookie("Bearer", token, { httpOnly: true, maxAge: maxAge*1000 });
            res.json({
                auth: true,
                user: user,
                token: token
            });
            
        }
        else {
            res.json({
                auth: false,
                message: "Incorrect password."
            });
        }
    } 
});

router.post("/googleLogin", async (req, res) => {
    try {
        const response = await googleAuth(req.body.token)
        const {userId, email, fullName, photoUrl} = response;
        const user = await User.findOne({ googleId : userId });
        
        if (user) { // google user exists, logem in
            const token = createToken(user._id);
            res.cookie("Bearer", token, { httpOnly: true, maxAge: maxAge*1000 });
            res.json({
                auth: true,
                user: user,
                token: token
            });
        }
        else { // create account w google info
            const newUser = await User.create({
                googleId: userId,
                email: email,
                username: fullName,
                avatar: photoUrl,
                status: "Online",
                friends: [],
                friendRequests: [],
                joined_since: new Date(),
                games_played: 0,
                games_won: 0,
            });
            const token = createToken(newUser._id);
            res.cookie("Bearer", token, { httpOnly: true, maxAge: maxAge*1000 });
            res.json({
                auth: true,
                user: newUser,
                token: token
            });
        }
    }
    catch (error) {
        res.json({
            auth: false,
            message: "Could not authenticate Google token"
        })
    }
});

router.post("/getFriendList", async (req, res) => {
    const friendIDs = req.body.IDs;
    try {
        const result = await User.find({ "_id": { $in: friendIDs }});
        if (result) {
            res.send(result);
        }
        else {
            res.send(null);
        }
    }
    catch (err) {
        console.log(err);
    }
});

router.post("/getRequestList", async (req, res) => {
    const requesterIDs = req.body.IDs;
    try {
        const result = await User.find({ "_id": { $in: requesterIDs }});
        if (result) {
            res.send(result);
        }
        else {
            res.send(null);
        }
    }
    catch (err) {
        console.log(err);
    }
});

module.exports = router;