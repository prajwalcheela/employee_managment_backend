const Employee = require("../models/employee.model");

  const Unique = async (req,res,next)=>{
    const {f_Email}=req.body
    try {
        const existingEmployee = await Employee.findOne({ f_Email: f_Email });
        console.log(existingEmployee)
        if (existingEmployee){
            res.json({ exists: !!existingEmployee });
        }
         
    } catch (error) {
        console.error('Error checking email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    next()
  }

  module.exports=Unique