const bcrypt = require("bcrypt");
const User = require("../models/users");
const userMailer = require("../mailers/user_mailer");







//render signup page
module.exports.signup = function(req,res)
{
    return res.render("user_signup");
}

//render signin page
module.exports.signin = function(req,res)
{
    return res.render("user_signin"); 
}


// create a new user
module.exports.create = async function(req,res)
{
    try
    {
        console.log(req.body);
        
        if(req.body.password!==req.body.confirmpassword)
        {
            req.flash("error","password and confirm password should match");
            return res.redirect("back");
        }

           
    
        
       
      
       
        let newuser = new User({
            email:req.body.email,
            name:req.body.name
        });

        newuser.password = newuser.generateHash(req.body.password)
    
        console.log(newuser);
        newuser.save();
        req.flash("success","user created");
        userMailer.newUser(newuser);y


        return res.redirect("signin");

    }

    catch(err)
    {
        console.log("error",err);
    }
   
    

    

}

//f user is authenticated create session
module.exports.createSession = function(req,res)
{

    req.flash('success','logged in successfully');
    res.redirect('/user/profile');

}

//render profile page
module.exports.profile = function(req,res)
{
    res.render('profile');
}

//logout from session
module.exports.destroySession = function(req,res)
{
    req.flash("success","logged out");
    req.logout();
    return res.redirect('/');
}