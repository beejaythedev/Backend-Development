const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

const conn = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connection to MongoDB successful")
    }

    catch(error){
        console.error("Error connecting to MongoDB", error)
    }
}

module.exports = conn;