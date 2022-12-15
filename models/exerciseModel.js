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
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Exercise', exerciseSchema)