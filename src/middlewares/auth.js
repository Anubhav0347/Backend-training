const jwt = require("jsonwebtoken");

const checkToken = function(req,res,next){
try {
    let token = req.headers["x-auth-token"]
    if(!token)  return res.status(401).send({ status: false, msg: "Please pass a token" })

    const decodedToken = jwt.verify(token, "functionup-plutonium")
    if(!decodedToken) return res.status(401).send({ status: false, msg: "Invalid token" })

    if(decodedToken.userId !== req.params.userId)    return res.status(403).send({ status: false, msg: "Trying to access data of different user" })

    next()
} catch (error) {
    res.status(500).send({status : false, msg : error.message})
} 
}

module.exports.checkToken = checkToken