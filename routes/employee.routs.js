const { CreateEmp, getAllEmployees, getEmployeeById, UpdateEmployee, deleteEmployee } = require("../controllers/employee.controller")
const { upload } = require("../middleware/ImageVerify.middleware")
const JwtAuth = require("../middleware/JwtAuth.middleware")
const Unique = require("../middleware/UniqueEmail")
// const multer = require('multer');
// const upload = multer()

module.exports=(app)=>{
    app.post("/api/create_emp",[JwtAuth,Unique,upload.single('f_Image')],CreateEmp)
    app.get("/api/get_emps",[JwtAuth],getAllEmployees)
    app.get("/api/get_emp/:id",[JwtAuth],getEmployeeById)
    app.put("/api/update_emp/:id",[JwtAuth],UpdateEmployee)
    app.delete("/api/delete_emp/:id",[JwtAuth],deleteEmployee)
    
}