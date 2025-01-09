import express from "express";
const app = express()
import dotenv from "dotenv";
// import and config dotenv
dotenv.config();
// import and connect to mongoDB
import connectDB from "./config/db.js";
connectDB();
// import userRouter
import userRouter from './router/userRouter.js'
// import cors middelware
import cors from 'cors'
// use cors middelware
app.use(cors());
// use express.json() middelware
app.use(express.json());
// use express.urlencoded() middelware
app.use(express.urlencoded({ extended: true }));
// use userRouter
app.use('/', userRouter)

// start server
app.listen(process.env.PORT, () => {
    console.log(`connect database http://localhost:${process.env.PORT}`);
})

