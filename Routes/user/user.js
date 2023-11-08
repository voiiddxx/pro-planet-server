const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/usermodel");
const UserRouter = express.Router();
const userVerify = require("../middlewares/userverify")



// API FOR GETTING CURRENT USER DATA
 
UserRouter.get("/get-curr-user" , userVerify , async (req , res)=>{
  try {
    const user = await User.findById(req.user);
    res.json(user);
  } catch (error) {
    res.status(500).json({error:error.message});
  }
})


// GETTING THE USER BASIS ON USERID

UserRouter.get("/get-specific-user" , userVerify , async (req,res)=>{
    try {
      let user = await User.find({username:req.query.username});
      res.json(user[0]);
    } catch (error) {
      console.log(error);
      res.status(500).json({error:error.message})
    }
})


//  CREATUNG API FOR UPDATING THE USERPROFILE 

  UserRouter.patch("/update-profile" , userVerify , async(req,res)=>{
    try {
        const {userprofile} = req.body;
        let user = await User.findByIdAndUpdate( req.user , {userprofile:userprofile} , {
          new:true
      });
      res.json("Done")
    } catch (error) {
      console.log(error);
      res.status(500).json({error:error.message});
    }
  })



  module.exports = UserRouter;