const mongoose = require("mongoose");
const { userSchema } = require("./usermodel");

const applySchema = mongoose.Schema({
    user:userSchema,
});


const ApplyModel = mongoose.model("ApplyModel" , applySchema);

module.exports = ApplyModel;