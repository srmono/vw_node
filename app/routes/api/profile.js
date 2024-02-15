const express = require('express')
const router = express.Router();

router.get( "/", async (req, res) => {
    try {
        const data = {info: "profile"}
        res.json(data)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})

///router.post()
module.exports = router