const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/between/:userId1/:userId2', (req, res) => {
    const { userId1, userId2 } = req.params;
    console.log(userId1);
    console.log(userId2);
    console.log("AAAAAA");
    const messages = JSON.parse(fs.readFileSync('data/messages.json', 'utf-8'));

    const filteredMessages = messages.filter(message =>
        (message.senderId === userId1 && message.receiverId === userId2) ||
        (message.senderId === userId2 && message.receiverId === userId1)
    );

    console.log(filteredMessages);
    console.log("Poruke su iznad");
    res.json({ success: true, messages: filteredMessages });
});

module.exports = router;