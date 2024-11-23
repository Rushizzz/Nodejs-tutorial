const  express = require('express');
const fs = require("fs");

const { logReqRes } = require("./middlewares")
const { connectMongoDb } = require('./connection')
const userRouter = require('./routes/user')

const app = express();
const PORT = 8000;

//Connection
connectMongoDb('mongodb://127.0.0.1:27017/nodejs-tutorial');

app.use(express.urlencoded({ extended: false}));

app.use(logReqRes("log.txt"));

//Routes
app.use("/api/user", userRouter);

app.listen(PORT, () => console.log("Server started"));
