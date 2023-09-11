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
          <label>Email address:</label>
          <input v-model="email" placeholder="Email address" />
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
          <p v-if="errors.confirmPassword">{{ errors.confirmPassword }}</p>
        </div>
        <button type="submit" class="btn-register">Register</button>
      </form>
      <p v-if="registrationError" class="error-message">{{ registrationError }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        email: '',
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
      register() {
        // Validate user input and send registration request to the server
        // Handle success and error responses
      },
    },
  };
  </script>
  
  <style scoped>
  /* Facebook-inspired styling for RegisterPage */
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
    padding: 20px; /* Add padding to the form to create space */
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
  
  .error-message {
    color: #d93025;
    margin-top: 10px;
    font-weight: bold;
  }
  </style>