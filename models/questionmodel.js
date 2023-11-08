const mongoose = require("mongoose");
const { userSchema } = require("./usermodel");

const questionShema = mongoose.Schema({
    user:userSchema,
    ques:[
        {
            question:{
                type:String,
            },
            quesimage:{
                type:String,
            }
        }
    ]
});

const Question = mongoose.model("Question" , questionShema);
module.exports = {Question , questionShema};