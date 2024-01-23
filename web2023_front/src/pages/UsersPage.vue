<template>
  <div class="users-page">
    <h1>Users</h1>
    <div class="search-options">
      <input v-model="searchName" type="text" placeholder="Search by Name" />
      <input v-model="searchLastName" type="text" placeholder="Search by Last Name" />
      <input v-model="minBirthDate" type="date" placeholder="Min Birth Date" />
      <input v-model="maxBirthDate" type="date" placeholder="Max Birth Date" />
      <button @click="searchUsers">Search</button>
      <label>Sort by:</label>
      <select v-model="sortBy">
        <option value="name">Name</option>
        <option value="lastName">Last Name</option>
        <option value="birthDate">Birth Date</option>
      </select>
      <button @click="sortUsers">Sort</button>
    </div>
    <div class="user-list">
      <div v-for="user in filteredUsers" :key="user.id" class="user">
        <img :src="getUserImageUrl(user.profilePicture)" alt="Profile Pic" class="user-pic" @click="openModal(user)" />
        <p class="user-name">{{ user.firstName }} {{ user.lastName }}</p>
        <p class="user-birthdate">{{ user.birthday }}</p>
      </div>
      <ProfileModal v-if="showModal" :selectedUser="selectedUser" @close="showModal = false" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ProfileModal from '../components/ProfileModal.vue';
export default {

  components: {
    ProfileModal
  },
  data() {
    return {
      users: [],
      searchName: '',
      searchLastName: '',
      minBirthDate: '',
      maxBirthDate: '',
      sortBy: 'name',

      showModal: false,
      selectedUser: {}
    };
  },
  computed: {
  filteredUsers() {
    return this.users.filter(user => {
      
      if (this.searchName && !user.firstName.toLowerCase().includes(this.searchName.toLowerCase())) {
        return false;
      }

      if (this.searchLastName && !user.lastName.toLowerCase().includes(this.searchLastName.toLowerCase())) {
        return false;
      }

     
      const userDate = new Date(user.birthday);
      const minDate = this.minBirthDate ? new Date(this.minBirthDate) : new Date('1900-01-01');
      const maxDate = this.maxBirthDate ? new Date(this.maxBirthDate) : new Date('2100-12-31');

      if (userDate < minDate || userDate > maxDate) {
        return false;
      }

      return true;
    });
  },

},
  methods: {
    filterByBirthDate(user) {
      const userDate = new Date(user.birthday);
      const minDate = this.minBirthDate ? new Date(this.minBirthDate) : new Date('1900-01-01');
      const maxDate = this.maxBirthDate ? new Date(this.maxBirthDate) : new Date('2100-12-31');

      return userDate >= minDate && userDate <= maxDate;
    },
    fetchUsers() {
      axios.get('http://localhost:3000/users/all')
        .then(response => {
          console.log(response.data); 
          this.users = response.data.users;
          console.log(this.users[0]);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },

    getUserImageUrl(profilePicturePath) {
      return `http://localhost:3000${profilePicturePath}`;
    },
    openModal(user) {
      this.selectedUser = user;
      this.showModal = true;
    },
    searchUsers() {
    
    },
    sortUsers() {
      this.users.sort((a, b) => this.sortByCriteria(a, b));
    },
    sortByCriteria(a, b) {
      switch (this.sortBy) {
        case 'name':
          return a.firstName.localeCompare(b.firstName);
        case 'lastName':
          return a.lastName.localeCompare(b.lastName);
        case 'birthDate':
          return new Date(a.birthday) - new Date(b.birthday);
        default:
          return 0;
      }
    },
  },
  created() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
.users-page {
  max-width: 800px;
  margin: 0 auto;
  color: #1c1e21; 
  background-color: #f5f6f7; 
}

.search-options {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.search-options input[type="text"],
.search-options input[type="date"],
.search-options select {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccd0d5; 
}

.search-options button {
  background-color: #1877f2; 
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.search-options button:hover {
  background-color: #1654ba;
}

.user-list {
  display: flex;
  flex-wrap: wrap;
}

.user {
  width: 200px;
  margin: 10px;
  text-align: center;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: white; 
}

.user-pic {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ddd; 
}

.user-name {
  font-size: 16px;
  font-weight: bold;
  color: #1c1e21;
}

.user-birthdate {
  font-size: 14px;
  color: #606770; 
}
</style>
