const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const userRouter = require("./routes/users.js");
const authRouter = require("./routes/auth.js");
const postRouter = require("./routes/posts");
const commentRouter = require("./routes/comments")

dotenv.config(); 

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("mongo db database connected");
})

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/uploads", express.static("uploads"));
app.use("/socialapp/api/users",userRouter)
app.use("/socialapp/api/auth",authRouter)
app.use("/socialapp/api/post",postRouter)
app.use("/socialapp/api/post/comment",commentRouter)

app.listen(8200,()=> {
    console.log("app is running on " +8200)
})