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
router.post( "/", 
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
        const posts = await Post.find().sort( {date: -1} )
        res.json(posts)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

// Get Post By ID
router.get('/:id', auth, checkObjectId('id') , async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(!post) {
            return res.status(404).json( {msg: "Post Not found"} )
        }

        res.json(post)

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})


// Delete Post
router.delete('/:id', [auth, checkObjectId('id')], 
async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(!post) {
            return res.status(404).json( {msg: "Post Not found"} )
        }

        //Check user
        if(post.user.toString() !== req.user.id){
            return res.status(401).json( {msg: "User Not Authorised"} )
        }

        await post.remove()

        res.json({ msg: "Post Removed"})
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
} )

// Like a Post
router.put( 
    '/likes/:id',
    [auth, checkObjectId('id')], 
    async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)

            // Check if the post has already liked
            if( post.likes.some( 
                    (like) =>  like.user.toString() === req.user.id
                ) 
            ){
                return res.status(400).json( {msg: "Post already liked"})
            }

            post.likes.unshift( { user: req.user.id} )

            await post.save();

            return res.json(post.likes)

        } catch (error) {
            console.error(err.message)
            res.status(500).send("Server Error")
        }
    } )


// Unlike a post
router.put( 
    '/unlike/:id',
    [auth, checkObjectId('id')], 
    async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)

            // Check if the post has already liked
            if( post.likes.some( 
                    (like) =>  like.user.toString() === req.user.id
                ) 
            ){
                return res.status(400).json( {msg: "Post has not yet liked"})
            }

            //remove like
            post.likes = post.likes.filter(
                ({user}) => user.toString() !== req.user.id
            )

            await post.save();

            return res.json(post.likes)

        } catch (error) {
            console.error(err.message)
            res.status(500).send("Server Error")
        }
    } )



// Commment on Post
// Uncomment on Post


///router.post()
module.exports = router