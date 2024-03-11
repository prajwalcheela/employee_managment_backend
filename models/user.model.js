const { default: mongoose } = require("mongoose");



const  userSchema=mongoose.Schema({
    f_sno:{
        type:Number
    },
    f_userName:{
        type:String,
        required:true
    },
    f_pwd:{
        type:String,
        required:true
    }
})

const User = mongoose.model('t_login',userSchema)


module.exports=User