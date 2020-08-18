const mongoose =require("mongoose");
const Schema=mongoose.Schema;
//create schema

const ItemSchema=new Schema({
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
    ,
    Volume:{
        type:String,
        required:true,   
    }
    ,
    copies:{
        type:Number,
        required:true,   
    },
    
    comments:{
        type:String,
         
    },
    date:{
        type:Date,
        default:Date.now
    }
})
 module.exports=Item=mongoose.model('Item',ItemSchema); 