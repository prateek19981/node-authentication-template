const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/users");


//setting local strategy to passport
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true

},function(req,email,password,done){
    User.findOne({email:email},function(err,user){
        if(err)
        {
            console.log("user not found",err)
            return done(err);
        }

        if(!user||!user.validPassword(password))
        {
            req.flash("error","wrong username or password");
            console.log("wrong username or password");
            return done(null,false);
        }

        console.log("user authenticated");

        return done(null,user);
        



    })

}))

//serialising user to decide which key is to be kept in browser

passport.serializeUser(function(user,done){
    
    return done(null,user.id);

})

//deserialize user
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err)
        {
            console.log("error in finding user-->passpirt");
            return done(err);
        }

        return done(null,user);
    })
});


//checking if user is authenticated
passport.checkAuthentication = function(req,res,next)
{
    if(req.isAuthenticated())
    {
        console.log("user is authenticated");
        return next();
    }


    req.flash("error","user not authenticated");
    console.log("user is not authenticated");
    return res.redirect("/user/signin");

}

//set auth user to locals

passport.setAuthenticatedUser = function(req,res,next)
{
    if(req.isAuthenticated())
    {
        res.locals.user=req.user;
        console.log("user added");
    }

    next();
}



module.exports = passport;