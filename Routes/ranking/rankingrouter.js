const express = require("express");
const userVerify = require("../middlewares/userverify");
const { User } = require("../../models/usermodel");
const rankingRouter = express.Router();

//  CREATING API FOR GETTING THE USER AS PER THIER RAnKING

    rankingRouter.get("/get-ranking" , userVerify , async(req , res)=>{
        let user = await User.find({}).sort("pro_planet_rating : 1");
        user = user.reverse();
        res.json(user);
    })
module.exports = rankingRouter;