const express = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');

// import routes
const authRoute = require('./routes/auth');
const postRoutes = require('./routes/posts');
//middleware
app.use(express.json());

dotenv.config();


//connect to db
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true},
()=>console.log('connected to db')
);


// Routes middleware
app.use('/api/users',authRoute);
app.use('/api/users',postRoutes);

app.listen(3000,()=>{
    console.log("Server running");
})