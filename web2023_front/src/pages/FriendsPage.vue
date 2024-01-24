<template>
    <div class="friends-requests-container">
        <div class="friend-requests">
            <h2>Friend Requests</h2>
            <ul class="request-list">
                <li v-for="request in friendRequests" :key="request.id" class="request-item">
                    <img :src="request.image" alt="Profile Picture" class="profile-pic" />
                    <span class="friend-name">{{ request.name }} </span>
                    <button @click="acceptRequest(request.id)" class="accept-btn">Accept</button>
                    <button @click="declineRequest(request.id)" class="decline-btn">Decline</button>
                </li>
            </ul>
        </div>
        <div class="friends-list">
            <h2>My Friends</h2>
            <ul class="friends">
                <li v-for="friend in friends" :key="friend.id" class="friend-item">
                    <img :src="getImageUrl(friend.profilePicture)" alt="Profile Picture" class="profile-pic" />
                    <span class="friend-name">{{ friend.firstName }} {{ friend.lastName }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { EventBus } from '@/components/EventBus.js';

export default {
    data() {
        return {
            friendRequests: [],
            friends: []
        };
    },
    created() {
        EventBus.$on('friendRequestSent', this.fetchFriendRequests);
    },
    methods: {
        beforeDestroy() {
            EventBus.$off('updateFriendRequests', this.fetchFriendRequests);
        },
        async fetchFriends() {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    throw new Error("User ID is not set");
                }

                console.log(userId);
                const response = await axios.get(`http://localhost:3000/users/page/${userId}`);
                if (response.data.success && response.data.friends) {
                    this.friends = response.data.friends;
                } else {
                    throw new Error("Failed to fetch friends");
                }
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        },
        async fetchFriendRequests() {
            try {
                const userId = localStorage.getItem('userId'); // Replace with actual logic to get current user's ID
                const response = await axios.get(`http://localhost:3000/users/friend-requests/${userId}`);
                if (response.data.success) {
                    this.friendRequests = response.data.requests.map(request => {
                        return {
                            id: request.id,
                            name: request.firstName + ' ' + request.lastName,
                            image: this.getImageUrl(request.profilePicture)
                        };
                    });
                }
            } catch (error) {
                console.error('Error fetching friend requests:', error);
            }
        },
        getImageUrl(path) {
            return `http://localhost:3000${path}`;
        },
        async acceptRequest(requestId) {
            const userId = localStorage.getItem('userId');
            try {
                await axios.post('http://localhost:3000/users/accept-request', { userId, requestId });
                this.fetchFriends();
                this.fetchFriendRequests();
            } catch (error) {
                console.error('Error accepting friend request:', error);
            }
        },

        async declineRequest(requestId) {
            const userId = localStorage.getItem('userId');
            try {
                await axios.post('http://localhost:3000/users/decline-request', { userId, requestId });
                this.fetchFriendRequests();
            } catch (error) {
                console.error('Error declining friend request:', error);
            }
        }

    },
    mounted() {
        this.fetchFriends();
        this.fetchFriendRequests();

    }
};
</script>
<style scoped>
.friends-requests-container {
    max-width: 800px;
    margin: 20px auto;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.friend-requests,
.friends-list {
    padding: 15px;
    border-bottom: 1px solid #f0f2f5;
}

.friend-requests h2,
.friends-list h2 {
    color: #1877f2;
    /* Facebook Blue */
    margin-bottom: 10px;
}

.request-list,
.friends {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 15px;
}

.request-item,
.friend-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: #e0e0e0;
    /* Darker gray background */
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid #ccd0d5;
    /* Subtle border for a fancy edge */
}

.profile-pic {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 8px;
}

.friend-name {
    font-size: 14px;
    color: #1c1e21;
    margin-bottom: 10px;
}

.accept-btn,
.decline-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
}

.accept-btn {
    background-color: #28a745;
    /* Green */
    color: white;
    margin-bottom: 8px;
}

.decline-btn {
    background-color: #dc3545;
    /* Red */
    color: white;
}

.accept-btn:hover {
    background-color: #218838;
}

.decline-btn:hover {
    background-color: #c82333;
}
</style>
