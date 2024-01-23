<template>
    <div class="modal-backdrop" @click="closeModal">
        <div class="modal-content" @click.stop>
            <div class="profile-header">
                <div class="cover-photo">
                    <img :src="imageUrl" alt="Profile Picture" />
                </div>
                <h1>{{ selectedUser.name }} {{ selectedUser.lastName }}</h1>
            </div>
            <div class="profile-content">
                <div class="info-section">
                    <h2>Personal Information</h2>
                    <p><strong>First Name:</strong> {{ selectedUser.firstName }}</p>
                    <p><strong>Last Name:</strong> {{ selectedUser.lastName }}</p>
                    <p><strong>Birthday:</strong> {{ selectedUser.birthday }}</p>
                    <p><strong>Email:</strong> {{ selectedUser.email }}</p>
                </div>
                <button @click="sendFriendRequest" class="btn-action">Send Friend Request</button>
                <button @click="cancelFriendRequest" class="btn-action">Cancel Friend Request</button>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        selectedUser: {
            type: Object,
            default: () => ({})
        }
    },

    computed: {
    imageUrl() {
     
      return `http://localhost:3000${this.selectedUser.profilePicture}`;
    },
  },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        sendFriendRequest() {
          
            alert(`Friend request sent to ${this.selectedUser.firstName} ${this.selectedUser.lastName}!`);
            this.closeModal();
        },
        cancelFriendRequest() {
           
            alert(`Friend request cancelled for ${this.selectedUser.firstName} ${this.selectedUser.lastName}.`);
            this.closeModal();
        }
    }
};
</script>
  
<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6); 
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000; 
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px; 
    text-align: center;
    width: 500px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
}

.cover-photo img {
    width: 150px; 
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #1877f2; 
}

.profile-header h1 {
    color: #1c1e21; 
    margin-top: 15px;
}

.info-section {
    text-align: left; 
    margin-top: 20px;
}

.info-section p {
    font-size: 16px;
    color: #606770; 
    margin: 5px 0; 
}

.btn-action {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #1877f2; 
    color: white;
    font-size: 16px;
    margin-right: 10px;
}

.btn-action:hover {
    background-color: #1654ba; 
}


.btn-action.cancel {
    background-color: #d93025;
}

.btn-action.cancel:hover {
    background-color: #c12e20; 
}
</style>