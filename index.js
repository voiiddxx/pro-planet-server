const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./Routes/auth/authrouter");
const UserRouter = require("./Routes/user/user");
const questionRouter = require("./Routes/auth/question/question");
const postRouter = require("./Routes/post/post");
const taskRouter = require("./Routes/tasks/taskrouter");
const verifyRouter = require("./Routes/Verify/verify");
const approveRouter = require("./Routes/approval/approve");
const responseRouter = require("./Routes/tasks/Respose");
const rankingRouter = require("./Routes/ranking/rankingrouter");
const impressionRouter = require("./Routes/Impressions/impression");
const eventRouter = require("./Routes/events/event");
const applyadminRouter = require("./Routes/applyadminrouter");
const proplanetRouter = require("./Routes/proplanetperson/proplanetperson");

const PORT = process.env.PORT|| 5000;
const app = express();



// ======= CONNECTION TO DATABASE ===== //
mongoose.connect("mongodb+srv://ursfan8102003:00000000@cluster0.bg8uzpn.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("Database Connected Successfully 📢");
}) .catch((e)=>{
    console.log(e);
})



//  ====== USING MIDDLEWARES ====//
app.use(express.json());
app.use(cors());

// CREATING STARTING ROUTE 




// ===== ADDING THE ROUTES ==== //
app.use(authRouter);
app.use(UserRouter);
app.use(questionRouter);
app.use(postRouter);
app.use(taskRouter);
app.use(verifyRouter);
app.use(approveRouter);
app.use(responseRouter);
app.use(rankingRouter);
app.use(impressionRouter);
app.use(eventRouter);
app.use(applyadminRouter);
app.use(proplanetRouter);




// ===== STARTING THE SERVER ====//

app.listen(PORT , ()=>{
    console.log(`Server is running at ${PORT} 🚀`);
})