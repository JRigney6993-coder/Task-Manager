function loadTasks() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/get_tasks",
        success: function(tasks) {
            const tbody = $('.tasks');
            tbody.empty();

            tasks.forEach((task, index) => {
                const taskRow = `
                    <tr>
                        <td class="py-4 pr-4 border-b border-neutral-100 task-name">
                            <div class="flex flex-wrap items-center -m-2">
                                <div class="w-auto p-2">
                                    <span class="block font-semibold">${task.Task_Name}</span>
                                    <span class="block text-sm text-neutral-500 task-description">${task.Task_Description}</span>
                                </div>
                            </div>
                        </td>
                        <td class="py-4 pr-4 border-b border-neutral-100 task-due-date">
                            <span class="block text-sm font-medium">${task.Due_Date}</span>
                        </td>
                        <td class="py-4 pr-4 border-b border-neutral-100">
                            <button class="edit-task-btn inline-flex flex-wrap items-center mx-2 px-5 py-3.5 text-sm font-medium rounded-lg transition duration-300 bg-blue-500 text-light hover:opacity-75" type="button">Edit</button>
                            <button class="assigned-btn inline-flex flex-wrap items-center mx-2 px-5 py-3.5 text-sm font-medium rounded-lg transition duration-300 bg-neutral-300 text-light hover:opacity-75" type="button">Assigned</button>
                            <button data-id="${task._id}" class="remove-btn inline-flex flex-wrap items-center mx-2 px-5 py-3.5 text-sm font-medium rounded-lg transition duration-300 bg-red-400 text-light hover:opacity-75" type="button">Remove</button>
                        </td>
                        <td class="py-4 pr-4 border-b border-neutral-100 task-finished" data-id="${task._id}">
                            <span class="text-sm font-medium">${task.Finished}</span>
                        </td>
                        <td class="py-4 pr-4 border-b border-neutral-100">
                            <span class="text-sm font-medium">${index + 1}</span>
                        </td>
                    </tr>`;
                
                tbody.append(taskRow);
            });
        },
        error: function(error) {
            console.error('There was an error fetching tasks:', error);
        }
    });
}

function loadPeople() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/get_people",
        success: function(people) {
            const tbody = $('.people');
            tbody.empty(); // clear any existing rows

            people.forEach((person, index) => {
                const personRow = `
                    <tr>
                        <td class="py-4 pr-4 border-b border-neutral-100">
                            <div class="flex flex-wrap items-center -m-2">
                                <div class="w-auto p-2">
                                    <span class="block font-semibold">${person.Name}</span>
                                </div>
                            </div>
                        </td>
                        <td class="py-4 pr-4 border-b border-neutral-100">
                            <span class="block text-sm font-medium">${person.Age}</span>
                        </td>
                        <td class="py-4 pr-4 border-b border-neutral-100">
                            <button class="inline-flex flex-wrap items-center mx-2 px-5 py-3.5 text-sm font-medium rounded-lg transition duration-300 bg-blue-500 text-light hover:opacity-75" type="submit">Edit</button>
                            <button data-id="${person._id}" class="remove-person-btn inline-flex flex-wrap items-center mx-2 px-5 py-3.5 text-sm font-medium rounded-lg transition duration-300 bg-red-400 text-light hover:opacity-75" type="submit">Remove</button>
                        </td>
                        <td class="py-4 pr-4 border-b border-neutral-100">
                            <span class="text-sm font-medium">${index + 1}</span> <!-- using index as ID, you can replace with ${person._id} if you want the actual ID -->
                        </td>
                    </tr>`;
                
                tbody.append(personRow);
            });
        },
        error: function(error) {
            console.error('There was an error fetching people:', error);
        }
    });
}

function updateTask(taskId, updatedData) {
    $.ajax({
        type: "PUT",
        url: `http://localhost:3000/update_task/${taskId}`,
        data: updatedData,
        success: function(response) {
            console.log('Task updated:', response);
        },
        error: function(error) {
            console.error('There was an error updating the task:', error);
        }
    });
}


$(document).ready(function() {
    loadTasks();
    loadPeople();

    $(document).on('click', '.edit-task-btn', function() {
        const row = $(this).closest('tr');
    
        if(row.find('.editable-task-name').length) {
            return; 
        }
    
        const taskName = row.find('.task-name span.font-semibold').text();
        const taskDescription = row.find('.task-description').text();
        const dueDate = row.find('.task-due-date span').text();
    
        row.find('.task-name').html(`
            <input type="text" class="editable-task-name" value="${taskName}" style="color:black; display: block; margin-bottom: 5px;">
            <input type="text" class="editable-task-description" value="${taskDescription}" style="color:black; display: block;">
        `);
        row.find('.task-due-date').html(`
            <input type="text" class="editable-task-date" value="${dueDate}" style="color:black;">
        `);
    });
    
    

    $(document).on('keydown', '.editable-task-name, .editable-task-description, .editable-task-date', function(e) {
        if (e.keyCode === 13) {
            const row = $(this).closest('tr');
            const taskId = row.find('.remove-btn').data('id');  
            const updatedName = row.find('.editable-task-name').val();
            const updatedDescription = row.find('.editable-task-description').val();
            const updatedDueDate = row.find('.editable-task-date').val();
            
            console.log('Extracted Values:', {updatedName, updatedDescription, updatedDueDate});
            
            updateTask(taskId, {
                Task_Name: updatedName,
                Task_Description: updatedDescription,
                Due_Date: updatedDueDate
            });
    
            loadTasks();
        }
    });
    
});