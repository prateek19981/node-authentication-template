const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const secrets = require("../secrets");

//transporter contains all info of the mail sender
let transporter = nodemailer.createTransport({
    service:"gmail", //name of mail providing service 
    host: "smtp.ethereal.email", //name of service host
    port: 587, //default port for smtp over tsl
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'gprateek558@gmail.com', // generated gmail user
      pass:secrets.password, // generated gmail password
    },
})


//used to set up the mail receiver will see
let renderTemplate = (data,relativePath)=>
{
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname,'../views/mailer'),
        data,
        function(err,template){
            if(err)
            {
                console.log("error in rendering template");
                return;
            }

            mailHtml = template;
        }
    )

    return mailHtml;




}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}