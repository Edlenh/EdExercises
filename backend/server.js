require('dotenv').config()

const express = require('express')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const mongoose = require('mongoose')

//express app
const app = express()

//set up the PORT 
const PORT = process.env.PORT || 4000

//middleware
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})


//setting up routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)
//connect to db - mongoose
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(PORT, ()=>{
    console.log(`connected to db and listening to port at http://localhost:${PORT}`,)
    })
})
.catch((error)=>{
    console.log(error)
})


