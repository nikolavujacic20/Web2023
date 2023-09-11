<!-- Post.vue -->

<template>
    <div class="post">
      <div class="post-header">
   
        <div class="user-info">
          <span class="user-name">{{ post.user.name }}</span>
          <span class="post-date">{{ post.date }}</span>
        </div>
      </div>
      <div class="post-content">
        {{ post.content }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      post: Object, // Accept post data as a prop
    },
  };
  </script>
  
  <style scoped>

  .post {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 20px;
    padding: 10px;
  }
  
  .post-header {
    display: flex;
    align-items: center;
  }
  
  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .user-info {
    flex: 1;
  }
  
  .user-name {
    font-weight: bold;
  }
  
  .post-date {
    color: #606770;
  }
  
  .post-content {
    margin-top: 10px;
  }
  </style>