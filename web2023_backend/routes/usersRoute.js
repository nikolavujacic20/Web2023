const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const fs = require("fs");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/all", (req, res) => {
  const usersData = JSON.parse(fs.readFileSync("data/users.json", "utf-8"));
  res.json({ success: true, users: usersData });
});



router.use('/images', express.static('images'));


router.get("/friends/:userId", (req, res) => {

  
  const userId = parseInt(req.params.userId);

  const usersData = JSON.parse(fs.readFileSync("data/users.json", "utf-8"));
  const user = usersData.find(u => u.id === userId);

  if (user && user.friends) {
  
      res.json({ success: true, friendIds: user.friends });
  } else {
      res.status(404).json({ success: false, message: "User or friends not found" });
  }
});


router.get("/user/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const usersData = JSON.parse(fs.readFileSync("data/users.json", "utf-8"));
  const user = usersData.find(u => u.id === userId);

  if (user) {
      res.json({ success: true, user });
  } else {
      res.status(404).json({ success: false, message: "User not found" });
  }
});

module.exports = router;