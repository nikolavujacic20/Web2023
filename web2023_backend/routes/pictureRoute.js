const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
router.use('/images', express.static('images'));
router.use(bodyParser.json());




router.get('/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const picturesData = JSON.parse(fs.readFileSync('data/pictures.json', 'utf-8'));

    const userPictures = picturesData.find(entry => entry.userId === userId);
    if (userPictures) {

        const filteredPictures = userPictures.pictures.filter(p => p.load);
        res.json({ success: true, pictures: filteredPictures });
    } else {
        res.status(404).json({ success: false, message: 'No pictures found for this user' });
    }
});


router.put('/edit-picture/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const { pictureId } = req.body;
   
    const picturesData = JSON.parse(fs.readFileSync('data/pictures.json', 'utf-8'));

    const user = picturesData.find(u => u.userId === userId);
    if (user) {
        const picture = user.pictures.find(p => p.id === pictureId);
        if (picture) {
            picture.load = false; 
            fs.writeFileSync('data/pictures.json', JSON.stringify(picturesData, null, 2));
            res.json({ success: true, message: 'Picture updated successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Picture not found' });
        }
    } else {
        res.status(404).json({ success: false, message: 'User not found' });
    }
});




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/upload-picture', upload.single('image'), (req, res) => {
    if (req.file) {
        const userId = parseInt(req.body.userId); 
        const picturesData = JSON.parse(fs.readFileSync('data/pictures.json', 'utf-8'));

      
        let userGallery = picturesData.find(entry => entry.userId === userId);
        if (userGallery) {
            userGallery.pictures.push({
                id: Date.now(),
                filename: req.file.filename,
                load: true
            });
        } else {
            
            userGallery = {
                userId: userId,
                pictures: [{
                    id: Date.now(),
                    filename: req.file.filename,
                    load: true
                }]
            };
            picturesData.push(userGallery);
        }


        fs.writeFileSync('data/pictures.json', JSON.stringify(picturesData, null, 2));

        res.json({ success: true, message: 'Picture uploaded successfully', filename: req.file.filename });
    } else {
        res.status(400).json({ success: false, message: 'No file uploaded.' });
    }
});

module.exports = router;






module.exports = router;