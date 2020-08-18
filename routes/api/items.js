const express=require("express")
const router=express.Router();

const Item=require("../../models/item")
const Item1=require("../../models/copyitem")
const Item2=require("../../models/Issue")
const sendMail =require('../../config/email') 
const sendReturnEmail=require('../../config/returnemail')
const IssuedBook=require("../../models/IssuedBook")



router.get('/',(req,res)=>{
    console.log(req.query.depName)
    Item.find({ depName:req.query.depName })
    .sort({date:-1})
    .then((items)=>{res.json(items)})
})

router.get('/issue',(req,res)=>{
    console.log("send by issue router")
    console.log(req.query)
     Item1.find({  $or: [{ depName:req.query.depName }, {bookName:req.query.bookName},{Author:req.query.Author},
      {Publication:req.query.Publication}      ]
    

})
    .sort({date:-1})
    .then((items)=>{res.json(items)})
})

//, bookName:req.query.bookName,Author:req.query.Author,Publication:req.query.Publication
router.post('/issuebook',(req,res)=>{
    var str=req.body.USN
    var usn=str.toLowerCase()
    const newItem2=new Item2({
        ID:req.body.ID,
        depName:req.body.depName,
        bookName:req.body.bookName,
        Author:req.body.Author,
        Publication:req.body.Publication,
        Volume:req.body.Volume,
        Name:req.body.Name,
        USN:usn,
        Email:req.body.Email,
        Number:req.body.Number 
    });
    newItem2.save()
    .then((item)=>{
        console.log("item is saved")
        console.log(req.body.copies)
        const number=req.body.copies
        res.json({bookName:"Book is saved "})
        sendMail(req.body.Email);
        Item1.updateOne({ID:req.body.ID}, {$set: {copies:number-1}}).then(()=>{console.log("updated")}).catch((error)=>{console.log(error)})        
    })
    .catch((error)=>{
        console.log(error)
        res.json({error:"some error is faced"})
    })
    ;
    
    const newIssuedToStudent=new IssuedBook({
        ID:req.body.ID,
        depName:req.body.depName,
        bookName:req.body.bookName,
        Author:req.body.Author,
        Publication:req.body.Publication,
        USN:usn,
    })
    newIssuedToStudent.save().then(()=>{
        console.log("saved to student portal")
    }).catch((error)=>{
        console.log(error)
    })
})

router.get('/studentactivebook',(req,res)=>{
    console.log(req.query)
    IssuedBook.find({ USN:req.query.USN })
    .sort({date:-1})
    .then((items)=>{res.json(items)})
})

router.post('/',(req,res)=>{
    const newItem=new Item({
        ID:req.body.ID,
        depName:req.body.depName,
        bookName:req.body.bookName,
        Author:req.body.Author,
        Publication:req.body.Publication,
        Volume:req.body.Volume,
        copies:req.body.copies,
        comments:req.body.comments 
    });
    newItem.save()
    .then((item)=>{
          console.log("item is saved")
        res.json({bookName:"Book is saved "})

        
    })
    .catch((error)=>{
        console.log(error)
        res.json({error:"some error is faced"})
    })
    ;

    const newItem1=new Item1({
        ID:req.body.ID,
        depName:req.body.depName,
        bookName:req.body.bookName,
        Author:req.body.Author,
        Publication:req.body.Publication,
        Volume:req.body.Volume,
        copies:req.body.copies,
        comments:req.body.comments 
    });
    newItem1.save()
    .then((item)=>{
        console.log("copyitem is saved")        
    })
    .catch(()=>{
        res.json({error:"some error is faced saving"})
    })
    ;
   


})

router.get('/getissued',(req,res)=>{
    var str=req.query.USN
    var usn=str.toLowerCase()

    Item2.find({ USN:usn })
    .sort({date:-1})
    .then((items)=>{res.json(items)})
})

router.delete('/returnbook',(req,res)=>{
  console.log(req.body.email)

  Item2.deleteOne({ID:req.body.ID}).then(()=>{  
      sendReturnEmail(req.body.email)
    console.log("deleted")}).catch(()=>{console.log("deleteion error")})

    Item1.find({ ID:req.body.ID })
    .sort({date:-1})
    .then((items)=>{
        console.log(items[0].copies)
        Item1.updateOne({ID:req.body.ID}, {$set: {copies:items[0].copies+1}}).then(()=>{console.log("updated")}).catch((error)=>{console.log(error)})        

    })

})




module.exports= router;