<template>
    <div class="users-page">
      <h1>Friends</h1>
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
          <img :src="user.profilePic" alt="Profile Pic" class="user-pic" />
          <p class="user-name">{{ user.name }} {{ user.lastName }}</p>
          <p class="user-birthdate">{{ user.birthDate }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: [
          { id: 1, name: 'John', lastName: 'Doe', birthDate: '1990-01-15', profilePic: 'https://placekitten.com/50/50' },
          { id: 2, name: 'Jane', lastName: 'Smith', birthDate: '1985-07-22', profilePic: 'https://placekitten.com/51/51' },
          { id: 3, name: 'Bob', lastName: 'Johnson', birthDate: '1995-03-10', profilePic: 'https://placekitten.com/52/52' },
          // Add more mock users as needed
        ],
        searchName: '',
        searchLastName: '',
        minBirthDate: '',
        maxBirthDate: '',
        sortBy: 'name',
      };
    },
    computed: {
      filteredUsers() {
        return this.users
          .filter(user => user.name.toLowerCase().includes(this.searchName.toLowerCase()))
          .filter(user => user.lastName.toLowerCase().includes(this.searchLastName.toLowerCase()))
          .filter(user => this.filterByBirthDate(user))
          .sort((a, b) => this.sortByCriteria(a, b));
      },
    },
    methods: {
      filterByBirthDate(user) {
        const minDate = this.minBirthDate ? new Date(this.minBirthDate) : null;
        const maxDate = this.maxBirthDate ? new Date(this.maxBirthDate) : null;
  
        if (minDate && user.birthDate < minDate) {
          return false;
        }
  
        if (maxDate && user.birthDate > maxDate) {
          return false;
        }
  
        return true;
      },
      sortByCriteria(a, b) {
        switch (this.sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'lastName':
            return a.lastName.localeCompare(b.lastName);
          case 'birthDate':
            return new Date(a.birthDate) - new Date(b.birthDate);
          default:
            return 0;
        }
      },
      searchUsers() {
        // Implement search functionality based on your requirements
      },
      sortUsers() {
        // Implement sorting functionality based on your requirements
      },
    },
  };
  </script>
  
  <style scoped>
  .users-page {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .search-options {
    margin-bottom: 20px;
  }
  
  .user-list {
    display: flex;
    flex-wrap: wrap;
  }
  
  .user {
    margin: 10px;
    text-align: center;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .user-pic {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .user-name {
    font-size: 16px;
    font-weight: bold;
  }
  
  .user-birthdate {
    font-size: 14px;
    color: #555;
  }
  </style>
  