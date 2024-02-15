const express = require('express')
const router = express.Router();

router.get( "/", async (req, res) => {
    try {
        const data = {auth: "JWT"}
        res.json(data)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

///router.post()
module.exports = router