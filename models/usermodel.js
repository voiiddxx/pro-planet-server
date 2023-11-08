const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type:String,
    },
    userprofile:{
        type:String,
        default:"https://e7.pngegg.com/pngimages/867/694/png-clipart-user-profile-default-computer-icons-network-video-recorder-avatar-cartoon-maker-blue-text.png"
    },
    email:{
        type:String,
    },
    pro_planet_level:{
        type:Number,
        default:0,
    },
    
    password:{
        type:String
    },
    posts:[

    ],
    pro_planet_rating:{
        type:Number,
        default:0
    },
    total_completed_task:{
        type:Number,
        default:0
    },
    category:{
        type:String,
        default:"user"
    },
    ques:[
        {
            question:{
                type:String,
            },
            quesImage:{
                type:String
            }
        }
    ]
});

const User = mongoose.model("User" , userSchema);
module.exports = {User , userSchema};