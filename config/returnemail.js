var mailer = require('nodemailer');
 function sendReturnMail(email){

  var smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
        user: "96931hitesh@gmail.com",
        pass: "9852158829"
    }
});

var mail = {
    from: "Hitesh Kumar <96931hitesh@gmail.com>",
    to: email,
    subject: "hank you for returning book,have a great time",
    text: "Thank you for returning book,have a great time",
    html: "<b>Keep learning</b>"
}

smtpTransport.sendMail(mail, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    smtpTransport.close();
});
}

module.exports=sendReturnMail

