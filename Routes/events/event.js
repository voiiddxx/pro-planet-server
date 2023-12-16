const express = require("express");
const userVerify = require("../middlewares/userverify");
const Event = require("../../models/eventmodel");
const { User } = require("../../models/usermodel");

const eventRouter = express.Router();


eventRouter.post("/add-event" , userVerify , async(req,res)=>{
    try {
        const {event_title , event_details ,event_organization, event_date , event_link , event_image , event_location} = req.body;
        let user = await User.findById(req.user);
        
        let event = new Event({
            event_title,
            event_details,
            event_organization,
            event_date,
            event_link,
            event_location,
            event_image,
            user
        });

        await event.save();
        res.json(event);
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
})
module.exports = eventRouter;