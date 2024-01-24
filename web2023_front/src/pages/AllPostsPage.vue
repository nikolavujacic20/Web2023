<template>
    <div class="all-posts">
        <!-- Post Creation Form -->
        <div class="create-post">
            <textarea v-model="newPostText" placeholder="What's on your mind?"></textarea>
            <input type="file" @change="handleFileChange" />
            <button @click="createPost">Post</button>
        </div>

        <!-- Displaying Posts -->
        <div v-for="post in posts" :key="post.postId" class="post">
            <img v-if="post.picture" :src="getImageUrl(post.picture)" alt="Post Image" class="post-image" />
            <p>{{ post.text }}</p>

            <!-- Toggle Comments Button -->
            <button @click="toggleComments(post.postId)" class="toggle-comments-btn">
                {{ showCommentsForPost[post.postId] ? 'Hide Comments' : 'Show Comments' }}
            </button>

            <!-- Comments Section -->
            <div v-if="showCommentsForPost[post.postId]" class="comments-section">
                <div v-for="comment in post.comments" :key="comment.commentId" class="comment">
                    <p class="comment-text">{{ comment.text }}</p>
                </div>
                <div class="comment-input">
                    <textarea v-model="newCommentText" placeholder="Write a comment"></textarea>
                    <button @click="addComment(post.postId)">Comment</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            posts: [],
            newPostText: '',
            newCommentText: '',
            selectedFile: null,
            showCommentsForPost: {},
        };
    },
    methods: {
        fetchPosts() {
            axios.get('http://localhost:3000/posts/everypost')
                .then(response => {
                    this.posts = response.data.posts;
                    console.log(this.posts);
                })
                .catch(error => {
                    console.error('Error fetching posts:', error);
                });
        },
        createPost() {
            const formData = new FormData();
            formData.append('userId', localStorage.getItem('userId'));
            formData.append('text', this.newPostText);
            if (this.selectedFile) {
                formData.append('picture', this.selectedFile);
            }

            axios.post('http://localhost:3000/posts/add-post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    if (response.data.success) {
                        this.posts.unshift(response.data.post); // Add new post at the beginning of the posts array
                        this.newPostText = '';
                        this.selectedFile = null;
                    }
                })
                .catch(error => {
                    console.error('Error creating post:', error);
                });
        },
        addComment(postId) {
            if (this.newCommentText.trim() !== '') {
                const newComment = {
                    text: this.newCommentText,
                    userId: localStorage.getItem('userId') // Assuming the userId is stored in localStorage
                };

                axios.post(`http://localhost:3000/posts/comment/${postId}`, newComment)
                    .then(response => {
                        if (response.data.success) {

                            const updatedPost = response.data.post;
                            const postIndex = this.posts.findIndex(post => post.postId === postId);
                            if (postIndex !== -1) {
                                this.$set(this.posts, postIndex, updatedPost);
                            }
                            this.newCommentText = ''; // Reset the comment text field
                        }
                    })
                    .catch(error => {
                        console.error('Error adding comment:', error);
                    });
            }
        },
        handleFileChange(event) {
            this.selectedFile = event.target.files[0];
        },
        getImageUrl(path) {
            return `http://localhost:3000${path}`;
        },
        toggleComments(postId) {
            this.$set(this.showCommentsForPost, postId, !this.showCommentsForPost[postId]);
        },
    },
    mounted() {
        this.fetchPosts();
    }
};
</script>
<style scoped>
.all-posts {
    max-width: 520px;
    margin: 20px auto;
    background-color: #f5f6f7;
}

.create-post {
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.create-post textarea {
    width: calc(100% - 22px);
    padding: 10px;
    border: 1px solid #ccd0d5;
    border-radius: 4px;
    resize: none;
    margin-bottom: 10px;
}

.create-post input[type="file"] {
    display: block;
    margin-bottom: 10px;
}

.create-post button {
    background-color: #1877f2;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
}

.create-post button:hover {
    background-color: #1654ba;
}

.post {
    background-color: #fff;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.post-image {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
    margin-bottom: 10px;
}

.comment-input {
    display: flex;
    align-items: center;
    margin-top: 5px;
}

.comment-input textarea {
    flex-grow: 1;
    padding: 4px;
    border: 1px solid #ccd0d5;
    border-radius: 4px;
    font-size: 12px;
    resize: none;
}

.comment {
    background-color: #f0f2f5;
    padding: 2px 5px;
    /* Reduced padding */
    border-radius: 15px;
    margin-bottom: 5px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
}

.comment-text {
    flex-grow: 1;
    font-size: 12px;
    /* Smaller font size */
    font-weight: bold;
    /* Bold text */
    margin-right: 5px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.comment-input button {
    background-color: #1877f2;
    color: white;
    border: none;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 5px;
}

.comment-input button:hover {
    background-color: #1654ba;
}

.toggle-comments-btn {
    background-color: #1877f2;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    margin-top: 10px;
}

.toggle-comments-btn:hover {
    background-color: #1654ba;
}</style>