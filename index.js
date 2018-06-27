const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const port = process.env.port || 3000;
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

const user = require('./routes/users');
const config = require('./config/database');
const connection = mongoose.connect(config.database);
if(connection){
    console.log("database connected");
}else{
    console.log("database not connected");
}

app.use(express.static(path.join(__dirname,"public")));

app.use('/user',user);
app.get("/",function(req,res){
    res.send('hello world');
});

app.listen(port,function(){
    console.log("listen to port 3000");
});