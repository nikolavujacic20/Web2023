<template>
  <div class="post-page" v-if="isLogged">

    
    <div v-for="post in posts" :key="post.postId" class="post">
      <p>{{ post.text }}</p>
      <img :src="getImageUrl(post.picture)" alt="Post Image" class="post-image" />
      <button @click="toggleComments(post.postId)">Show/Hide Comments</button>
      <div v-if="showComments[post.postId]" class="comment-section">
        <div v-for="comment in post.comments" :key="comment.commentId" class="comment">
          <p class="comment-text">{{ comment.text }}</p>
          <small class="comment-username">{{ comment.userId }}</small>
        </div>
        <textarea v-model="newCommentText[post.postId]" placeholder="Add a comment" class="new-comment-input"></textarea>
        <button @click="addComment(post.postId)" class="add-comment-btn">Add Comment</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isLogged: true,
      posts: [],
      showComments: {},
      newCommentText: {},
    };
  },
  methods: {
    toggleComments(postId) {
      this.$set(this.showComments, postId, !this.showComments[postId]);
    },
    addComment(postId) {
      const commentText = this.newCommentText[postId];
      if (commentText.trim() !== '') {
        const newComment = {
          text: commentText,
          userId: localStorage.getItem('userId'), 
          username: localStorage.getItem('username')
        };

        axios.post(`http://localhost:3000/posts/comment/${postId}`, newComment)
          .then((response) => {
            const { success, message, post } = response.data;

            if (success) {
           
              const index = this.posts.findIndex((p) => p.postId === postId);
              if (index !== -1) {
                this.$set(this.posts, index, post);
              }

           
            } else {
              console.error(message);
            }
          })
          .catch((error) => {
            console.error('Error adding comment:', error);
          });

        this.newCommentText[postId] = ''; 
      }
    },
    async fetchUserPosts(userId) {
      try {
        const response = await axios.get(`http://localhost:3000/posts/all?userId=${userId}`);
        const { success, posts } = response.data;

        if (success) {
         
          this.posts = posts;
        } else {
          console.error('Error fetching user posts:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    },
    getImageUrl(imagePath) {
      return `http://localhost:3000${imagePath}`;
    },
  },

  mounted() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.fetchUserPosts(userId);
    }
  },
};
</script>

<style scoped>
.post-page {
  max-width: 520px; /* Adjusted width for consistency */
  margin: 20px auto;
  padding: 10px;
  background-color: #f5f6f7; /* Facebook's background color */
}

.post {
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
}

.post-image {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
}

.comment-section {
  margin-top: 10px;
  background-color: #f0f2f5; /* Lighter background color for comments */
  border-radius: 15px;
  padding: 5px; /* Reduced padding for comment section */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}

.comment {
  background-color: #fff;
  padding: 2px 5px; /* Reduced padding for individual comments */
  border-radius: 15px; /* More rounded corners */
  margin-bottom: 5px; /* Reduced margin between comments */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.comment-text {
  flex-grow: 1;
  font-size: 12px; /* Smaller font size for comments */
  color: #1c1e21; /* Facebook's primary text color */
  margin-right: 5px;
  text-align: left;
}

.comment-username {
  font-size: 12px;
  color: #606770; /* Facebook's secondary text color */
  font-weight: bold; /* Bold usernames */
}

.new-comment-input {
  width: 100%;
  padding: 4px;
  border: 1px solid #ccd0d5;
  border-radius: 4px;
  font-size: 12px; /* Smaller font size for input */
  margin-top: 5px;
}

.add-comment-btn {
  background-color: #1877f2; /* Facebook's button color */
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 5px;
}

.add-comment-btn:hover {
  background-color: #1654ba; /* Slightly darker blue on hover */
}
</style>
