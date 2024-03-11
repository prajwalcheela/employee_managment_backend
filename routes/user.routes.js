const { Registeruser, LogIn } = require("../controllers/auth.controller")





module.exports =(app)=>{
    app.post("/api/auth/register",Registeruser )
    app.post("/api/auth/login",LogIn)
}