<template>
  <div class="profile-page" v-if="isLogged">
    <div class="profile-header">
      <div class="cover-photo">
        <img :src="imageUrl" alt="Profile Picture" />
      </div>

      <h1>{{ username }}</h1>
    </div>
    <div class="profile-content">
      <div class="info-section">
        <h2>Personal Information</h2>
        <div class="info-field">
          <label>First Name:</label>
          <input v-model="firstName" placeholder="First Name" />
        </div>
        <div class="info-field">
          <label>Last Name:</label>
          <input v-model="lastName" placeholder="" />
        </div>

        <div class="info-field">
          <label>Birthday:</label>
          <input v-model="birthday" placeholder="Birthday" />
        </div>
        <div class="info-field">

          <label>Gender:</label>
          <input v-model="gender" placeholder="Gender" />
        </div>

        <div class="info-field">
          <label>Email:</label>
          <input v-model="email" placeholder="Email" :disabled="true" />
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
import axios from 'axios';

export default {
  data() {
    return {
      isLogged: false,
      firstName: '',
      username: '',
      lastName: '',
      gender: '',
      birthday: '',
      email: '',
      profilePicture: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      error: null,
    };
  },
  computed: {
    imageUrl() {
      // Assume the backend serves images from the '/images' route
      return `http://localhost:3000${this.profilePicture}`;
    },
  },
  methods: {
    async fetchUserData(username) {
      try {

        const response = await axios.get(`http://localhost:3000/profile/${username}`);
        const { user } = response.data;

        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.password = user.password;
        this.gender = user.gender;
        this.birthday = user.birthday;
        this.email = user.email;
        this.profilePicture = user.profilePicture;
        console.log(this.profilePicture);



        this.isLogged = true;
      } catch (error) {
        console.error('Error fetching user data:', error);

      }
    },
    async updateProfile() {
      try {
        const requestData = {
          username: this.username,
          firstName: this.firstName,
          lastName: this.lastName,
          gender: this.gender,
          birthday: this.birthday,
          email: this.email,

        };

        const response = await axios.put('http://localhost:3000/profile/update-profile', requestData);

        if (response.data.success) {
        
          console.log('Profile updated successfully');
        } else {
    
          console.error('Profile update failed:', response.data.message);
        }
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    },
  },
  mounted() {

    const storedUsername = localStorage.getItem('username');
    this.fetchUserData(storedUsername);
  },
};
</script>
  
<style scoped>
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