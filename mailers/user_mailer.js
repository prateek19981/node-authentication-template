const nodeMailer = require("../config/nodemailer");

exports.newUser = (user)=>
{
    console.log("inside new user mailer");
    nodeMailer.transporter.sendMail({
        from:"gprateek558@gmail.com",
        to:user.email,
        subject:"welcome to our app",
        html:"<h1>this is whole new way to setup user auth in your app</h1>"

    },(err,info)=>{
        if(err)
        {
            console.log("err in sending mail",err);
            return;
        }

        console.log("message sent",info);
        return;

    })
}