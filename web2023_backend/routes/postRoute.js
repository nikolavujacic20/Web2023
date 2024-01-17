const express = require('express');
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const postsData = JSON.parse(fs.readFileSync('data/posts.json', 'utf-8'));

// GET /posts/all?userId=:userId
router.get('/all', (req, res) => {
    const userId = parseInt(req.query.userId);

    if (isNaN(userId)) {
        return res.status(400).json({ success: false, message: 'Invalid userId parameter' });
    }

    const userPosts = postsData.filter((post) => post.userId === userId);

    if (userPosts.length > 0) {
        res.json({ success: true, posts: userPosts });
    } else {
        res.status(404).json({ success: false, message: 'User posts not found' });
    }
});

// POST /posts/comment/:postId
router.post('/comment/:postId', (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const { text, userId } = req.body;
    console.log(text)
    console.log(userId);
    if (!text || !userId) {
        return res.status(400).json({ success: false, message: 'Both text and userId are required' });
    }

    const post = postsData.find((p) => p.postId === postId);

    if (post) {
        const newComment = {
            commentId: Date.now(),
            text,
            userId,
        };

        post.comments.push(newComment);

        fs.writeFileSync('data/posts.json', JSON.stringify(postsData, null, 2));

        res.json({ success: true, message: 'Comment added successfully', post });
    } else {
        res.status(404).json({ success: false, message: 'Post not found' });
    }
});

module.exports = router;
