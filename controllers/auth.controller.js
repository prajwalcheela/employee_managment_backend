const bcrypt = require("bcrypt")
const User = require("../models/user.model")
const jwt = require("jsonwebtoken")



const Registeruser= async (req,res)=>{
    const{f_sno,f_userName,f_pwd}=req.body
    const hashedPwd=bcrypt.hashSync(f_pwd,10)
    const details = {
        f_sno,
        f_userName,
        f_pwd:hashedPwd
    }

    try{
        const user= await User.create(details)
        return res.status(201).send(user)
    }catch(err){
        return res.status(400).send({message:err.message})
    }
}

const LogIn= async (req,res)=>{
    const{f_userName,f_pwd}=req.body
    
    try{
        
        const user = await User.findOne({f_userName:f_userName})
        
        // console.log(user.f_pwd)
        // console.log(user.f_userName)
        // console.log(user)
        if(!user){
            return res.send({message:"Invalid username provided"})
         }
         var IspassMatch = bcrypt.compareSync(f_pwd,user.f_pwd)
         if (!IspassMatch) {
           return res.send({message:"Invalid password"})
        }
         var token = jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:"3hr"})
         
    
         return res.send({
            f_sno:user.f_sno,
            f_userName:user.f_userName,
            accessToken:token})
         }catch(err){
            if (err.response && err.response.status === 400) {
                // Handle wrong username or password
                alert('Incorrect username or password. Please try again.');
              } else {
                // Handle other errors
                console.error('Error logging in:', err);
         }
        }

    
}

module.exports={Registeruser,LogIn}