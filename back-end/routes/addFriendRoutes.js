const express = require('express');
const router = express.Router();
const User = require('../schemae/User').User;

router.post("/sendFriendRequest", async (req, res) => {
    const [senderName, receiverName] = [req.body.sender, req.body.receiver];
    if (senderName===receiverName) {
        res.send('This is yourself!');
        return;
    }
    const sender = await User.findOne({username: senderName});
    const receiver = await User.findOne({username: receiverName});
    //If you try to be friend with yourself

    //If the other user has already been your friend
    if (sender.friends.find(friend => friend.username===receiverName)) {
        res.send("You have already been friends");
    }
    //If you have already sent request to this user waiting for response
    else if (receiver.friendRequests.find(requester => requester.username===senderName)) {
        res.send("You have already requested");
    }
    else if (sender.friendRequests.find(requester => requester.username===receiverName)) {
        res.send("Look into your friend requests!");
    }
    else {
        //Push request to the receiver's list
        receiver.friendRequests.push({
            username: sender.username,
            avatar: sender.avatar,
            status: sender.status
        });
        receiver.save((err) => {
            if (err) console.log(err);
            else res.send("Friend request successfully sent");
        });
    }
});

router.post("/acceptFriendRequest", async (req, res) => {
    const [accepterName, senderName] = [req.body.accepter, req.body.sender];
    const accepter = await User.findOne({username: accepterName});
    const sender = await User.findOne({username: senderName});
    //Add each other into friend lists
    sender.friends.push({
        username: accepter.username,
        avatar: accepter.avatar,
        status: accepter.status
    });
    sender.save((err) => {
        if (err) console.log(err);
    });

    accepter.friends.push({
        username: sender.username,
        avatar: sender.avatar,
        status: sender.status
    });
    // accepter.friendRequests.remove
    for (var i=0; i<accepter.friendRequests.length; i++) {
        if (accepter.friendRequests[i].username===senderName) {
            accepter.friendRequests.splice(i, 1);
            break;
        }
    }
    accepter.save((err) => {
        if (err) console.log(err);
        else res.send("Friend added");
    });
});

router.post("/declineFriendRequest", async (req, res) => {
    const [declinerName, senderName] = [req.body.decliner, req.body.sender];
    const decliner = await User.findOne({username: declinerName});
    //decliner.friendRequests.remove
    for (var i=0; i<decliner.friendRequests.length; i++) {
        if (decliner.friendRequests[i].username===senderName) {
            decliner.friendRequests.splice(i, 1);
            break;
        }
    }
    decliner.save((err) => {
        if (err) console.log(err);
        else res.send("Friend request rejected");
    });
});

module.exports = router;