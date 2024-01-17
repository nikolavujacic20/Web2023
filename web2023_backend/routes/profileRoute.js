const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const usersData = JSON.parse(fs.readFileSync('data/users.json', 'utf-8'));

router.get('/:username', (req, res) => {
    const requestedUsername = req.params.username;
    const user = usersData.find((u) => u.username === requestedUsername);

    if (user) {
        res.json({ success: true, message: 'Profile found!', user: user });
    } else {
        res.status(404).json({ success: false, message: 'Profile not found' });
    }
});


router.put('/update-profile', (req, res) => {
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
