const mongoose = require("mongoose");
const { userSchema } = require("./usermodel");

const eventSchema = mongoose.Schema({

    event_title:{
        type:String,
    },
    event_details:{
        type:String,
    },
    event_organization:{
        type:String,
    },
    event_date:{
        type:String,
    },
    event_link:{
        type:String,
    },
    event_location:{
        type:String,
    },
    event_image:{
        type:String,
    },
    event_extra_detail:{
        type:String
    },
    user:userSchema,
    
});


const Event = mongoose.model("Event" , eventSchema);
module.exports = Event;