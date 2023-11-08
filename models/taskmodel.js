const mongoose = require("mongoose");

const taskSchema = ({
    task_title:{
        type:String,
    },
    task_detail:{
        type:String,
    },
    task_guidlines:{
        type:String,
    },
    task_image:{
        type:String,
    },
    task_level:{
        type:String,
        default:"easy"
    }
});

const Task = mongoose.model("Task"  , taskSchema);
module.exports = {Task  , taskSchema};