<!-- PostPage.vue -->

<template>
    <div class="post-page">
      <h1>Posts</h1>
      <div class="post-list">
        <PostComponent v-for="post in posts" :key="post.id" :post="post" />
      </div>
    </div>
  </template>
  
  <script>
  import PostComponent from '../components/PostComponent.vue'; 
  
  export default {
    components: {
      PostComponent, 
    },
    data() {
      return {
        posts: [
          {
            id: 1,
            user: {
              name: 'John Doe',
              profilePicture: 'profile-picture-1.jpg',
            },
            date: '2 hours ago',
            content: 'This is the first post.',
          },
          {
            id: 2,
            user: {
              name: 'Jane Smith',
              profilePicture: 'profile-picture-2.jpg',
            },
            date: '1 hour ago',
            content: 'Hello world!',
          },
          // Add more posts as needed
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* Style the PostPage component as needed */
  .post-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .post-list {
    margin-top: 20px;
  }
  </style>