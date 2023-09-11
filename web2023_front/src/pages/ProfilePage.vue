<template>
    <div class="profile-page">
      <div class="profile-header">
        <div class="cover-photo">
          <img src="cover-photo.jpg" alt="Cover Photo" />
        </div>
        <img class="profile-picture" :src="user.profilePicture" alt="Profile Picture" />
        <h1>{{ user.name }}</h1>
        <p>{{ user.bio }}</p>
      </div>
      <div class="profile-content">
        <!-- Personal data fields (name, email, etc.) -->
        <div class="info-section">
          <h2>Personal Information</h2>
          <div class="info-field">
            <label>Name:</label>
            <input v-model="user.name" placeholder="Name" />
          </div>
          <div class="info-field">
            <label>Email:</label>
            <input v-model="user.email" placeholder="Email" />
          </div>
        </div>
  
        <!-- Password change -->
        <div class="password-section">
          <h2>Change Password</h2>
          <input type="password" v-model="oldPassword" placeholder="Old Password" />
          <input type="password" v-model="newPassword" placeholder="New Password" />
          <input type="password" v-model="confirmPassword" placeholder="Confirm Password" />
        </div>
  
        <!-- Save button -->
        <button @click="updateProfile" class="btn-save">Save Changes</button>
  
        <!-- Error messages -->
        <p v-if="error" class="error-message">{{ error }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: {
          name: 'John Doe',
          email: 'john@example.com',
          bio: 'Frontend Developer | Vue.js enthusiast',
          profilePicture: 'profile-picture.jpg',
        },
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        error: null,
      };
    },
    methods: {
      updateProfile() {
        // Validate and update profile data and password
        // Display error messages if needed
      },
    },
  };
  </script>
  
  <style scoped>
  /* Facebook-inspired styling */
  .profile-page {
    max-width: 800px;
    margin: 0 auto;
    background-color: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  
  .cover-photo {
    height: 200px;
    background-color: #e9ebee;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
  }
  
  .cover-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .profile-picture {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 3px solid white;
    position: absolute;
    top: 150px;
    left: 20px;
  }
  
  h1 {
    font-size: 24px;
    margin: 10px 0;
    font-weight: bold;
  }
  
  p {
    font-size: 16px;
    color: #606770;
    margin-bottom: 20px;
  }
  
  .info-section {
    padding: 20px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  
  h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .info-field {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  label {
    flex: 1;
  }
  
  input {
    flex: 3;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 3px;
  }
  
  .password-section {
    padding: 20px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  
  .btn-save {
    background-color: #1877f2;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .btn-save:hover {
    background-color: #166fe5;
  }
  
  .error-message {
    color: #d93025;
    margin-top: 10px;
  }
  </style>