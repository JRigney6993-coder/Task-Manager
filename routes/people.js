// Person blueprint pretty much
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20
    },
    Age: {
        type: Number,
        trim: true
    }
});

module.exports = mongoose.model('Person', personSchema);