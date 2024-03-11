const Employee = require("../models/employee.model")

const CreateEmp = async (req,res)=>{
    const {f_Id,f_Image,f_Name,f_Email,f_Mobile,f_Designation,f_gender,f_Course} =req.body
    // console.log(req.body)
    const obj={
        f_Id,
        f_Image:req.file ? req.file.path : "img.jpg",
        f_Name,
        f_Email,
        f_Mobile,
        f_Designation,
        f_gender,
        f_Course
    }
    try{
        const responce = await Employee.create(obj)
        return res.status(201).send("employee created sucessfully")
    }catch(err){
        return res.send(err)
    }
}

const getAllEmployees = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const skip = (page - 1) * pageSize;
        const limit = pageSize;

        const data = await Employee.find()
            .skip(skip)
            .limit(limit)
            .exec();

        const totalCount = await Employee.countDocuments();
        const totalPages = Math.ceil(totalCount / pageSize);

        res.status(200).json({
            results: data,
            pagination: {
                page: page,
                pageSize: pageSize,
                totalCount: totalCount,
                totalPages: totalPages
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



const getEmployeeById =async (req,res)=>{
    const id = req.params.id
    try{
        const data = await Employee.findById(id)
        if(!data)  {
            return res.send("No employee found with this Id")
        } 
        return res.status(200).send(data)
    }catch(err){
        return res.send(err.message)
    }
}

const UpdateEmployee =async (req,res)=>{
    const id = req.params.id
    const {f_Id,f_Image,f_Name,f_Email,f_Mobile,f_Designation,f_gender,f_Course} =req.body
    const obj={
        f_Id,
        f_Image:req.file ? req.file.path : "img.jpg",
        f_Name,
        f_Email,
        f_Mobile,
        f_Designation,
        f_gender,
        f_Course
    }
    
    try{
        const updated = await Employee.findByIdAndUpdate(id,obj,{
            new:true
        })
        if(!updated){
            return res.send("User not found")
        }
        return res.status(200).send(updated)
    }catch(err){
        return res.send(err.message)
    }
}
const deleteEmployee= async(req,res)=>{
    let id=req.params.id
    try{
        const employee = await Employee.findByIdAndDelete(id);
        if (!employee) {
            return res.status(400).send({message:"employee not found"})
        }
        return res.status(202).send({message:"deleted sucessfully"})
    }catch(err){
        return res.status(500).send(err)
    }
}


module.exports={
    CreateEmp,
    getAllEmployees,
    getEmployeeById,
    UpdateEmployee,
    deleteEmployee
}