<template>
  <div class="post">
    <div class="post-header">
    
      <div class="user-info">
        <span class="user-name">{{ post.user.name }}</span>
        <span class="post-date">{{ post.date }}</span>
      </div>
    </div>
    <div class="post-content">
      <p>{{ post.content }}</p>
      <img v-if="post.image" :src="post.image" alt="Post Image" class="post-image" />

      <!-- Comments Section -->
      <div class="comments-section">
        <div v-for="comment in post.comments" :key="comment.id" class="comment">
          <p class="comment-text">
            <strong>{{ comment.user.name }}</strong>: {{ comment.content }}
          </p>
          <button @click="editComment(comment.id, comment.content)" class="edit-comment-btn">Edit Comment</button>
        </div>
        <textarea v-model="newCommentContent" placeholder="Add a comment" class="comment-input"></textarea>
        <button @click="addComment" class="post-comment-btn">Post Comment</button>
      </div>
    </div>
    <button @click="deletePost" class="delete-post-btn">Delete</button>
  </div>
</template>

<script>
export default {
  props: {
    post: Object,
  },
  data() {
    return {
      newCommentContent: '',
    };
  },
  methods: {
    deletePost() {
      this.$emit('delete-post', this.post.id);
    },
    addComment() {
      if (this.newCommentContent.trim()) {
        this.$emit('add-comment', this.post.id, this.newCommentContent);
        this.newCommentContent = '';
      }
    },
    editComment(commentId, currentContent) {
      const updatedContent = prompt('Edit Comment:', currentContent);

      if (updatedContent !== null) {
        this.$emit('edit-comment', this.post.id, commentId, updatedContent);
      }
    },
  },
};
</script>

<style scoped>
.post {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.profile-picture {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: bold;
  outline: 1px solid #ccc;
  padding: 5px;
  align-self: flex-start;
}

.post-date {
  color: #666;
  align-self: flex-start;
}

.post-content {
  margin-bottom: 10px;
  align-self: flex-start;
}

.post-image {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
}

.comments-section {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.comment {
  margin-bottom: 5px;
  align-self: flex-start;
}

.comment-text {
  outline: 1px solid #ccc;
  padding: 5px;
}

.comment button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 3px 6px;
  cursor: pointer;
}

.comment-input {
  width: 100%;
  margin-top: 5px;
  align-self: flex-start;
}

.post-comment-btn {
  background-color: #42b72a;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  align-self: flex-start;
}

.edit-comment-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 3px 6px;
  cursor: pointer;
}
</style>