const express=require("express")
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const items=require("./routes/api/items")
var cors = require('cors')
require("dotenv").config();

const app=express();

//middlewre body parser
app.use(bodyParser.json());
app.use(cors())
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  )
//db config
const db=require("./config/keys").mongoURI
//connect to mogodb
mongoose.connect(db,{useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
    console.log("mongodb connected")
}).catch(()=>{
    console.log("some error ")
})
mongoose.set('useCreateIndex', true)

var Users = require('./routes/api/userRouter')
 
app.use('/users', Users)

app.use('/api/items',items);

const port =process.env.PORT || 5000;
app.listen(port, ()=>console.log("server started at port 6000"))