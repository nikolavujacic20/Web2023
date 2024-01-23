const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());



const users = [
  { id: 1, username: 'user1@1', password: 'pass1' },
  { id: 2, username: 'user2', password: 'pass2' },
];

router.post('/login', (req, res) => {
  const usersData = JSON.parse(fs.readFileSync('data/users.json', 'utf-8'));
  const { username, password } = req.body;
  const user = usersData.find((u) => u.username === username && u.password === password);

  if (user) {
    req.session.user = user;
    res.json({ success: true, message: 'Login successful!', user: user });
  } else {
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
});

router.post('/register', (req, res) => {
  const usersData = JSON.parse(fs.readFileSync('data/users.json', 'utf-8'));
  const { username, password, firstName, lastName, gender } = req.body;
  userType = "regular";
  profilePicture = "";
  posts = [];
  birthday = "";
  const isUsernameTaken = usersData.some((u) => u.username === username);

  if (isUsernameTaken) {
    res.status(400).json({ success: false, message: 'Username is already taken' });
  } else {

    const newUser = { id: usersData.length + 1, userType, username, password, firstName, lastName, gender, birthday, profilePicture, posts };
    users.push(newUser);
    usersData.push(newUser);


    fs.writeFileSync('data/users.json', JSON.stringify(usersData, null, 2), 'utf-8');

    res.json({ success: true, message: 'Registration successful!' });
  }
});

module.exports = router;
