const express = require('express');
require('./db/mongoose')
const userRouter = require('./routers/users')
const app = express()

app.use(express.json())
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Methods', '*')
    next();
})

app.use(userRouter)

app.listen(3200 , ()=>{
    console.log('Server is running');
})

// https://localhost:3000/createUser