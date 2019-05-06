const express = require('express');
const router = express.Router();
const multer = require('multer');
const blogController = require('../controllers/blog');
const imageUpload = require('../helpers/imageUpload');

router.get('/', blogController.getPosts);
router.post('/create', imageUpload.single('image'), blogController.createPost);

module.exports = router;
