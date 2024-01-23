const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/') 
    },
    filename: function (req, file, cb) {
      
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.use('/images', express.static('images'));


router.post('/upload-picture', upload.single('profilePicture'), (req, res) => {
    if (req.file) {
        
        const username = req.body.username || req.headers.username;
        const usersData = JSON.parse(fs.readFileSync('data/users.json', 'utf-8'));
        const userIndex = usersData.findIndex((u) => u.username === username);

        if (userIndex !== -1) {
            usersData[userIndex].profilePicture = `/images/${req.file.filename}`;
            fs.writeFileSync('data/users.json', JSON.stringify(usersData, null, 2), 'utf-8');
            res.json({ success: true, message: 'Profile picture uploaded successfully', path: `/images/${req.file.filename}` });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } else {
        res.status(500).json({ success: false, message: 'Error uploading file' });
    }
});


router.get('/:username', (req, res) => {
    const usersData = JSON.parse(fs.readFileSync('data/users.json', 'utf-8'));
    const requestedUsername = req.params.username;
    const user = usersData.find((u) => u.username === requestedUsername);

    if (user) {
        res.json({ success: true, message: 'Profile found!', user: user });
    } else {
        res.status(404).json({ success: false, message: 'Profile not found' });
    }
});


router.put('/update-profile', (req, res) => {
    const usersData = JSON.parse(fs.readFileSync('data/users.json', 'utf-8'));
    const { username, firstName, lastName, gender, birthday, email } = req.body;

   
    const userIndex = usersData.findIndex((u) => u.username === username);

    if (userIndex !== -1) {
      
        usersData[userIndex] = {
            ...usersData[userIndex],
            firstName,
            lastName,
            gender,
            birthday,
            email,
        };

      
        fs.writeFileSync('data/users.json', JSON.stringify(usersData, null, 2), 'utf-8');

        res.json({ success: true, message: 'Profile updated successfully' });
    } else {
        res.status(404).json({ success: false, message: 'User not found' });
    }
});

module.exports = router;
