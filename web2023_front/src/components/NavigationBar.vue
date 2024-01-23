<template>
  <nav class="navbar">
    <div class="container">
      <router-link v-if="!isLogged" to="/login" class="navbar-brand">Facebook</router-link>
      <router-link v-else to="/posts" class="navbar-brand">Facebook</router-link>
      <ul class="nav">


        <li class="nav-item" v-if="isLogged && userType === 'regular'">
          <router-link to="/users" class="nav-link">Users</router-link>
        </li>
        <li class="nav-item" v-if="isLogged && userType === 'regular'">
          <router-link to="/pictures" class="nav-link">Pictures</router-link>
        </li>

        <li class="nav-item" v-if="isLogged && userType === 'regular'">
          <router-link to="/posts" class="nav-link">MyPosts</router-link>
        </li>
        <li class="nav-item" v-if="isLogged && userType === 'regular'">
          <router-link to="/messages" class="nav-link">Messages</router-link>
        </li>
        <li class="nav-item" v-if="isLogged && userType === 'regular'">
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
      isLogged: false,
      userType: null,
    };
  },
  methods: {
    logout() {
      this.isLogged = false;
      this.userType = null;
      localStorage.removeItem('userType');
      localStorage.removeItem('username');
      this.$router.push('/login');
    },
  },
  created() {

    const storedUserType = localStorage.getItem('userType');
    if (storedUserType) {
      this.isLogged = true;
      this.userType = storedUserType;
    }

    this.$root.$on('userLoggedIn', ({ isLogged, userType }) => {
      this.isLogged = isLogged;
      this.userType = userType;
    });
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
  margin-left: 20px;

  margin-right: auto;

}

.nav {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-right: 20px;

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
