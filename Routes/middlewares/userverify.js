const express = require("express");
const jwt = require("jsonwebtoken");

const userVerify = async (req , res , next)=>{
    try {
        const token = req.header("x-auth-token");
        if(!token){
            return res.status(404).json({error:"Token not found"});
        }
        const isVerified = await jwt.verify(token , "Securekey");
        if(!isVerified){
            return res.status(401).json({error:"Unauthorized User"});
        }
        req.token = token;
        req.user = isVerified.id;
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
}
module.exports = userVerify;
