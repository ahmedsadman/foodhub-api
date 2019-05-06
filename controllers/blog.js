const Blog = require('../models/blog');


/* ------- End Multer Config ----------- */

exports.createPost = async (req, res, next) => {
    try {
        const { title, content, user } = req.body;
        if (!req.file) {
            console.log('----------- NO IMAGE ------------');
            return res.status(400).send({
                error: 'No image provided'
            });
        }
        
        const image = req.file.path;
        const post = new Blog({
            title,
            content,
            image,
            user
        });
        const response = await post.save();
        res.status(201).send({
            message: 'Successfully created',
            data: response
        });
    } catch (e) {
        console.log(e.message);
        res.status(400).send({
            message: 'Error occured',
            error: e.message
        })
    }
}

exports.getPosts = async (req, res, next) => {
    try {
        const response = await Blog.find({}).populate('user', 'username email').sort({ _id: -1 });
        res.send({
            data: response
        })
    } catch (e) {
        res.status(400).send({
            error: e.message
        })
    }
}