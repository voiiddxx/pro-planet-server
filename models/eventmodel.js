const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    event_title:{
        type:String,
    },
    event_details:{
        type:String,
    },
    event_date:{
        type:String,
    },
    event_link:{
        type:String,
    },
    event_image:{
        type:String,
    },
});


const Event = mongoose.model("Event" , eventSchema);
module.exports = Event;