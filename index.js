const express = require('express');
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
// importing passport local strategy
const passportLocal = require("./config/passport-local");
// importing passport google strategy
const passportGoogle = require("./config/passport-google-oauth2-strategy");
//used for creating session on user signin
const session = require("express-session");
//using flash messages
const flash = require("connect-flash");
//custom middleware to set flash to locals.user
const customMware = require('./config/middleware');
//for mailing 
const userMailer = require("./mailers/user_mailer");

//this file contains all the passwords used during development of this project
const secret = require("./secrets");


//initializing app
const app = express();

//used for parding form data
app.use(express.urlencoded());
//telling express where static files are stored
app.use('/user', express.static('./assets'));
app.use('/', express.static('./assets'));

//setting up session configuration "yourapppname" should be the name of app
app.use(session({
    name:"yourappname",
    secret:secret.sessionSecret,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }

}));

//initializing passport
app.use(passport.initialize());
//telling passport to create session
app.use(passport.session());
//telling passport to set authenticated user as the user who signed in
app.use(passport.setAuthenticatedUser);
//for using flash
app.use(flash());
app.use(customMware.setFlash);

//using layouts
app.use(expressLayouts)
//setting views directory
app.set('views','./views');
//setting view engine
app.set('view engine','ejs');
//setting routes
app.use('/',require('./routes'));










app.listen(port,(err)=>{
    if(err)
    {
        console.log(err);
        return;
    }

    console.log("server running on ",port)

})