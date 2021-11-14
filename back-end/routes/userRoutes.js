const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../schemae/User').User;
const jwt = require('jsonwebtoken');

//token lives for 3 days
const maxAge = 3*24*60*60;
const createToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: maxAge
    });
}

/* ---------------------- authentication route handlers --------------------- */
router.post("/login", (req, res) => {
    const [username, password] = [req.body.username, req.body.password];

    res.send("Hi");
});
router.post("/signUp", async (req, res) => {
    const [username, password] = [req.body.username, req.body.password];
    console.log(username);
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const newUser = await User.create({
            username: username,
            password: hashedPassword,
            avatar: "",
            status: "Online",
            friends: [],
            friendRequests: [],
            joined_since: Date.now(),
            games_played: 0,
            games_won: 0,
        });
        const token = createToken(newUser._id);
        res.cookie("Bearer", token, { httpOnly: true, maxAge: maxAge*1000 });
        res.json(newUser);
        // res.json({ user: newUser._id });
    } catch(err) {
        console.log(err.toString());
        res.json({
            error: true,
            message: err.toString()
        });
    }
});
router.get("/logout", (req, res) => {
    res.send("Hi");
});
router.get("/allUsersList", (req, res) => {
    res.send("Hi");
});
router.get("/user", (req, res) => {
    res.send("Hi");
});

module.exports = router;