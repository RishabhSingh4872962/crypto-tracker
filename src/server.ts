import express from "express";


const app=express();
const port=3000;

app.get("/",function(req,res,next){

    res.status(200).send({success:true,msg:"server is running"})
})


app.listen(port,function () {
    console.log(`Server is listeing on port ${port}`);
    
})