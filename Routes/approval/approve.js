const express = require("express");
const userVerify = require("../middlewares/userverify");
const { User } = require("../../models/usermodel");
const { Question } = require("../../models/questionmodel");
const Response = require("../../models/responsemodel");
const approveRouter = express.Router();

    // CREATING API FOR APPROVING THE USER PRO PLANET REQUESTS

    approveRouter.post("/approve-verify-req" , userVerify , async(req,res)=>{
        const {id , postid} = req.body;
        let user = await User.findById(id);
        if(user.pro_planet_rating<600){
            user.pro_planet_rating +=100;
            await user.save();
        }
        let Delquestion;
        for(let i =0;i<user.ques.length;i++){
            if(postid == user.ques[i]._id){
                Delquestion = user.ques[i];
                
            }
        }
        if(Delquestion){
            user.ques.remove(Delquestion);
        await user.save();
        }
        
        res.json(user);                                     
    } );


    // CREATNG API FOR APPROVIG THE WEEKLY TASKS 

    approveRouter.post("/approve-weekly-task" , userVerify , async(req,res)=>{
        try {
            const {userid , task_level , submitid}= req.body;
         let user = await User.findById(userid);
         let prev = user.pro_planet_rating;


         if(prev<1000){
            neededcointolevelup = 1000-prev;
         }
         else{
            let coinswehave = prev-1000;
            neededcointolevelup = 1000-coinswehave;
         }
         let neededcointolevelup = 1000-prev;
         let proplanetaddingvalue = 0;


         if(task_level==="Medium"){
            user.pro_planet_rating+=100;
            proplanetaddingvalue = 100;


         }
         if(task_level==="Easy"){
            user.pro_planet_rating+=50;
            proplanetaddingvalue =50;
         }
         if(task_level==="Hard"){
            user.pro_planet_rating+=200;
            proplanetaddingvalue = 200;
         }

         if(proplanetaddingvalue >= neededcointolevelup){
            user.pro_planet_level+=1;
         }
 

         user.total_completed_task+=1;

         let sumbitresponse = await Response.findByIdAndDelete(submitid);
         await user.save();
        res.json(user);
        } catch (error) {
            res.status(500).json({error:error.messsege});
        }
    });


    // CREATING API FOR NOT APPROVING THE TASK REQUEST

    approveRouter.post("/decline-req" , userVerify , async(req,res)=>{
        try {
            const {submitid} = req.body;
            let sumbitresponse = await Response.findByIdAndDelete(submitid);
            res.json({message:"Task Declined"});
        } catch (error) {
            return res.status(500).json({error:error.messsege});
        }
    });


    // CREATING API FOR REMOVING TASK

    approveRouter.post("/decline-pro-planet-req" , userVerify ,  async(req , res)=>{
        try {
            const {id , postid} = req.body;
            let user = await User.findById(id);
            let Delquestion;
            for(let i =0;i<user.ques.length;i++){
                if(postid == user.ques[i]._id){
                    Delquestion = user.ques[i];
                    
                }
            }
            if(Delquestion){
                user.ques.remove(Delquestion);
       
            }
            await user.save();
            
            res.json(user); 
        } catch (error) {
            return res.status(500).json({error:error.message});
        }
    })
module.exports = approveRouter;