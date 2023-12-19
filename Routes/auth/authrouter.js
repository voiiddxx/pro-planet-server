const express = require("express");
const { User } = require("../../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

 
const authRouter = express.Router();

// === CREATTING ROUTE FOR REGISTERING THE USER ==== //

authRouter.post("/register" , async  (req , res)=>{
   try {
    const {username  , email , password , userprofile , pro_planet_level , pro_planet_rating , total_completed_task , category , company } = req.body;

    const Existingusername = await User.findOne({username});
    const ExistEmail = await User.findOne({email});

    if(Existingusername){
        console.log("username already registered");
        res.status(400).json({message:"username is already registered try with another username"});
    }
    else if(ExistEmail){
        console.log("email is already registered");
        res.status(400).json({message:"email address is already exist try with another email address"});
    }
    else{
        const hashPassword = await bcrypt.hash(password , 10);
        let user = new User({
            username , 
            email, 
            password:hashPassword,
            userprofile,
            pro_planet_level,
            follower:[],
            following:[],
            posts:[],
            pro_planet_rating,
            total_completed_task,
            category,
            company,
        });
        user =await user.save();
        res.json(user);

    }

   } catch (error) {
    console.log(error);
    res.status(500).json({error:error.message});
   }

    
});


// === CREATING ROUTE FOR LOGIN THE USER ==== //

authRouter.post("/login" , async(req , res)=>{
    try {
        const {username , password} = req.body;
        const existUser = await User.findOne({username});
        if(!existUser){
            console.log("Invalid Username");
            res.status(400).json({error:"Invalid Username"});
        }
        else{
            const isMatch = await bcrypt.compare(password , existUser.password);
            if(!isMatch){
                console.log("Wrong Password");
                res.status(400).json({error:"Invalid Password Try with another one"});
            }
            else{
                const token =  jwt.sign({id:existUser._id} , "Securekey");
                res.json({...existUser._doc , token})

            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
})



module.exports = authRouter;