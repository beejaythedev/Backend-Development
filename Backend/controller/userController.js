const User = require('../model/userModel.js')
const mongoose = require('mongoose')


const createUser = async (req, res) => {

    // Check if all fields are provided
        const {name, email, password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({message: 'Please fill all fields'})
        }

        try{
            // Check if email already exists
            const existingUser = await User.findOne( { email })
            if(existingUser){
                return res.status(400).json({success: false, message:"User Already Exist"})
            }

            //creates the user
            const newUser = new User({name, email, password})
    
            await newUser.save();
            res.status(201).json({message: "User created successfully"})
        }
    
        catch(error){
            res.status(500).json({message: error.message})
        }
       
}

const updateUser = async (req, res) => {
    const user = req.body;
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: 'Invalid User Id'})
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(id, user, {new: true})
        res.status(400).json({success: true, data: updatedUser})
    }
    catch(error){
        res.status(500).json({success: false, message: "Server Error"})
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    console.log(id)

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: 'Invalid User Id'})
    }
    try{
        const removeUser = await User.findByIdAndDelete(id)

        if(!removeUser){
            return res.status(404).json({success: false, message: "User not found"})
        }
        
        res.status(200).json({success: true, message:"User successfully deleted"})
       
    }
    catch(error){
        console.error("Error", error)
        res.status(500).json({success: false, message: "Server Error"})
    }

}
const getAllUsers = async (req, res) => {
    try{
        const allUsers = await User.find({})
        console.log(allUsers)
        res.status(200).json({success: true, message:"all users returned", data: allUsers})
    }
    catch(error){
        console.error(error)
        res.status(500).json({success: false, message:"Internal Serve Error"})
    }

}
module.exports = { createUser, updateUser, deleteUser, getAllUsers }


