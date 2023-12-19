const mongoose = require("mongoose");
const { userSchema } = require("./usermodel");


const applyadminSchema = mongoose.Schema({
    user:userSchema,
    idcardimage:{
        type:String,
    },
    permanenetaddress:{
        type:String,
    },
    age:{
        type:String,
    },
    
});

const applyAdmin = mongoose.model("applyAdmin" , applyadminSchema);
module.exports = applyAdmin;