// Router!!!

const express = require('express');
const router = express.Router();
const Task = require('./tasks');
const Person = require('./people');

router.get('/get_tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
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
        res.status(200).json(task);
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

        res.status(200).json({ message: 'Task successfully deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/get_people', async (req, res) => {
    try {
        const people = await Person.find();
        res.status(200).json(people);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/create_person', async (req, res) => {
    const { Name, Age } = req.body;

    try {
        const person = new Person({
            Name,
            Age
        });

        await person.save();
        res.status(200).json(person);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/delete_person/:id', async (req, res) => {
    try {
        const removedPerson = await Person.findByIdAndRemove(req.params.id);

        if (!removedPerson) {
            return res.status(404).json({ error: "Person not found" });
        }

        res.status(200).json({ message: 'Person deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


module.exports = router;
