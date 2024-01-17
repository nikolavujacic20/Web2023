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
          userId: localStorage.getItem('userId'), // Replace with the actual logged-in user ID
        };

        axios.post(`http://localhost:3000/posts/comment/${postId}`, newComment)
          .then((response) => {
            const { success, message, post } = response.data;

            if (success) {
              // Update the local state with the new comment
              const index = this.posts.findIndex((p) => p.postId === postId);
              if (index !== -1) {
                this.$set(this.posts, index, post);
              }

              console.log(message);
            } else {
              console.error(message);
            }
          })
          .catch((error) => {
            console.error('Error adding comment:', error);
          });

        this.newCommentText[postId] = ''; // Clear the comment textarea
      }
    },
    async fetchUserPosts(userId) {
      try {
        const response = await axios.get(`http://localhost:3000/posts/all?userId=${userId}`);
        const { success, posts } = response.data;

        if (success) {
          console.log('User Posts:', posts);
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
  max-width: 800px;
  margin: 0 auto;
}

.post {
  border: 1px solid #ddd;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.post-image {
  max-width: 100%;
  height: auto;
}

.comment-section {
  margin-left: 20px;
  background-color: #f0f2f5;
  border-radius: 5px;
  padding: 10px;
}

.comment {
  margin-top: 10px;
  padding: 5px;
  border: 1px solid #eee;
  background-color: white;
}

.comment-text {
  font-size: 14px;
}

.comment-username {
  font-size: 12px;
}

.new-comment-input {
  width: calc(100% - 20px);
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-size: 14px;
  margin-top: 10px;
}

.add-comment-btn {
  background-color: #1877f2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
}

.add-comment-btn:hover {
  background-color: #166fe5;
}
</style>
