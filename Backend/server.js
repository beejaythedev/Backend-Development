const express = require('express');
const app = express();
const conn = require('./config/dbconnect.js')
const router = require('./route/userRoute.js')


app.use(express.json())

app.use('/', router)

app.listen(process.env.port, () =>{
    conn();
    console.log("Server is running at port 5000")
})