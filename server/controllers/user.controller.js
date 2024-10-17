import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const UserController = {
    register: async (req, res) => {
        try{
            // create a new user with form data 
            const newUser = await User.create(req.body)
            // ! Generate JWT and send with response 
            const userToken = jwt.sign(
                {userId:newUser._id, username:newUser.username},
                process.env.SECRET_KEY
            )
            res.cookie('userToken', userToken, {httpOnly:true})
            res.status(201).json(newUser)
        }
        catch(err){
            res.status(500).json(err)
        }
    },
    login: async (req, res) => {
        try{
            // check if the user exists by userName 
            const {userName, password} = req.body
            const potentialUser = await User.findOne({userName})
            console.log(potentialUser);
            if(!potentialUser){
                return res.status(404).json({message:'User not found register now'})
            }
            // if we've gotten to this point the user exists by userName 
            // check to see if passwords match
            const passwordsMatch = await bcrypt.compare(password, potentialUser.password)
            if(!passwordsMatch){
                return res.status(400).json({message:'Invalid credentials'})
            }
            // Log user in (generate jwt)
            const userToken = jwt.sign(
                {userId:potentialUser._id, username:potentialUser.username, role:potentialUser.role},
                process.env.SECRET_KEY
            )
            res.cookie('userToken', userToken, {httpOnly:true})
            res.status(201).json(potentialUser)
        }
        catch(err){
            res.status(500).json(err)
        }
    },
    logout: async (req, res) => {
        res.clearCookie('userToken')
        res.status(200).json({message:'Successfuly Logged Out! '})
    },
    getLoggedInUser: async (req, res) => {
        try{
            const {id} = req.params
            console.log(id);
            console.log(req.params);
            const user = await User.findById(id)
            res.status(200).json(user)
        }
        catch(err){
            res.status(500).json(err)
        }
    },

    // Update User
    updateUser: async (req, res) =>{
        const id = req.params.id
        const options = { new:true, runValidators:true}
        try {
            const updateUser = await User.findByIdAndUpdate(id, req.body, options)
            res.status(201).json(updateUser)
        } 
        catch(err) {
            return res.status(500).json(err)
        }
    },

    // Delete User
    deleteUser: async (req, res) =>{
        const id = req.params.id
        try {
            await User.findByIdAndDelete(id)
            return res.status(204).send()
        } 
        catch(err){
            return res.status(500).json(err)
        }
    }
}