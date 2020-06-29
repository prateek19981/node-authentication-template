//import mongoose
const mongoose = require("mongoose");

//send connection request to db
mongoose.connect('mongodb://localhost/your_db_name');


//get connection object

let db = mongoose.connection;

//notify if error
db.on('error',console.error.bind(console,"error connection to db"));

//open the connection

db.once('open',()=>{
    console.log("db connected successfully")
;})





module.exports = db

