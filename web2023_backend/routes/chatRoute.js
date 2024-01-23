const express = require("express");
const router = express.Router();
const fs = require("fs");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Create a new message
router.post('/messages', (req, res) => {
    const newMessage = req.body.message;
  
    // Read the conversation data from the JSON file
    const conversationData = JSON.parse(fs.readFileSync('data/conversations.json', 'utf8'));
  
    // Find the conversation to add the message to
    const conversation = conversationData.find((conv) => 
    conv.user1Id === newMessage.senderId && conv.user2Id === newMessage.recipientId || 
    conv.user1Id === newMessage.recipientId && conv.user2Id === newMessage.senderId);
  
    // Check if the conversation exists
    if (!conversation) {
      // Create a new conversation object
      const newConversation = {
        id: conversationData.length + 1,
        messages: [newMessage], // Start with the new message as the first message in the conversation
        user1Id: newMessage.senderId,
        user2Id: newMessage.recipientId,
      };
  
      // Add the new conversation to the conversation data
      conversationData.push(newConversation);
  
      // Update the conversation data in the JSON file
      fs.writeFileSync('data/conversations.json', JSON.stringify(conversationData));
  
      // Send the newly created conversation as a response
      res.status(201).json({success: true, data: newConversation});
      return;
    }
  
    // Generate a new message ID
    const messageId = conversation.messages.length + 1;
  
    // Add the new message to the conversation
    const message = { id: messageId, ...newMessage };
    conversation.messages.push(message);
  
    // Update the conversation data in the JSON file
    fs.writeFileSync('data/conversations.json', JSON.stringify(conversationData));
  
    // Send the newly created message as a response
    res.status(201).json({success: true, data: message});
  });
  
  // Read all messages
  router.get('/messages', (req, res) => {
    // Read the conversation data from the JSON file
    const conversationData = JSON.parse(fs.readFileSync('data/conversations.json', 'utf8'));
  
    // Get all messages from the conversation data
    const messages = getAllMessages(conversationData);
  
    // Send the messages as a response
    res.json({success: true, data: messages});
  });
  
  // Read a specific message
  router.get('/messages/:messageId', (req, res) => {
    const messageId = parseInt(req.params.messageId);
  
    // Read the conversation data from the JSON file
    const conversationData = JSON.parse(fs.readFileSync('data/conversations.json', 'utf8'));
  
    // Find the message by ID
    let foundMessage = null;
    for (const conversation of conversationData) {
      foundMessage = conversation.messages.find((message) => message.id === messageId);
      if (foundMessage) {
        break;
      }
    }
  
    // Check if the message exists
    if (!foundMessage) {
      return res.status(404).json({ success: false, error: 'Message not found' });
    }
  
    // Send the message as a response
    res.json({success: true, data: foundMessage});
  });
  
  // Update a specific message
  router.put('/messages/:messageId', (req, res) => {
    const messageId = parseInt(req.params.messageId);
    const updatedMessage = req.body;
  
    // Read the conversation data from the JSON file
    const conversationData = JSON.parse(fs.readFileSync('data/conversations.json', 'utf8'));
  
    // Find the message by ID
    let foundMessage = null;
    for (const conversation of conversationData) {
      foundMessage = conversation.messages.find((message) => message.id === messageId);
      if (foundMessage) {
        break;
      }
    }
  
    // Check if the message exists
    if (!foundMessage) {
      return res.status(404).json({success: false, error: 'Message not found' });
    }
  
    // Update the message properties
    foundMessage.data = updatedMessage.data;
  
    // Update the conversation data in the JSON file
    fs.writeFileSync('data/conversations.json', JSON.stringify(conversationData));
  
    // Send the updated message as a response
    res.json({success: true, data: foundMessage});
  });
  
  // Delete a specific message
  router.delete('/messages/:messageId', (req, res) => {
    const messageId = parseInt(req.params.messageId);
  
    // Read the conversation data from the JSON file
    const conversationData = JSON.parse(fs.readFileSync('data/conversations.json', 'utf8'));
  
    // Find the message by ID and remove it
    let foundMessage = null;
    for (const conversation of conversationData) {
      const messageIndex = conversation.messages.findIndex((message) => message.id === messageId);
      if (messageIndex !== -1) {
        foundMessage = conversation.messages[messageIndex];
        conversation.messages.splice(messageIndex, 1);
        break;
      }
    }
  
    // Check if the message exists
    if (!foundMessage) {
      return res.status(404).json({success:false, error: 'Message not found' });
    }
  
    // Update the conversation data in the JSON file
    fs.writeFileSync('data/conversations.json', JSON.stringify(conversationData));
  
    // Send a success message as a response
    res.json({success: true, message: 'Message deleted successfully' });
  });

  // Get all convesations for a specific user
router.get('/conversation-list/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
  
    // Read the conversation data from the JSON file
    const conversationData = JSON.parse(fs.readFileSync('data/conversations.json', 'utf8'));
  
    // Get all conversations for the user
    const conversations = conversationData.filter((conv) => conv.user1Id === userId || conv.user2Id === userId);
  
    // Send the conversations as a response
    res.json({success: true, data: conversations});
  });

router.get('/conversation-list', (_req, res) => {
    // Read the conversation data from the JSON file
    const conversationData = JSON.parse(fs.readFileSync('data/conversations.json', 'utf8'));
  
    // Send the conversations as a response
    res.json({success: true, data: conversationData});
  }
);

router.get('/conversations', (req, res) => {
    const conversationId = parseInt(req.query.conversationId);
  
    // Read the conversation data from the JSON file
    const conversationData = JSON.parse(fs.readFileSync('data/conversations.json', 'utf8'));
  
    // Find the conversation by ID
    const conversation = conversationData.find((conv) => conv.id === conversationId);
  
    // Check if the conversation exists
    if (!conversation) {
      return res.status(404).json({success: false, error: 'Conversation not found' });
    }
  
    // Send the conversation as a response
    res.json({success: true, data: conversation});
  }
);

module.exports = router;