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
    };
  },
  methods: {
    async register() {
   
      this.errors = {};
      this.registrationError = null;

      if (!this.username.trim()) {
        this.errors.username = 'Username is required';
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
        });

        console.log(response.data);
      
      } catch (error) {
        console.error(error.response.data);
     
        this.registrationError = 'Registration failed. The username is already taken. Please try again.';
      }
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
</style>
