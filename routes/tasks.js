// The router pretty much

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

module.exports = mongoose.model('Task', taskSchema);
