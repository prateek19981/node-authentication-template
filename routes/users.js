const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require("passport");


router.get("/signup",userController.signup);
router.get("/signin",userController.signin);
router.post("/create",userController.create);
//check if user is authenticated if not go to failure redirect else create session
router.post("/create-session",passport.authenticate('local',{failureRedirect:'/user/signin'}),userController.createSession);
//render profile if user is authenticated
router.get('/profile',passport.checkAuthentication,userController.profile);
router.get('/logout',userController.destroySession);
//this is the route to redirect to the oauth api of google
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
//after successfull oauth signin go to this route
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/user/signin'}),userController.createSession);
module.exports = router;
