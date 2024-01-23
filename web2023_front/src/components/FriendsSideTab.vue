<template>
    <div class="contacts-sidebar">
        <div class="sidebar-header">
            <h2>Friends</h2>

        </div>
        <ul class="contact-list">
            <li v-for="contact in contacts" :key="contact.id" class="contact-item" @click="selectFriend(contact)">
                <img :src="getImageUrl(contact.profilePicture)" :alt="contact.name" class="contact-image" />
                <span class="contact-name">{{ contact.firstName }} {{ contact.lastName }} </span>
            </li>
        </ul>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    name: "FriendsSideTab",
    data() {
        return {
            contacts: [],
            url: '',
        };
    },
    methods: {

        selectFriend(friend) {
            this.$emit('friend-selected', friend);
        },
        getImageUrl(profilePicturePath) {

            return `http://localhost:3000${profilePicturePath}`;

        },
        async fetchFriends() {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.get(`http://localhost:3000/users/friends/${userId}`);
                const friendIds = response.data.friendIds;
                console.log(friendIds);

                for (const id of friendIds) {
                    const friendResponse = await axios.get(`http://localhost:3000/users/user/${id}`);
                    const friend = friendResponse.data.user;
                    console.log(friend);
                    this.contacts.push(friend);
                }
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        }
    },
    created() {
        this.fetchFriends();
    }
};
</script>
  
<style scoped>
.contacts-sidebar {
    background-color: #fff;
    color: #1c1e21;
    width: 300px;
    max-height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    border-right: 1px solid #ddd;
}

.sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: #f5f6f7;
    border-bottom: 1px solid #ddd;
}

.search-input {
    flex: 1;
    margin: 0 10px;
    padding: 8px;
    border: 1px solid #ccd0d5;
    border-radius: 18px;
}

.more-options {
    background: none;
    border: none;
    color: #606770;
    cursor: pointer;
}

.contact-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.contact-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #f0f2f5;
    cursor: pointer;
}

.contact-item:hover {
    background-color: #f0f2f5;
}

.contact-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    object-fit: cover;
}

.contact-name {
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>