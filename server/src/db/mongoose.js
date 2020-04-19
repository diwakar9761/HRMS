// Import Mongoose
const mongoose = require('mongoose');

//making database URL
const connectionUrl = "mongodb://localhost:27017/hrms-api"
console.log(connectionUrl);


//connect mongoose with mongoDB
mongoose.connect(
    connectionUrl, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}
)