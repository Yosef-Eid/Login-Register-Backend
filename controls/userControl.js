// This file contains all the controllers for the user model
import User, { validateLogin, validateRegister, validateUpdate } from "../models/userSchema.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password')
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Get user by id
export const getUserId = async (req, res) => {

    try {
        const userId = await User.findById(req.params.id).select('-password')
        res.status(200).json(userId)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Register new user
export const register = async (req, res) => {
    const { error } = validateRegister(req.body)
    if (error) return res.status(400).json({ message: error.message })

    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) return res.status(400).json({ message: 'this user is already exited' })

        // password hashing
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)

        user = new User(req.body)
        const result = await user.save()

        // create token with register
        const token = jwt.sign({ id: user._id, name: user.name, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "30d" })
        const { password, ...other } = result._doc
        res.status(201).json({ ...other, token });

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//Login user
export const login = async (req, res) => {
    const { error } = validateLogin(req.body)
    if (error) return res.status(400).json(error.message)

    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(404).json({ message: 'error in email or password ' })

            // password hashing
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordMatch) return res.json({ message: 'error in email or password ' })

            // crete token with login
        const token = jwt.sign({ id: user._id, name: user.name, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '30d' })

        const { password, ...other } = user._doc
        res.status(200).json({ ...other, token });

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//Update user 
export const updateUser = async (req, res) => {

    if (req.user.id !== req.params.id) return res.status(403).json({ message: "no authorized to update this user" });

    const { error } = validateUpdate(req.body)
    if (error) return res.status(400).json(error.message)

        // password hashing with update user
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
    }

    try {
        let user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password')
        res.status(200).json(user)
    } catch (error) {

    }
}

//Delete user
export const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if (user)
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json({ message: 'user deleted' })
        } catch (error) {
            res.status(404).json({ message: 'user not found' })
        }

    else {
        res.status(404).json({ message: "user not found" });
    }
}