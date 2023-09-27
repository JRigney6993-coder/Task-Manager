function loadTasks() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/get_tasks",
        success: function(tasks) {
            const tbody = $('.tasks');
            tbody.empty(); // clear any existing rows

            tasks.forEach((task, index) => {
                const taskRow = `
                    <tr>
                        <td class="py-4 pr-4 border-b border-neutral-100">
                            <div class="flex flex-wrap items-center -m-2">
                                <div class="w-auto p-2">
                                    <span class="block font-semibold">${task.Task_Name}</span>
                                    <span class="block text-sm text-neutral-500">${task.Task_Description}</span>
                                </div>
                            </div>
                        </td>
                        <td class="py-4 pr-4 border-b border-neutral-100">
                            <span class="block text-sm font-medium">${task.Due_Date}</span>
                        </td>
                        <td class="py-4 pr-4 border-b border-neutral-100">
              <button class="inline-flex flex-wrap items-center mx-2 px-5 py-3.5 text-sm font-medium rounded-lg transition duration-300 bg-blue-500 text-light hover:opacity-75" type="submit">Edit</button>
              <button class="inline-flex flex-wrap items-center mx-2 px-5 py-3.5 text-sm font-medium rounded-lg transition duration-300 bg-neutral-300 text-light hover:opacity-75" type="submit">View</button>

              <button data-id="${task._id}" class="remove-btn inline-flex flex-wrap items-center mx-2 px-5 py-3.5 text-sm font-medium rounded-lg transition duration-300 bg-red-400 text-light hover:opacity-75" type="submit">Remove</button>

            </td>
                        <td class="py-4 pr-4 border-b border-neutral-100">
                            <span class="text-sm font-medium">${task.Finished}</span>
                        </td>
                        <td class="py-4 pr-4 border-b border-neutral-100">
                            <span class="text-sm font-medium">${index + 1}</span> <!-- using index as ID -->
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

$(document).ready(function() {
    loadTasks();
    loadPeople();
});

