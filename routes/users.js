const express = require('express');
const router = express.Router();
const User = require("../models/user");
const jwt = require('jsonwebtoken');
const config = require("../config/database")
const passport = require('passport');


const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser());

router.post("/register",function(req,res){
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password

    });


User.saveUser(newUser,function(err,user){
    if(err){
        res.json({state:false,msg:"data not inserted"});
    }
    if(user){
        res.json({state:true,msg:"data inserted"});
    }
});

});

router.post("/login",function(req,res){
    const email = req.body.email;
    const password = req.body.password;
    User.findByEmail(email,function(err,user){
        if(err) throw err;

        if (!user){
             res.json({state:false,msg:"no user found"});
             return false;
        }
        User.passwordCheck(password,user.password,function(err,match){
        if(err) throw err;
        if (match){
            const token = jwt.sign(user.toJSON(),config.secret,{expiresIn:86400});
             res.json({
                 state:true,
                 token:"Bearer "+ token,
                 user:{
                     id:user._id,
                     username:user.username,
                     email:user.email


                 }
                 


             });

        }
        else{
            res.json({state:false,msg:"password does not match"});
        }
    });
});
});

router.get('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.json({user:req.user});
    }
);

module.exports = router;