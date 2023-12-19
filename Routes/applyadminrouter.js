const express = require("express");
const mongoose = require("mongoose");
const userVerify = require("./middlewares/userverify");
const { User } = require("../models/usermodel");
const applyAdmin = require("../models/applyadminmodel");


const applyadminRouter = express.Router();

    applyadminRouter.post("/apply-admin" , userVerify , async(req , res)=>{
        try {
           
            let existUser = await User.findById(req.user);
            
            const {idcardimage , permanenetaddress , age} = req.body;
            
            let applyadmin = new applyAdmin({
               user:existUser,
                idcardimage,
                permanenetaddress,
                age
            });
            console.log(applyadmin);
           await applyadmin.save();
        res.json(applyadmin);


      
            
        } catch (error) {
            return res.status(500).json({error:error.message});
        }
    })

module.exports = applyadminRouter;