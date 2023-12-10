const express = require("express");
const { User } = require("../../models/usermodel");
const userVerify = require("../middlewares/userverify");
const Post = require("../../models/postmodel");

const impressionRouter = express.Router();

// CREATING API FOR LIKING AND COMMENTING THE USER POSTS
    impressionRouter.post("/like-user-post" , userVerify, async(req,res)=>{
        try {
            const {postid} = req.body; 
            let Existinguser = await User.findById(req.user);
            
            let post = await Post.findById(postid);
            console.log(post.likes.length);
          
            let found = false;
            
                for(let i =0;i<post.likes.length;i++){
                    if(post.likes[i].user.username==Existinguser.username){
                        found = true;
                    }
                }
                console.log(found);
                if(found){
                    await post.likes.remove({user:Existinguser});
                }
                else{
                    await post.likes.push({user:Existinguser});
                }
                await post.save();
            res.json(post.likes.length);
        } catch (error) {
            res.status(500).json({error:error.message});
        }
    });

// CREATING API FOR COMMENTING ON THE POST OF USER
    impressionRouter.post("/post-comment-user-post" , userVerify , async(req,res)=>{
        try {
            const {commentdetail , postid} = req.body;
            let user = await User.findById(req.user);
            let post = await Post.findById(postid);
            await post.comment.push({
                user:user,
                commentdetail:commentdetail
            });
            await post.save();
            res.json(post);

        } catch (error) {
            res.status(500).json({error:error.message});
        }
    });


//   CREATING API FOR FOLLOWING AND UNFOLLOWING THE USER
    impressionRouter.post("/follow-unfollow" , userVerify , async(req , res)=>{
        try {
            let currUser = await User.findById(req.user);
            let followUser = await User.find({username:req.query.username});
            
        } catch (error) {
            return res.status(500).json({error:error.message});
        }
    })
module.exports = impressionRouter;
