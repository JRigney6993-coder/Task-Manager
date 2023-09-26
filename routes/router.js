// Router!!!

const express = require('express');
const router = express.Router();
const Task = require('./tasks');

router.get('/get_tasks', async (req, res) => {
    try {
        const tasks = await Task.find(); // fetch all tasks from the database
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

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

router.delete('/delete_task/:taskId', async (req, res) => {
    try {
        const { taskId } = req.params;
        const result = await Task.findByIdAndRemove(taskId);

        if (!result) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(202).json({ message: 'Task successfully deleted' });
    } catch (err) {
        res.status(450).json({ error: err.message });
    }
});


module.exports = router;
