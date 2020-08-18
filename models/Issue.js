const mongoose =require("mongoose");
const Schema=mongoose.Schema;

const ItemSchema2=new Schema({
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
    Name:{
        type:String,
        required:true,   
    }
    ,
    USN:{
        type:String,
        required:true,   
    }
    ,
    Email:{
        type:String,
        required:true,   
    },
    Number:{
        type:String,
        required:true,   
    }
    ,
    date:{
        type:Date,
        default:Date.now
    },
    

})
 module.exports=Item2=mongoose.model('Item2',ItemSchema2); 