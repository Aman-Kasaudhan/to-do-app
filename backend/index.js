import e from "express";
import cors from "cors"
import { Resend } from 'resend';

import {connection,collectionName} from './dbconfig.js'
import { ObjectId } from "mongodb";
const app=e();
app.use(cors({origin:"https://to-do-app-two-blond-87.vercel.app/"}));
app.use(e.json())
app.post("/add-task/:id",async(req,res)=>{
    const id=req.params.id
    const db=await connection();
    const collection=await db.collection(collectionName)
    const collection1=await db.collection('user')
    try{

   
        const resu =await collection1.findOne({_id :new ObjectId(id)});
        
        if(resu ){
        const result =await collection.insertOne(req.body);
        const taskId=result.insertedId
         
    await collection1.updateOne(
   { _id: new ObjectId(id) },
   {
      $push: {
         taskId: taskId
      }
   }
);
        res.send({
            massage:"new task added",
            success:true,
            result
        })
    
    }
    
}
catch(error){
        res.send({
            massage:"task not added",
            success:false
        })
        console.log(error)
        return;
    }
    
})   

app.get("/all-task/:id",async(req,res)=>{
 const db=await connection();
 const collection=await db.collection(collectionName)
//  const result=await collection.find().toArray();
const id =req.params.id
const collection1=await db.collection('user')
try{
    const user =await collection1.findOne({_id :new ObjectId(id)});
    // if()
    const result = await collection.find({
        _id: {
      $in: user.taskId
   }
}).toArray();
// console.log(result)
//    console.log(result)
 if(result){
    res.send({message:"Task list fetch successfully",success:true,result,user})
 }
else
 return res.send({message:"Tasks not fetch",success:false})
}
catch(error){
 console.log(error)
 return
}
})
app.delete("/delete-task/:id",async(req,res)=>{
    const id=req.params.id;
    // console.log(id)
    const db=await connection();
    const collection= await db.collection(collectionName)
    const result=await collection.deleteOne({_id:new ObjectId(id)})

    if(result){
    res.send({message:"Task list deleted successfully",success:true,result})
    }
    else{
    res.send({message:"Tasks not deleted",success:false})

    }
})

app.post("/delete-checked",async(req,res)=>{
    const db=await connection();
    const ids=req.body.checkedall;
    const deleteTask=ids.map((item)=>new ObjectId(item))
    // console.log(ids)
    const collection= await db.collection(collectionName)
    const result=await collection.deleteMany({_id:{$in: deleteTask}})

    if(result){
    res.send({message:"Task list deleted successfully",success:true,result})
    }
    else{
    res.send({message:"Tasks not deleted",success:false})

    }
})

import nodemailer from 'nodemailer'
import sendOtp from "./otp.js";
app.post("/send-otp",async(req,res)=>{
    const db=await connection();
    const collection= await db.collection('otp')

    const {email}=req.body
    const generatedOtp=  Math.floor(100000 + Math.random() * 900000);
   

    try{
        await sendOtp(email, generatedOtp);

    const result=await collection.insertOne({
        email,
        otp: generatedOtp,
        createdAt: new Date()
    })
// db.collectionName.dropIndex("createdAt_1")
   
// collection.createIndex(
//    { createdAt: 1 },
//    { expireAfterSeconds: 120}
// );
        res.send({
            message:"otp sent successfully",
            success:true,
            result
        })
   
}
catch(error){
    res.send({
            message:"otp sent fail",
            success:false,
           
        })
    console.log(error)
}
})

app.get("/verify-otp/:id",async(req,res)=>{
    
    const email=req.params.id
    const db=await connection();
    const collection= await db.collection('otp')
    // const id=req.params.id
    try{

        const result = await collection.findOne({email});

        
        if(result){
            res.send({message:"otp verified successfully",success:true,result})
        }
        else
        res.send({message:"otp not verified",success:false})
    }
    catch(error){
        // console.log(error)
        return;

    }

})
import jwt from 'jsonwebtoken'
app.post("/signup-form",async(req,res)=>{
  const db=await connection();
    const collection= await db.collection('user')
    const signUpdetail=req.body
    
    try{
        const result=await collection.insertOne(req.body)
        // console.log(result)
        const token = jwt.sign(
        {id:result.insertedId},
        "secretkey",
        { expiresIn: "7d" }
    );
// console.log(token)
    if(result){
            res.send({message:"signup successfully",success:true,result,token:token})
        }
        else
        res.send({message:"signup failed",success:false})
    }
    catch(error){
        console.log(error)
       return

    }
})

app.post("/email-check",async(req,res)=>{
  const db=await connection();
    const collection= await db.collection('user')
    const email=req.body;
   
    try{
        const result=await collection.findOne(email)

    if(result){
            res.send({message:"email found successfully",success:true,result})
        }
        else
        res.send({message:"email not found",success:false})
    }
    catch(error){
        console.log(error)
       return

    }
})

app.post("/login",async(req,res)=>{
  const db=await connection();
    const collection= await db.collection('user')
    const data=req.body;
    const email=req.body.email
   
    try{
        const result=await collection.findOne({email})
        // console.log(result.password)
        // console.log(data.password)
    if(result && result.password==data.password){
        
        const token = jwt.sign(
        { id: result._id },
        "secretkey",
        { expiresIn: "7d" })
            res.send({message:"login successfully",success:true,result,token:token})

    }
        else
        res.send({message:"login failed",success:false})
    }
    catch(error){
        console.log(error)
       return

    }
})
// app.get("/",(req,res)=>{
//     res.send({
//         message:"Basic api",
//         success:true
//     })
// })

app.listen(3200)

// console.log("hi")
