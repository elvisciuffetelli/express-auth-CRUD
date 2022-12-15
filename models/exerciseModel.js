const mongoose = require('mongoose')

const exerciseSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please add a name value']
    },
    sets: {
        type: Number,
        required: [true, 'Please add a sets value']
    },
    reps: {
        type: Number,
        required: [true, 'Please add a reps value']
    },
    weight: {
        type: Number,
        required: [true, 'Please add a weight value']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Exercise', exerciseSchema)