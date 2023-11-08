const mongoose = require("mongoose");
const { userSchema } = require("./usermodel");

const postShema = mongoose.Schema({
    user:userSchema,
    title:{
        type:String,
    },
    postimage:{
        type:String,
    },
    likes:[
        {
            user:userSchema,
        }
    ],
    comment:[
        {
            user:userSchema,
            commentdetail:{
                type:String,
            }
        }
    ],

});

const Post = mongoose.model("Post" , postShema);
module.exports = Post;
