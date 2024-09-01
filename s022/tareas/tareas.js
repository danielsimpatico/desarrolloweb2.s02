document.addEventListener("DOMContentLoaded", function () {
    const taskModal = document.getElementById("taskModal");
    const closeModal = document.querySelector(".close");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskForm = document.getElementById("taskForm");
    const saveTaskBtn = document.getElementById("saveTaskBtn");
    const modalTitle = document.getElementById("modalTitle");

    // Cargar las tareas al cargar la página
    loadTasks();

    // Mostrar el modal para agregar una nueva tarea
    addTaskBtn.addEventListener("click", function () {
        modalTitle.textContent = "Agregar Tarea";
        taskForm.reset();
        document.getElementById("id_tarea").value = ""; // Limpiar el campo oculto
        taskModal.style.display = "block";
        loadProjects(); // Cargar los proyectos para el campo de selección
    });

    // Cerrar el modal
    closeModal.addEventListener("click", function () {
        taskModal.style.display = "none";
    });

    // Enviar el formulario de tarea (crear o editar)
    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const id_tarea = document.getElementById("id_tarea").value;
        const nom_tarea = document.getElementById("nom_tarea").value;
        const desc_tarea = document.getElementById("desc_tarea").value;
        const fch_creacion_tarea = document.getElementById("fch_creacion_tarea").value;
        const fch_inicio_tarea = document.getElementById("fch_inicio_tarea").value;
        const fch_final_tarea = document.getElementById("fch_final_tarea").value;
        const prioridad_tarea = document.getElementById("prioridad_tarea").value;
        const estado_tarea = document.getElementById("estado_tarea").value;
        const id_proyecto = document.getElementById("id_proyecto").value;

        const url = id_tarea ? 'editTask.php' : 'addTask.php'; // Si hay id_tarea, se edita, sino se crea

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_tarea,
                nom_tarea,
                desc_tarea,
                fch_creacion_tarea,
                fch_inicio_tarea,
                fch_final_tarea,
                prioridad_tarea,
                estado_tarea,
                id_proyecto
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    taskModal.style.display = "none";
                    loadTasks();
                } else {
                    alert("Error al guardar la tarea: " + data.message);
                }
            })
            .catch(error => console.error("Error:", error));
    });

    // Cargar las tareas desde la base de datos
    function loadTasks() {
        fetch("getTasks.php")
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector("#tareasTable tbody");
                tableBody.innerHTML = ""; 
                data.forEach(tarea => {
                    const row = document.createElement("tr");

                    row.innerHTML = `
                        <td>${tarea.id_tarea}</td>
                        <td>${tarea.nom_tarea}</td>
                        <td>${tarea.desc_tarea}</td>
                        <td>${tarea.fch_creacion_tarea}</td>
                        <td>${tarea.fch_inicio_tarea}</td>
                        <td>${tarea.fch_final_tarea}</td>
                        <td>${tarea.prioridad_tarea}</td>
                        <td>${tarea.estado_tarea}</td>
                        <td>${tarea.nom_proyecto}</td>
                        <td>
                            <button class="editBtn" data-id="${tarea.id_tarea}">Editar</button>
                            <button class="deleteBtn" data-id="${tarea.id_tarea}">Eliminar</button>
                        </td>
                    `;

                    tableBody.appendChild(row);
                });

                // Asignar eventos de edición y eliminación
                document.querySelectorAll(".editBtn").forEach(button => {
                    button.addEventListener("click", function () {
                        const id_tarea = this.dataset.id;
                        editTask(id_tarea);
                    });
                });

                document.querySelectorAll(".deleteBtn").forEach(button => {
                    button.addEventListener("click", function () {
                        const id_tarea = this.dataset.id;
                        deleteTask(id_tarea);
                    });
                });
            })
            .catch(error => console.error("Error al cargar las tareas:", error));
    }

    // Editar una tarea
    function editTask(id_tarea) {
        fetch(`getTask.php?id_tarea=${id_tarea}`)
            .then(response => response.json())
            .then(tarea => {
                if (tarea.success) {
                    modalTitle.textContent = "Editar Tarea";
                    document.getElementById("id_tarea").value = tarea.id_tarea;
                    document.getElementById("nom_tarea").value = tarea.nom_tarea;
                    document.getElementById("desc_tarea").value = tarea.desc_tarea;
                    document.getElementById("fch_creacion_tarea").value = tarea.fch_creacion_tarea;
                    document.getElementById("fch_inicio_tarea").value = tarea.fch_inicio_tarea;
                    document.getElementById("fch_final_tarea").value = tarea.fch_final_tarea;
                    document.getElementById("prioridad_tarea").value = tarea.prioridad_tarea;
                    document.getElementById("estado_tarea").value = tarea.estado_tarea;
                    document.getElementById("id_proyecto").value = tarea.id_proyecto;

                    taskModal.style.display = "block";
                    loadProjects(); // Cargar los proyectos para el campo de selección
                } else {
                    alert("Error al cargar la tarea: " + tarea.message);
                }
            })
            .catch(error => console.error("Error al obtener la tarea:", error));
    }

    // Eliminar una tarea
    function deleteTask(id_tarea) {
        if (confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
            fetch(`deleteTask.php?id_tarea=${id_tarea}`, {
                method: "DELETE",
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        loadTasks();
                    } else {
                        alert("Error al eliminar la tarea: " + data.message);
                    }
                })
                .catch(error => console.error("Error al eliminar la tarea:", error));
        }
    }

    // Cargar los proyectos para el campo de selección
    function loadProjects() {
        fetch("getProjects.php")
            .then(response => response.json())
            .then(data => {
                const projectSelect = document.getElementById("id_proyecto");
                projectSelect.innerHTML = ""; // Limpiar opciones existentes

                data.forEach(project => {
                    const option = document.createElement("option");
                    option.value = project.id_proyecto;
                    option.textContent = project.nom_proyecto;
                    projectSelect.appendChild(option);
                });
            })
            .catch(error => console.error("Error al cargar los proyectos:", error));
    }
});

