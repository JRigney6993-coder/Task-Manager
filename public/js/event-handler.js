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
                loadTasks();
                // Handle success: Show a message, reset the form, etc.
            },
            error: function(error) {
                console.error('There was an error:', error);
                // Handle errors: Show an error message, etc.
            }
        });
    });
    

    $(document).on('click', '.remove-btn', function() {
        const taskId = $(this).data('id'); 

        $.ajax({
            type: "DELETE",
            url: `http://localhost:3000/delete_task/${taskId}`,
            success: function(response) {
                console.log(response.message);
                loadTasks(); // Reload the tasks once a task is deleted
            },
            error: function(error) {
                console.error('There was an error deleting the task:', error);
            }
        });
    });
    
    $('#btn-create-person').on('click', function() {
        const personName = $('#person-name').val();
        const personAge = parseInt($('#person-age').val());

        const personData = {
            Name: personName,
            Age: personAge,
        };

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/create_person",  
            data: JSON.stringify(personData),
            contentType: "application/json",
            dataType: "json",
            success: function(response) {
                console.log('Person added:', response);
                loadPeople();
            },
            error: function(error) {
                console.error('There was an error:', error);
            }
        });
    });

    $(document).on('click', '.remove-person-btn', function() {
        const personId = $(this).data('id'); 

        $.ajax({
            type: "DELETE",
            url: `http://localhost:3000/delete_person/${personId}`,
            success: function(response) {
                console.log(response.message);
                loadPeople();
            },
            error: function(error) {
                console.error('There was an error deleting the person:', error);
            }
        });
    });

    
});
