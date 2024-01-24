const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());



const messagesFilePath = path.join(__dirname, '..', 'data', 'messages.json');
router.post("/add", (req, res) => {
    const newMessage = req.body;
 
    try {
        const messages = JSON.parse(fs.readFileSync(messagesFilePath, "utf-8"));
        messages.push(newMessage);

        fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2), "utf-8");
        res.json({ success: true, message: 'Message added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding message' });
    }
});


router.get('/between/:userId1/:userId2', (req, res) => {
    const { userId1, userId2 } = req.params;

    const messages = JSON.parse(fs.readFileSync('data/messages.json', 'utf-8'));

    const filteredMessages = messages.filter(message =>
        (message.senderId == userId1 && message.receiverId == userId2) ||
        (message.senderId == userId2 && message.receiverId == userId1)
    );


    res.json({ success: true, messages: filteredMessages });
});

module.exports = router;