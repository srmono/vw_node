const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next){
    //Get the toen from header
    const token = req.header('x-auth-header')

    //Check if token present
    if(!token){
        return res.status(401).json( {msg: "No Token, Authorization denied"} )
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded.user
        next()
    } catch (err) {
        res.status(401).json( {msg: "Token is not valid"} )
    }

}