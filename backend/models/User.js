const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    }
});

//sign up method 
userSchema.statics.signup = async function(email,password){
    //validation 
    //check if all info is provided
    if(!email || !password){
        throw Error('Please Fill in All Fields')
    }
    if(!validator.isEmail(email)){
        throw Error('Please Provide Valid Email')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Weak Password')
    }

    const userExists = await this.findOne({email})
    //if user already exists check
    if(userExists){
        throw Error('Email already exists')
    }
    //password hashing
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password : hash})

    return user

}
//login method

userSchema.statics.login = async function(email,password){
    if(!email || !password){
        throw Error('Please Fill in All Fields')
    }
    const user = await this.findOne({email})
    //if user already exists check
    //avoid specifc error messages
    if(!user){
        throw Error('Email or Password not valid')
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error('Email or Password not valid')
    }
    return user
}
module.exports = mongoose.model('User',userSchema)