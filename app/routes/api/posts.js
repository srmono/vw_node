const express = require('express')
const router = express.Router();
require('dotenv').config();
const auth = require('../../middleware/auth')
const {check, validationResult} = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId')

const Post = require('../../models/POST')
const User = require('../../models/User');

// router.get( "/", async (req, res) => {
//     try {
//         const data = {info: "Posts"}
//         res.json(data)
//     } catch (err) {
//         console.error(err.message)
//         res.status(500).send("Server Error")
//     }
// })

// Create Post
router.get( "/", 
    auth, check('text', 'Text is Required').not().isEmpty(), 
    async (req, res) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json( { errors: errors.array()}  )
        }

        try {
            
            const user =  await User.findById( req.user.id ).select('-password')

            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            })

            const post = await newPost.save()

            res.json(post)

        } catch (err) {
            console.error(err.message)
            res.status(500).send("Server Error")
        }
})


// Get All posts
router.get('/', auth, async (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

// Get Post By ID
// Delete Post
// Like a Post
// Unline a post
// Commment on Post
// Uncomment on Post


///router.post()
module.exports = router