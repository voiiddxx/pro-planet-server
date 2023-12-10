const express = require("express");
const userVerify = require("../middlewares/userverify");
const { User } = require("../../models/usermodel");
const Post = require("../../models/postmodel");
const mongoose = require("mongoose");

const postRouter = express.Router();
// CREATING API FOR ADDING THE POST

postRouter.post("/post" , userVerify , async(req , res)=>{
    try {
        const {title , postimage} = req.body;
        let user = await User.findById(req.user);
        let post = new Post({
            user:user,
            title,
            postimage,
            like:[],
            Comment:[]
        });

        post = await post.save();
        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
})

// ====== ROUTER FOR GETTING ALL THE POSTS =====//

postRouter.get("/get-all-post" , userVerify , async(req , res)=>{
    try {
        let post = await Post.find({});
        post = post.reverse();
        res.json(post);
    } catch (error) {
        console.log(error);
    }
});


postRouter.post("/get-post-comment" , userVerify , async(req , res)=>{
    try {
        let post = await Post.find({_id:req.query.postid});
        res.json(post);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
});




// CREATING API FOR GETTING THE CURRENT USER POSTS

    postRouter.get("/get-user-post" , userVerify , async(req , res)=>{
        try {
            let user = await User.findById(req.user);
            let post = await Post.find({user:user});
            res.json(post);
        } catch (error) {
            res.status(500).json({error:error.message});
        }
    });


//  CREATING API FOR GETTING THE SPECIFC USER POSTS

    postRouter.get("/specific-user-post" , userVerify , async(req , res)=>{
        try {
            let user = await User.find({username:req.query.username});
            const serachUserNow = user[0];
            let post = await Post.find({user:serachUserNow});
            res.json(post);
        } catch (error) {
            return res.status(500).json({error:error.message});
        }
    })
module.exports = postRouter;