<template>
  <div class="login">
    <NavigationBar />
    <div class="login-form">
      <h2 class="mb-4">Facebook</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <input type="email" class="form-control" v-model="email" placeholder="Email" required />
        </div>
        <div class="form-group">
          <input type="password" class="form-control" v-model="password" placeholder="Password" required />
        </div>
        <button type="submit" class="btn btn-primary btn-block">Log In</button>
      </form>
    </div>
  </div>
</template>

<script>
import NavigationBar from '../components/NavigationBar.vue';

import { loginUser } from '../services/loginUser.js'
export default {
  components: {
    NavigationBar,
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      const requestData = {
        email: this.email,
        password: this.password,
      };

      loginUser(requestData)
        .then((userData) => {
        
  
          console.log('User data:', userData);
          this.$router.push('/posts'); 
        })
        .catch((error) => {
        
          console.error('Login failed or request error:', error);
        });
    },
  },
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.login-form {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
}

.login-form h2 {
  color: #1877f2;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%; /* Make the input fields take up the full width of the parent container */
  padding: 12px; /* Adjusted padding for input fields */
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box; /* Ensure padding and border are included in width */
}

.btn-primary {
  background-color: #1877f2;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.btn-primary:hover {
  background-color: #166fe5;
}
</style>