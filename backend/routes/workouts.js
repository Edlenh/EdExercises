const express = require('express')
const {
    createWorkout,
    getWorkouts,
    singleWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')
const router = express.Router()

//GET all workouts
router.get('/', getWorkouts)

//GET ONE workout
router.get('/:id', singleWorkout)

//Create a new workout POST
router.post('/', createWorkout)

//DELETE workout
router.delete('/:id', deleteWorkout)

//Update workout
router.put('/:id', updateWorkout)


module.exports = router