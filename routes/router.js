// Router!!!

const express = require('express');
const router = express.Router();
const Task = require('./tasks');

router.post('/create_task', async (req, res) => {
    const { Task_Name, Task_Description, Due_Date } = req.body;
    console.log(req.body);

    // Get current date in the format "Month day, year"
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    try {
        const task = new Task({
            Task_Name,
            Task_Description,
            Start_Date: formattedDate,
            Due_Date,
            Finished: false
        });

        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
