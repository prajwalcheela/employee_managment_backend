	// t_Employee			
	// f_Id,f_Image,f_Name,f_Email,f_Mobile,f_Designation,  f_gender,f_Course,f_Createdate			

const { default: mongoose } = require("mongoose");

const empoyeeSchema= mongoose.Schema({
    f_Id: {
        type: String
      },
    f_Name:{
        type:String,
        required:true
    },
    f_Email:{
        type:String,
        required:true,
        lowercase:true,
        unique: true,
        validate: {
            validator: function(value) {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              return emailRegex.test(value);
            },
            message: 'Invalid email format'
          }
    },
    f_Mobile:{
        type: Number,
        required: true,
        minLength:10
    },
    f_Designation:{
        type: String,
        enum: ['HR', 'Manager', 'Sales'],
        required: true
    },
    f_gender:{
        type: String,
        enum: ['M', 'F'],
        required: true
    },
    f_Course:{
        type: [String],
        enum: ['MCA', 'BCA', 'BSC'],
        required: true
    },
    f_Image: {
        type: String,
        required: true,
        // validate: {
        //   validator: function(value) {
        //     const ext = value.substring(value.lastIndexOf('.') + 1);
        //     return ext.toLowerCase() === 'jpg' || ext.toLowerCase() === 'png';
        //   },
        //   message: 'Image must be a JPG or PNG file'
        // }
      },
    f_Createdate: {
        type: Date,
        default: Date.now
      }
})

const Employee = mongoose.model("t_Employee",empoyeeSchema)

module.exports=Employee