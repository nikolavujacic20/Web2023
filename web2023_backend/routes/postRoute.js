const express = require('express');
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = 'images/posts/';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
router.use('/images', express.static('images'));

router.post('/add-post', upload.single('picture'), (req, res) => {
    const postsData = JSON.parse(fs.readFileSync('data/posts.json', 'utf-8'));
    const { userId, text } = req.body;
    const picturePath = req.file ? `/images/posts/${req.file.filename}` : '';

    const newPost = {
        postId: Date.now(),
        userId: parseInt(userId),
        text: text,
        picture: picturePath,
        comments: []
    };

    postsData.push(newPost);
    fs.writeFileSync('data/posts.json', JSON.stringify(postsData, null, 2));

    res.json({ success: true, message: 'Post added successfully', post: newPost });
});



router.get('/all', (req, res) => {
    const userId = parseInt(req.query.userId);
    const postsData = JSON.parse(fs.readFileSync('data/posts.json', 'utf-8'));
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

router.post('/comment/:postId', (req, res) => {
    const postsData = JSON.parse(fs.readFileSync('data/posts.json', 'utf-8'));
    const postId = parseInt(req.params.postId, 10);
    const { text, userId } = req.body;

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

router.get('/everypost', (req, res) => {
    const postsData = JSON.parse(fs.readFileSync('data/posts.json', 'utf-8'));

    if (postsData.length > 0) {
        res.json({ success: true, posts: postsData });
    } else {
        res.status(404).json({ success: false, message: 'No posts found' });
    }
});

module.exports = router;
