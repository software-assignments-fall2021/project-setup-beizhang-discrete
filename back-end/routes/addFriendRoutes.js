const express = require('express');
const router = express.Router();
const User = require('../schemae/User').User;

router.post("/sendFriendRequest", async (req, res) => {
    const [senderID, receiverID] = [req.body.sender, req.body.receiver];
    if (senderID===receiverID) {
        res.send('This is yourself!');
        return;
    }
    const sender = await User.findById(senderID);
    const receiver = await User.findById(receiverID);
    //If you try to be friend with yourself

    //If the other user has already been your friend
    if (sender.friends.find(friendID => friendID===receiverID)) {
        res.send("You have already been friends");
    }
    //If you have already sent request to this user waiting for response
    else if (receiver.friendRequests.find(requesterID => requesterID===senderID)) {
        res.send("You have already requested");
    }
    else if (sender.friendRequests.find(requesterID => requesterID===receiverID)) {
        res.send("Look into your friend requests!");
    }
    else {
        //Push request to the receiver's list
        receiver.friendRequests.push(senderID);
        receiver.save((err) => {
            if (err) console.log(err);
            else res.send("Friend request successfully sent");
        });
    }
});

router.post("/acceptFriendRequest", async (req, res) => {
    const [accepterID, senderID] = [req.body.accepter, req.body.sender];
    const accepter = await User.findById(accepterID);
    const sender = await User.findById(senderID);
    //Add each other into friend lists
    sender.friends.push(accepterID);
    sender.save((err) => {
        if (err) console.log(err);
    });

    accepter.friends.push(senderID);
    // accepter.friendRequests.remove
    accepter.friendRequests.splice(accepter.friendRequests.indexOf(senderID), 1);
    accepter.save((err) => {
        if (err) console.log(err);
        else res.send("Friend added");
    });
});

router.post("/declineFriendRequest", async (req, res) => {
    const [declinerID, senderID] = [req.body.decliner, req.body.sender];
    const decliner = await User.findById(declinerID);
    //decliner.friendRequests.remove
    decliner.friendRequests.splice(decliner.friendRequests.indexOf(senderID), 1);
    decliner.save((err) => {
        if (err) console.log(err);
        else res.send("Friend request rejected");
    });
});

module.exports = router;