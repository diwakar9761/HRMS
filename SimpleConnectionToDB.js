// Make index.js , db -> mongoose.js , models -> users.js , reouters -> users.js

// index.js ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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

// mongoose.js ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Import Mongoose
const mongoose = require('mongoose');

//making database URL
const connectionUrl = "mongodb://localhost:27017/hrms-api"
console.log(connectionUrl);


//connect mongoose with mongoDB
mongoose.connect(
    connectionUrl, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}
)




// model -> users.js ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const mongoose = require('mongoose');

const User = mongoose.model(
    'User',
    {
        firstName : {
            type : String
        },
        lastName : {
            type : String
        },
        age : {
            type : Number
        },
        email : {
            type : String
        },
        password : {
            type : String
        }
    }
)
console.log(User);

module.exports = User



// routers -> users.js ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const express = require('express');
const router = new express.Router();
const User = require('../models/users')

// creating new user
router.post('/createUser', async (req, res)=>{    
    const user = new User(req.body);
    try{
        await user.save()
        res.status(201).send({data : user, message: 'User Created Successfully!'})
    }
    catch(error){
        res.status(400).send(error)
    }
})

module.exports = router