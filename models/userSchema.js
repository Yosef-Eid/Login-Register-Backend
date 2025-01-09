import mongoose from "mongoose";
import joiPasswordComplexity from "joi-password-complexity";
import Joi from "joi";

/**
 * userSchema
 * 
 * @param {String} name - user name
 * @param {String} email - user email
 * @param {String} password - user password
 * @param {Boolean} isAdmin - is user admin
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 100,
        required: true,
    },

    email: {
        type: String,
        minlength: 3,
        maxlength: 100,
        required: true,
    },

    password: {
        type: String,
        minlength: 8,
        maxlength: 100,
        required: true,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true });

/**
 * validateRegister
 * 
 * @param {Object} user - user object
 * 
 * @returns {Object} - validated object
 */
export const validateRegister = (user) => {
    const register = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().min(3).max(100).required(),
        password: joiPasswordComplexity().required(),
    })
    return register.validate(user)
}

/**
 * validateLogin
 * 
 * @param {Object} user - user object
 * 
 * @returns {Object} - validated object
 */
export const validateLogin = (user) => {
    const login = Joi.object({
        email: Joi.string().min(3).max(100).required(),
        password: Joi.string().required(),
    })
    return login.validate(user)
}

/**
 * validateUpdate
 * 
 * @param {Object} user - user object
 * 
 * @returns {Object} - validated object
 */
export const validateUpdate = (user) => {
    const update = Joi.object({
        name: Joi.string().min(3).max(100),
        email: Joi.string().min(3).max(100),
        password: joiPasswordComplexity(),
    })
    return update.validate(user)
}

const User = mongoose.model('User', userSchema)
export default User
