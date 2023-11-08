const express = require("express");
const userVerify = require("../middlewares/userverify");
const Response = require("../../models/responsemodel");

const responseRouter = express.Router();

// CREATING API FOR REGISTERING THE REPONSES OF TASKS

responseRouter.post("/register-response" , userVerify , async(req , res)=>{
    try {
        const {user , task , image , extradetail} = req.body;
        let reponseoftask = new Response({
            user,
            task,
            image,
            extradetail
        });
        await reponseoftask.save();
        res.json(reponseoftask);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
});


// CREATING API FOR GETTING ALL THE RESPONSES OF TASKS

    responseRouter.get("/get-responses" , userVerify , async (req,res)=>{
        try {
            let response = await Response.find({});
            res.json(response);
        } catch (error) {
            res.status(500).json({error:error.message});
        }
    })

    // CREATING API FOR GETTING ALL THE TASK FOR ADMIN ONLY

module.exports = responseRouter;