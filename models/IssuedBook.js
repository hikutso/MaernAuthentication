const mongoose =require("mongoose");
const Schema=mongoose.Schema;
//create schema

const IssuedBook=new Schema({
    USN:{
        type:String,
        required:true,   
    },
    ID:{
        type:String,
        required:true,   
    },
    depName:{
        type:String,
        required:true,   
    },
    bookName:{
        type:String,
        required:true,   
    },
    Author:{
        type:String,
        required:true,   
    }
    ,
    Publication:{
        type:String,
        required:true,   
    } 
    , date:{
        type:Date,
        default:Date.now
    },
    
  
    
})
 module.exports=issuedBook=mongoose.model('issuedBook',IssuedBook); 