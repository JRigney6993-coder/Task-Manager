$(document).ready(function() {
    $('#btn-create-task').on('click', function() {
        const taskName = $('#task-name').val();
        const taskDescription = $('#task-description').val();
        const dueDate = $('#due-date').val();

        const taskData = {
            Task_Name: taskName,
            Task_Description: taskDescription,
            Due_Date: dueDate
        };

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/create_task",
            data: JSON.stringify(taskData),
            contentType: "application/json",
            dataType: "json",
            success: function(response) {
                console.log('Task added:', response);
                // Handle success: Show a message, reset the form, etc.
            },
            error: function(error) {
                console.error('There was an error:', error);
                // Handle errors: Show an error message, etc.
            }
        });
    });
});
