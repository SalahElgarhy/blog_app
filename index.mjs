
import express from 'express';
import userRouter from './src/modules/User/User.controller.js'; 
import authRouter from './src/modules/auth/auth.controller.js'; 
import blogRouter from './src/modules/Blogs/Blog.controller.js';
import db from './src/DB/connection.js';

const app = express();
const port = 3000
app.use(express.json())


app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/blog", blogRouter);



// not found Handler

// app.all("*", (req, res) => {
//     return res.status(404).json({ message: "API not found" });
// })



app.listen(port, () => {
    console.log(`sever is run in port ${port}`);
})