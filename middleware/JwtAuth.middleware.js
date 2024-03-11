
const jwt = require('jsonwebtoken')


const JwtAuth= (req,res,next) => {
    const token = req.headers["x-access-token"]
    jwt.verify(token,process.env.SECRET_KEY,(err,payload)=>{
        if(err){
           return res.send(err.message)
        }
        req.user=payload
        next()
    })
}

module.exports=JwtAuth

