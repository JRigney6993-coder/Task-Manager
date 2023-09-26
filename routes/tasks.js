// Task blueprint pretty much
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    Task_Name: {
        type: String,
        required: true,
        trim: true
    },
    Task_Description: {
        type: String,
        trim: true
    },
    Updates: [{
        type: String
    }],
    Start_Date: {
        type: String,
        required: true
    },
    Due_Date: {
        type: String,
        required: true
    },
    Finished: {
        type: Boolean,
        default: false
    }
});

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

module.exports = mongoose.model('Task', taskSchema);
module.exports = mongoose.model('Person', personSchema);

