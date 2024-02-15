const express = require('express')
const router = express.Router();
const {check, validationResult} = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
//const normalize = require('normalize-url'); 


const User = require('../../models/User')

router.get( "/", async (req, res) => {
    try {
        const data = {user: "venkat"}
        res.json(data)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

// @route   POST api/users
// @Desc    Register User
// @Access  Public
router.post('/',
    [
        check("name", "Name is Required").not().isEmpty(),
        check("email", "Please enter valid email").isEmail(),
        check("password", "Enter Min 6 Characters").isLength({min: 6})
    ]
, async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json( { errors: errors.array()}  )
    }

    const {name, email, password} = req.body;

    try {
        let user = await User.findOne( {email} )

        if(user) {
            return res
                    .status(400)
                    .json( { errors: [ {msg: "User Already Exists"} ] }  )
        }

        // User Image 
        const avatar = 
            gravatar.url(email, {
                s: '200'
            })

        // const avatar = normalize(
        //     gravatar.url(email, {
        //         s: '200',
        //         r: 'pg',
        //         d: 'mm'
        //     })
        // )
        //user object 
        user = new User({
            name,
            email,
            avatar,
            password
        })
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        await user.save()
        const payload = {
            user: {
                id: user.id
            }
        }
        //res.json(data)

    } catch (error) {
        console.error(err.message);
        res.status(500).send('server error')
    }

})

///router.post()

module.exports = router