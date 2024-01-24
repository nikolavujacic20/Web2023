<template>
  <div class="register-page">
    <h1>Registration</h1>
    <form @submit.prevent="register" class="registration-form">
      <div class="form-group">
        <label>Username:</label>
        <input v-model="username" placeholder="Username" />
        <p v-if="errors.username">{{ errors.username }}</p>
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" v-model="email" placeholder="Email" />
        <p v-if="errors.email">{{ errors.email }}</p>
      </div>
      <div class="form-group">
        <label>First name:</label>
        <input v-model="firstName" placeholder="First name" />
        <p v-if="errors.firstName">{{ errors.firstName }}</p>
      </div>
      <div class="form-group">
        <label>Last name:</label>
        <input v-model="lastName" placeholder="Last name" />
        <p v-if="errors.lastName">{{ errors.lastName }}</p>
      </div>
      <div class="form-group">
        <label>Gender:</label>
        <select v-model="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" v-model="password" placeholder="Password" />
        <p v-if="errors.password">{{ errors.password }}</p>
      </div>
      <div class="form-group">
        <label>Confirm password:</label>
        <input type="password" v-model="confirmPassword" placeholder="Confirm password" />
        <p v-if="errors.confirmPassword" class="password-mismatch">{{ errors.confirmPassword }}</p>
      </div>
      <button type="submit" class="btn-register">Register</button>
    </form>
    <p v-if="registrationError" class="error-message">{{ registrationError }}</p>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <p>Registration successful!</p>
        <button @click="closeModal">OK</button>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
export default {
  data() {
    return {
      username: '',
      firstName: '',
      lastName: '',
      gender: 'male',
      password: '',
      confirmPassword: '',
      errors: {},
      registrationError: null,
      email: '',
      showModal: false,
    };
  },
  methods: {
    async register() {

      this.errors = {};
      this.registrationError = null;

      if (!this.username.trim()) {
        this.errors.username = 'Username is required';
      }
      if (!this.email.trim()) {
        this.errors.email = 'Email is required';
      }
      if (!this.firstName.trim()) {
        this.errors.firstName = 'First name is required';
      }
      if (!this.lastName.trim()) {
        this.errors.lastName = 'Last name is required';
      }
      if (!this.password.trim()) {
        this.errors.password = 'Password is required';
      }
      if (!this.confirmPassword.trim()) {
        this.errors.confirmPassword = 'Confirm password is required';
      }


      if (this.password !== this.confirmPassword) {
        this.errors.confirmPassword = 'Passwords do not match';
      }

      if (Object.keys(this.errors).length > 0) {
        return;
      }


      try {
        const response = await axios.post('http://localhost:3000/api/register', {
          username: this.username,
          firstName: this.firstName,
          lastName: this.lastName,
          gender: this.gender,
          password: this.password,
          email: this.email
        });
        this.showModal = true;
        console.log(response.data);

      } catch (error) {
        console.error(error.response.data);

        this.registrationError = 'Registration failed. The username is already taken. Please try again.';
      }
    },
    closeModal() {
      this.showModal = false;
      this.$router.push('/login');
    },
  },
};
</script>
  
<style scoped>
.register-page {
  max-width: 400px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.registration-form {
  padding: 20px;

}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: bold;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-size: 16px;
}

select {
  padding: 8px;
}

button.btn-register {
  background-color: #1877f2;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

button.btn-register:hover {
  background-color: #166fe5;
}


.form-group p {
  color: #d93025;
  margin-top: 5px;
  font-size: 14px;
}

.form-group .password-mismatch {
  color: #d93025;
  margin-top: 5px;
  font-size: 14px;
}


.error-message {
  color: #d93025;
  margin-top: 10px;
  font-weight: bold;
  font-size: 16px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* Ensure modal is above other content */
}

.modal-content {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 40%; /* Relative width */
  max-width: 500px; /* Maximum width */
}

.modal-content p {
  font-size: 20px; /* Larger font size */
  color: #1c1e21; /* Facebook's primary text color */
  margin-bottom: 20px;
}

.modal-content button {
  background-color: #1877f2; /* Facebook's button color */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.modal-content button:hover {
  background-color: #1654ba; /* Darker blue on hover */
}
</style>
