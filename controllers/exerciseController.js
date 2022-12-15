const asyncHandler = require('express-async-handler')
const Exercise = require('../models/exerciseModel')
const User = require('../models/userModel')

// @desc    Get exercises
// @route   GET /api/exercises
// @access  Private
const getExercises = asyncHandler(async (req, res) => {
    const exercises = await Exercise.find({ user: req.user.id })
    res.status(200).json(exercises)
})

// @desc    Set exercise
// @route   POST /api/exercises
// @access  Private
const setExercise = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400)
        throw new Error('Please add a name field')
    }

    const exercise = await Exercise.create({
        name: req.body.name,
        user: req.user.id
    })
    res.status(200).json(exercise)
})

// @desc    Update exercise
// @route   PUT /api/exercise/:id
// @access  Private
const updateExercise = asyncHandler(async (req, res) => {
    const exercise = await Exercise.findById(req.params.id)

    if (!exercise) {
        console.log('no exercise')
        res.status(400)
        throw new Error('Exercise not found')
    }

    const user = await User.findById(req.user.id)

    // Check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

      // make sure the logged in user matches the exercise user
    if (exercise.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedExercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedExercise)
})

// @desc    Delete exercise
// @route   DELETE /api/exercise/:id
// @access  Private
const deleteExercise = asyncHandler(async (req, res) => {
    const exercise = await Exercise.findById(req.params.id)

    if (!exercise) {
        res.status(400)
        throw new Error('Exercise not found')
    }

    const user = await User.findById(req.user.id)

    // Check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

      // make sure the logged in user matches the exercise user
    if (exercise.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await exercise.remove()
    res.status(200).json({ id: req.params.id})
})

module.exports = {
    getExercises,
    setExercise,
    updateExercise,
    deleteExercise
}