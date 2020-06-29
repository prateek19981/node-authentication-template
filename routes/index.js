const express = require('express');
const router = express.Router();
const homeController = require("../controllers/homeController");
const db = require("../config/mongoose");

//homepage
router.get('/',homeController.home);

//for user routes
router.use('/user',require('./users'));










module.exports = router;