const express = require('express')
const {
    createWorkout,
    getWorkouts,
    singleWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

const requireAuth = require('../middleware/requireAuth');
const router = express.Router()
//if user is not authenticated they cannot access the routes
router.use(requireAuth)
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