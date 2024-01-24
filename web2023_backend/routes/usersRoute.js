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


router.get("/page/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const usersData = JSON.parse(fs.readFileSync("data/users.json", "utf-8"));
  const user = usersData.find(u => u.id === userId);

  if (user && user.friends) {
   
    const friends = user.friends.map(friendId => {
      return usersData.find(u => u.id === friendId);
    }).filter(friend => friend !== undefined); 
 
    res.json({ success: true, friends: friends });
  } else {
    res.status(404).json({ success: false, message: "User or friends not found" });
  }
});


router.get("/friend-requests/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const usersData = JSON.parse(fs.readFileSync("data/users.json", "utf-8"));
  const user = usersData.find(u => u.id === userId);

  if (user && user.requests) {
    
      const pendingRequests = user.requests.filter(request => request.status === "pending");
  

    
      const requests = pendingRequests.map(request => {
          return usersData.find(u => u.id === request.requestId);
      });

    
      res.json({ success: true, requests });
  } else {
      res.status(404).json({ success: false, message: "User or requests not found" });
  }
});


router.post("/accept-request", (req, res) => {
  const { userId, requestId } = req.body;
  const usersData = JSON.parse(fs.readFileSync("data/users.json", "utf-8"));

 
  const user = usersData.find(u => u.id === parseInt(userId));
  const friend = usersData.find(u => u.id === parseInt(requestId));

  if (user && friend) {
   
    if (!user.friends.includes(requestId)) {
      user.friends.push(requestId);
    }


    const requestIndex = user.requests.findIndex(req => req.requestId === requestId);
    if (requestIndex !== -1) {
      user.requests[requestIndex].status = 'accepted';
    }


    fs.writeFileSync("data/users.json", JSON.stringify(usersData, null, 2), 'utf-8');
    res.json({ success: true, message: "Friend request accepted", friend });
  } else {
    res.status(404).json({ success: false, message: "User or friend not found" });
  }
});



router.post("/decline-request", (req, res) => {
  const { userId, requestId } = req.body;
  const usersData = JSON.parse(fs.readFileSync("data/users.json", "utf-8"));

  const user = usersData.find(u => u.id === parseInt(userId));

  if (user) {
    
    const requestIndex = user.requests.findIndex(req => req.requestId === requestId);
    if (requestIndex !== -1) {
      user.requests[requestIndex].status = 'declined';
    }

 
    fs.writeFileSync("data/users.json", JSON.stringify(usersData, null, 2), 'utf-8');
    res.json({ success: true, message: "Friend request declined" });
  } else {
    res.status(404).json({ success: false, message: "User not found" });
  }
});




router.post("/send-request", (req, res) => {
  const { userId, friendId } = req.body;
  const usersData = JSON.parse(fs.readFileSync("data/users.json", "utf-8"));

  const user = usersData.find(u => u.id === parseInt(friendId));

  if (user) {
  
    const existingRequest = user.requests.find(req => req.requesterId === userId);
    if (!existingRequest) {
     
      user.requests.push({
        requestId: parseInt(userId),
        status: 'pending' 
      });

    
      fs.writeFileSync("data/users.json", JSON.stringify(usersData, null, 2), 'utf-8');
      res.json({ success: true, message: "Friend request sent successfully" });
    } else {
     
      res.json({ success: false, message: "Friend request already exists" });
    }
  } else {
 
    res.status(404).json({ success: false, message: "User not found" });
  }
});

module.exports = router;