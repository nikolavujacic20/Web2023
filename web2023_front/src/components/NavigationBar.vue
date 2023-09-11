<template>
  <nav class="navbar">
    <div class="container">
      <router-link v-if="!isLogged" to="/login" class="navbar-brand">Facebook</router-link>
      <router-link v-else to="/posts" class="navbar-brand">Facebook</router-link>
      <ul class="nav">
        <li class="nav-item" v-if="isLogged && userType === 'user'">
          <router-link to="/home" class="nav-link">Messages</router-link>
        </li>
        <li class="nav-item" v-if="isLogged && userType === 'user'">
          <router-link to="/profile" class="nav-link">Profile</router-link>
        </li>
        <li class="nav-item" v-if="!isLogged">
          <router-link to="/register" class="nav-link">Register</router-link>
        </li>
        <li class="nav-item" v-if="!isLogged">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item" v-if="isLogged && userType === 'admin'">
          <router-link to="/admin" class="nav-link">Admin Dashboard</router-link>
        </li>
        <li class="nav-item" v-if="isLogged">
          <a @click="logout" class="nav-link">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isLogged: true, // Set this to true if the user is logged in, otherwise false
      userType: 'user', // Set this to 'user' or 'admin' based on user type
    };
  },
  methods: {
    logout() {
      this.isLogged = false;
    },
  },
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #1877f2;
  color: white;
  padding: 10px 0;
  z-index: 1000;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.navbar-brand {
  font-size: 24px;
  text-decoration: none;
  color: white;
  margin-left: 20px; /* Add margin to the left for spacing */
  margin-right: auto; /* Push "Facebook" link all the way to the left */
}

.nav {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-right: 20px; /* Add margin to the right for spacing */
}

.nav-link {
  text-decoration: none;
  color: white;
  font-weight: bold;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>