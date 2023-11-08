const express = require("express");
const userVerify = require("../../middlewares/userverify");
const { User } = require("../../../models/usermodel");
const ApplyModel = require("../../../models/applymodel");

const questionRouter = express.Router();

// POST API FOR UPLOADING THE QUESTION ON THE SERVER

    questionRouter.post("/post-ques" , userVerify, async(req,res)=>{
        try {
            const{question , quesImage} = req.body;
            let user = await User.findById(req.user);
            await user.ques.push({
                question:question,
                quesImage:quesImage
            });
            await user.save();
            
            let ExistApply = await ApplyModel.find({});
            let found = false;
            for(let i =0;i<ExistApply.length;i++){
                if(ExistApply[i].user.username == user.username){
                    found = true;
                }
            }
            if(found===false){
                let apply = new ApplyModel({
                    user
                });
               await apply.save();
            }
            
            res.json(user);
            

        } catch (error) {
            res.status(500).json({error:error.message});
        }
    });


    // DELETING APPLIED USER FROM THE LIST


module.exports = questionRouter;