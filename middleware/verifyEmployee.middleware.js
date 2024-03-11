const VerifyEmp=async (req,res,next)=>{
    const {f_Id,f_Image,f_Name,f_Email,f_Mobile,f_Designation,f_gender,f_Course} =req.body

    if(!f_Image || !f_Name || !f_Email || !f_Mobile || !f_Designation || !f_gender || !f_Course){
        res.send({message:"Please provide all feilds"})
    }
    next()
}

module.exports=VerifyEmp