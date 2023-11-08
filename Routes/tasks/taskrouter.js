const express = require("express");
const userVerify = require("../middlewares/userverify");
const {Task} = require("../../models/taskmodel");

const taskRouter = express.Router();

// CREATING API FOR ASSIGNIG THE WEEKLY TASKS

taskRouter.post("/assign-task" , userVerify , async(req , res)=>{
    try {
        const {task_title , task_detail , task_image , task_guidlines , task_level} = req.body;
        let task = new Task({
            task_title,
            task_detail,
            task_guidlines,
            task_image,
            task_level

        });

        task = await task.save();
        res.json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});

    }
});

// CREATING API FOR GETTING ALL THE WEEKLY TASKS

taskRouter.get("/get-weekly-task" , userVerify , async(req,res)=>{
    try {
        let task = await Task.find({});
        res.json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
});


// CREATING API FOR GETTING THE TASK BASED ON CATEGORY


taskRouter.get("/get-category-task" , userVerify , async(req , res)=>{
    try {
        console.log(req.query.task_level);
        let task = await Task.find({task_level:req.query.task_level});
        res.json(task[0]);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
})

// CREATING API FOR DELETING THE SPECIFIC TASK 

taskRouter.post("/delete-specific-task" , userVerify , async (req , res)=>{
    try {
        const {taskid} =  req.body;
        let task  = await Task.findByIdAndDelete(taskid);
        res.json(task);

    } catch (error) {
        return res.status(500).json({error:error.message});
    }
})

module.exports = taskRouter;