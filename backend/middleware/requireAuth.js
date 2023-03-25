const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAuth = async (req,res,next)=>{
    //next invokes the next middleware after this one runs
    //verify auth

   const {authorization} = req.headers

   if(!authorization){
    //check auth
    return res.status(401).json({error: 'Authorization Token Required'})
   }

   const token = authorization.split(' ')[1]

   try{
    const {_id}= jwt.verify(token, process.env.SECRET)

    req.user = await User.findOne({_id}).select('_id')
    next()

   }catch(error){
    console.log(error)
    res.status(401).json({error: 'Request Denied, not authorized'})
   }
}

module.exports = requireAuth