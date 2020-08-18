var mailer = require('nodemailer');
 function sendMail(email){

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
    subject: "You have been issued a book, Please return on time",
    text: "You have been issued a book, Please return on time",
    html: "<b>You have been issued a book, Please return on time</b>"
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

module.exports=sendMail

