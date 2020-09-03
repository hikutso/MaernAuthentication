const express=require("express")
const router=express.Router()
const mongoose=require("mongoose")
const Post =require("../models/post")
const requireLogin=require("../middleware/requireLogin")


const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    } 
})

var upload = multer({ storage: storage }).single("file")


router.post("/uploadImage",  (req, res) => {

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        console.log(res.req.file.path)
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })

});


router.post('/createpost',(req,res)=>{
    console.log(req.body)
    //const {title, body}=req.body
    // if(!title || !body){
    //     res.json("please add all the feilds")
    // }
    // req.user.password=undefined
    // const post=new Post({   
    //     title,
    //     body,
    //     postedby:req.user
    // })
    // post.save().then(()=>{
    //     console.log("record is saved")
    // }).catch((err)=>{
    //     console.log(err)
    // })
})



module.exports=router