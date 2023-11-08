const mongoose = require("mongoose");
const { userSchema } = require("./usermodel");
const { taskSchema } = require("./taskmodel");

const responseSchema = mongoose.Schema({
    user:userSchema,
    task:taskSchema,
    image:{
        type:String,
    },
    extradetail:{
        type:String,
    }
});

const Response = mongoose.model("Response" , responseSchema);

module.exports = Response;