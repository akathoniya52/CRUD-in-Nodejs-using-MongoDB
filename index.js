const express = require('express')
const userRouter = require('./routes/user')

const { connectMongoDb } = require('./Connection')
const url = 'mongodb+srv://amit:amit@cluster0.yxzqkkl.mongodb.net/'

const { logReqRes } = require('./middlewares/index')

const app = express();
const PORT = 8000;

// connection
connectMongoDb(url)

// middleware
app.use(express.urlencoded({ extended: false }))
app.use(logReqRes('log.txt'))


// Routes
app.use("/api/users",userRouter);



app.listen(PORT,()=>console.log(`Server Started ${PORT}`))