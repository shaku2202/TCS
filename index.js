const express=require('express');
const {connection}=require('./db');
const {userRouter}=require('./routes/user.routes');
const {employeeRouter} = require('./routes/employee.routes');
const cors = require('cors');


const app=express();
app.use(express.json());
app.use(cors());

app.use("/users",userRouter);
app.use('/emp',employeeRouter);

app.get('/',(req,res)=>{
    res.send("Welcome to home page");
})


app.listen(4500,async()=>{
    try{
       await connection,
       console.log("connected to db");
       console.log("Server is running at port 4500");
    
    }
    catch(err){
        console.log(err);
    }
    
})