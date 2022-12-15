const express = require('express')
const router = express.Router()
const { getExercises, setExercise, updateExercise, deleteExercise } = require('../controllers/exerciseController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getExercises).post(protect, setExercise)
router.route('/:id').delete(protect, deleteExercise).put(protect, updateExercise)

module.exports = router