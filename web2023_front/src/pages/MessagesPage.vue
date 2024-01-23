<template>
    <div class="messenger-container">
        <div class="messenger">
            <div class="chat">
                <div v-for="message in messages" :key="message.id"
                    :class="{ 'message': true, 'mine': message.senderId === currentUserId }">
                    <div class="message-content">{{ message.text }}</div>
                    <div class="message-timestamp">{{ formatDate(message.dateSent) }}</div>
                </div>
            </div>
            <div class="message-input">
                <textarea v-model="newMessage" placeholder="Type a message..."></textarea>
                <button @click="sendMessage">Send</button>
            </div>
        </div>
        <FriendsSideTab @friend-selected="loadMessages" />
    </div>
</template>
  
<script>
import FriendsSideTab from '@/components/FriendsSideTab.vue';
export default {
    components: {
        FriendsSideTab

    },
    data() {
        return {
            messages: [
                { id: 1, senderId: '3', receiverId: '2', text: 'Hello from User 3!', dateSent: '2023-01-01T09:00:00' },
                { id: 2, senderId: '2', receiverId: '3', text: 'Hi, User 3! This is User 2.', dateSent: '2023-01-01T09:05:00' },
                // Additional mock messages can be added here
            ],
            newMessage: '',
            currentUserId: '2' // User 2 is logged in
        };
    },
    methods: {

        loadMessages(friendId) {
      // Logic to load messages with the selected friend
      console.log("Selected friend ID:", friendId);
      // You can use this friendId to fetch messages from your backend
    },


        sendMessage() {
            if (this.newMessage.trim() !== '') {
                // Create a new message object
                const newMessage = {
                    id: this.messages.length + 1, // Simple way to generate a unique ID
                    senderId: this.currentUserId,
                    receiverId: this.selectedUserId, // Assuming you have selectedUserId as a prop or data
                    text: this.newMessage,
                    dateSent: new Date().toISOString() // Current date and time
                };

                // Add the new message to the messages array
                this.messages.push(newMessage);

                // Clear the input field
                this.newMessage = '';
            }
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleTimeString(); // Format date as needed
        }
    }
};
</script>
  
<style scoped>
.messenger-container {
    display: flex;
    justify-content: center;
    align-items: start;
    gap: 20px;
    margin: 20px auto;
}

.messenger {
    flex: 1;
    max-width: 600px;
    background-color: #f5f6f7;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.chat {
    min-height: 300px;
    max-height: 500px;
    overflow-y: auto;
}

.message {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.mine {
    text-align: right;
}

.message-content {
    font-size: 14px;
    margin-bottom: 5px;
}

.message-timestamp {
    font-size: 12px;
    color: #606770;
}

.message-input {
    margin-top: 15px;
    display: flex;
    align-items: center;
}

.message-input textarea {
    flex-grow: 1;
    padding: 8px;
    margin-right: 10px;
    border: 1px solid #ccd0d5;
    border-radius: 4px;
    resize: none;
}

.message-input button {
    background-color: #1877f2;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
}

.message-input button:hover {
    background-color: #1654ba;
}
</style>