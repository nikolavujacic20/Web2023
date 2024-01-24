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
  max-width: 600px; /* Reduced width for a more compact look */
  margin: 20px auto;
  padding: 10px;
  background-color: #f5f6f7; /* Facebook's background color */
}

.post {
  border: 1px solid #ddd;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff; /* White background for posts */
}

.post-image {
  max-width: 100%;
  height: auto;
  border-radius: 5px; /* Rounded corners for images */
}

.comment-section {
  margin-top: 10px;
  background-color: #e9ebee; /* Lighter background for comment section */
  border-radius: 5px;
  padding: 10px;
}

.comment {
  margin-top: 10px;
  padding: 5px;
  border: 1px solid #eee;
  background-color: white;
  border-radius: 4px; /* Rounded corners for comments */
}

.comment-text {
  font-size: 14px;
  color: #1c1e21; /* Facebook's primary text color */
}

.comment-username {
  font-size: 12px;
  color: #606770; /* Facebook's secondary text color */
}

.new-comment-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccd0d5; /* Facebook's border color */
  border-radius: 3px;
  font-size: 14px;
  margin-top: 10px;
}

.add-comment-btn {
  background-color: #1877f2; /* Facebook's button color */
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
}

.add-comment-btn:hover {
  background-color: #1654ba; /* Slightly darker blue on hover */
}
</style>