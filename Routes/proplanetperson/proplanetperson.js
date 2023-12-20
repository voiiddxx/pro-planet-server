const express = require("express");
const userVerify = require("../middlewares/userverify");
const { User } = require("../../models/usermodel");

const proplanetRouter = express.Router();

proplanetRouter.get("/verifiedpersons" , userVerify , async(req , res)=>{
    try {
        let user = await User.find({});
        let verifiedpersons = [];
        for( let i =0;i<user.length;i++){
            if(user[i].pro_planet_rating>1000){
                verifiedpersons.push(user[i]);
            }
       
        }
        res.json(verifiedpersons);

    } catch (error) {
        res.status(500).json({error:error.message});
    }
});
proplanetRouter.get("/nonverified" , userVerify , async(req , res)=>{
    try {
        let user = await User.find({});
        let verifiedpersons = [];
        for( let i =0;i<user.length;i++){
            if(user[i].pro_planet_rating<1000){
                verifiedpersons.push(user[i]);
            }
      
        }
        res.json(verifiedpersons);

    } catch (error) {
        res.status(500).json({error:error.message});
    }
});

module.exports = proplanetRouter;