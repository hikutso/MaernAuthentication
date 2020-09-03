const express=require('express')
const router=express.Router()
const User =require("../models/user")
const bcrypt=require('bcryptjs')
const jwt=require("jsonwebtoken")
const {JWT_SECRET}=require("../config/keys")
const requireLogin=require("../middleware/requireLogin")
 


router.post('/signup',(req,res)=>{
    //console.log(req.body)
    const {name, email, password,repassword}=req.body
  //  console.log(req.body.name)
    if(password!==repassword){
     return   res.json({err:"password didnt match"})
    }
    if(!email || !password || ! name){
     return   res.json({error:"please add all the fields"})
    }
    User.findOne({email:email}).then((result)=>{
        if(result){
          return  res.json({message:"already registered"})
        }
         bcrypt.hash(password,10).then((hashpassword)=>{
            const user=new User({
                email,
                name,
                password:hashpassword
            })
            user.save().then((user)=>{
               return res.json({message:"successfful saved"})
            }).catch((err)=>{
                console.log(err)
            })
         })

       
    }).catch((err)=>{
        console.log(err)
    })


})

router.post('/signin',(req,res)=>{
    const email=req.body.email
    const password=req.body.password
    if(!email || !password){
       return res.json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfully signed in"})
               const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
               const {_id, name, email}=savedUser
               res.json({token,user:{_id,name,email}})
            }
            else{
                return res.json({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

module.exports=router