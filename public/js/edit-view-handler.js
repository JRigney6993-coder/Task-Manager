$(document).ready(function() {

    // Get mode and id from query parameters
    const mode = getQueryParam('mode');
    const id = getQueryParam('id');

    if (mode === 'edit') {
        $('#editSection').show();
        $('#viewSection').hide();
        fetchTaskDataById(id); // Assuming you are editing tasks.
    } else if (mode === 'view') {
        $('#viewSection').show();
        $('#editSection').hide();
        fetchTaskDataById(id);
    }

    // Remaining code from the previous JS...
    
    $('#saveChangesBtn').click(function() {
        const updatedTask = {
            Task_Name: $('#editTaskName').val(),
            Task_Description: $('#editDescription').val(),
            Due_Date: $('#editDueDate').val(),
            // Include other necessary fields...
        };

        $.ajax({
            type: "PUT",  // Assuming your update method is PUT
            url: `http://localhost:3000/update_task/${id}`,
            data: updatedTask,
            success: function(response) {
                alert('Task updated successfully');
                window.location.href = 'main_page.html';  // Assuming you want to redirect to the main page after editing
            },
            error: function(error) {
                console.error('There was an error updating the task:', error);
            }
        });
    });

    // Button to add person to a task (by ID)
    $('#addPersonBtn').click(function() {
        const personId = $('#addPersonById').val();
        
        // Code to associate person with the task...
    });
});
