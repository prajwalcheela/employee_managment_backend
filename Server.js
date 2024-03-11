const express = require('express')
const bodyparser = require('body-parser')
const { default: mongoose } = require('mongoose')
const { connected } = require('process')
const userroute = require("./routes/user.routes")
const employeeRoute = require("./routes/employee.routs")
const cors =require('cors')
require('dotenv').config()



const app = express()
app.use(bodyparser.json())
app.use(cors())

mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("connected to db")
}).catch(err=>{console.log(err)})



app.get('/',(req,res)=>{
    res.send(`<h1 >Welcome to Employee managment</h1>`)
})

userroute(app)
employeeRoute(app)

const PORT = process.env.PORT || 5000
mongoose.connection.once('connected',()=>{
    app.listen(PORT,()=>{
        console.log(`server is up and running on port ${PORT}`)
    })
    
})
