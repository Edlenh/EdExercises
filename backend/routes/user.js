const express = require('express')
//controller functions
const{loginUser, signUpUser} = require('../controllers/userController')
const router = express.Router()

//login user route

router.post('/login', loginUser)


//sign up user route - create new user
router.post('/signup', signUpUser)
//log out user route



module.exports = router