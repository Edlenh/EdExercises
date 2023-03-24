const Workout = require('../models/Workout')
const mongoose = require('mongoose')

//GET all workouts
const getWorkouts = async(req, res)=>{
    //empty object to find all wrokouts with no specific parameters
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}
//GET one workout
const singleWorkout = async(req,res)=>{
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Workout doesnt exist!'})
    }
    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(404).json({error: 'No Workout Found!'})
    }

    res.status(200).json(workout)
}

//POST - create new workout
const createWorkout= async(req,res)=>{
    const {title, reps, weight} = req.body

    //error handling
    let emptyFields =[]
    if(!title){
        emptyFields.push('title')
    }
    if(!weight){
        emptyFields.push('weight')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please Fill All Fields', emptyFields})
    }
    //adding document to db
    try{
    const workout = await Workout.create({title, reps, weight})
    res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error: error.message})
    }
};

//DELETE workout
const deleteWorkout = async(req,res)=>{
    const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Workout doesnt exist!'})
    }

    const workout = await Workout.findOneAndDelete({_id:id})

    if(!workout){
        return res.status(404).json({error: 'No Workout Found!'})
    }

    res.status(200).json(workout)
}
//PUT - update new workout
const updateWorkout = async(req,res)=>{
    const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Workout Doesnt Exist'})
    }

    const workout = await Workout.findOneAndUpdate({_id:id},{
        ...req.body
    }, {new:true})

    if(!workout){
        return res.status(404).json({error: 'No Workout Found!'})
    }

    res.status(200).json(workout)

}

module.exports = {
    createWorkout,
    getWorkouts,
    singleWorkout,
    deleteWorkout,
    updateWorkout
}