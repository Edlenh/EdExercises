const User = require('../models/User')
const jwt = require('jsonwebtoken')

//set up JWTs
const createToken = (_id)=>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '2d'})
}
//login user 
const loginUser =async (req,res)=>{
    const {email, password} = req.body
    try{
        const user = await User.login(email,password)
        //assign a token to the user
        const token = createToken(user._id)
        res.status(200).json({email, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
};
//create new user

const signUpUser = async(req,res)=>{
    const {email, password} = req.body
    try{
        const user = await User.signup(email,password)
        //assign a token to the user
        const token = createToken(user._id)
        res.status(200).json({email, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
};

module.exports = {signUpUser, loginUser}