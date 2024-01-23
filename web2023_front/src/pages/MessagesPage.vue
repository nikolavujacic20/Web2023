<template>
    <div class="messenger-container">
        <div class="messenger">
            <div class="chat">
                <div v-for="message in messages" :key="message.id"
                    :class="{ 'message': true, 'mine': message.senderId === currentUserId }">
                    <img :src="getUserImage(message.senderId)" class="message-avatar" />
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
import axios from 'axios';
export default {
    components: {
        FriendsSideTab

    },
    data() {
        return {
            messages: [],
            newMessage: '',
            currentUserId: '',
            currentUserImage:'',
            friendUserImage:''
        };
    },
    methods: {

        getUserImage(senderId) {
            // Assuming you have access to the current user's and the friend's image
            return senderId === this.currentUserId ? `http://localhost:3000${this.currentUserImage}` : `http://localhost:3000${this.friendUserImage}`;
        },

        async loadMessages(friend) {

            const currentUserId = localStorage.getItem('userId');
            this.friendUserImage = friend.profilePicture;
            try {
                const response = await axios.get(`http://localhost:3000/messages/between/${currentUserId}/${friend.id}`);
                this.messages = response.data.messages;
                console.log(this.messages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        },


        sendMessage() {
            if (this.newMessage.trim() !== '') {

                const newMessage = {
                    id: this.messages.length + 1,
                    senderId: this.currentUserId,
                    receiverId: this.selectedUserId,
                    text: this.newMessage,
                    dateSent: new Date().toISOString()
                };


                this.messages.push(newMessage);


                this.newMessage = '';
            }
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleTimeString();
        }
    },
    mounted() {
        this.currentUserId = localStorage.getItem('userId');
        this.currentUserImage = localStorage.getItem('image');
        console.log(this.currentUserId);
        console.log(this.currentUserImage);
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
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.mine {
    justify-content: flex-end;
    text-align: right;
}

.message-content {
    font-size: 14px;
    margin-bottom: 5px;
    max-width: 80%; /* Prevents text from taking full width */
}

.message-timestamp {
    font-size: 12px;
    color: #606770;
    margin-left: 10px;
}

.message-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
}

.mine .message-avatar {
    order: 2; /* Puts avatar on the right for the current user */
    margin-right: 0;
    margin-left: 10px;
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