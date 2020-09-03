const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types
const User=require("./user")
const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
       
    },
    postedby:{
      type:Object,
      required:true
    }
})

module.exports=Post=mongoose.model("post",postSchema)