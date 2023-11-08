const express = require("express");
const userVerify = require("../middlewares/userverify");
const ApplyModel = require("../../models/applymodel");
const { User } = require("../../models/usermodel");
const verifyRouter = express.Router();
// CREATING API FOR GETTING ALL THE APPLIED USER

verifyRouter.get("/get-applied-users" , userVerify , async (req , res)=>{
    try {
        let applied = await ApplyModel.find({});
        for(let i =0;i<applied.length;i++){
            console.log(applied[i].user.ques.length);
        }
        console.log(applied.length);
        res.json(applied);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
});


verifyRouter.get("/get-users-only" , userVerify , async(req,res)=>{
    try {
        let appliedUsersare = [];
        let user = await User.find({});
        for(let i =0;i<user.length;i++){
            if(user[i].ques.length>0){
                appliedUsersare.push(user[i])
            }
        }
        res.json(appliedUsersare);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
})
module.exports = verifyRouter;