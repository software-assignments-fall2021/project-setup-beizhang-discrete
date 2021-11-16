const express = require('express');
const multer = require("multer");
const router = express.Router();

// save file uploads to disk at 'public/uploads'
const uploadDir = '../public/uploads';
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

router.post("/uploadAvatar", upload.single("avatar"), (req, res) => {
    // const query = { "_id" : req.body._id };
    // const setAvatar = { $set: { avatar: '/uploads' + req.file.filename } };
    // User.findOneAndUpdate(query, setAvatar, async (err, user) => {
    //     if(err) throw err;
    //     res.send(user.avatar)
    // });
    //res.send('https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg')
    res.sendFile(path.join(__dirname, '../../front-end', 'public', 'defaultAvatar.jpg'))
});

module.exports = router;