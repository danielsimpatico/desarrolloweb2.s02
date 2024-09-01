document.addEventListener("DOMContentLoaded", function () {
    const projectModal = document.getElementById("projectModal");
    const closeModal = document.querySelector(".close");
    const addProjectBtn = document.getElementById("addProjectBtn");
    const projectForm = document.getElementById("projectForm");
    const saveProjectBtn = document.getElementById("saveProjectBtn");
    const modalTitle = document.getElementById("modalTitle");

       loadProjects();
   
    addProjectBtn.addEventListener("click", function () {
        modalTitle.textContent = "Agregar Proyecto";
        projectForm.reset();
        document.getElementById("id_proyecto").value = ""; 
        projectModal.style.display = "block";
    });
   
    closeModal.addEventListener("click", function () {
        projectModal.style.display = "none";
    });

       projectForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const id_proyecto = document.getElementById("id_proyecto").value;
        const nom_proyecto = document.getElementById("nom_proyecto").value;
        const desc_proyecto = document.getElementById("desc_proyecto").value;
        const fch_inicio_proy = document.getElementById("fch_inicio_proy").value;
        const fch_fin_proy = document.getElementById("fch_fin_proy").value;
        const estado_proy = document.getElementById("estado_proy").value;
        const id_usuario = document.getElementById("id_usuario").value;

        const url = id_proyecto ? 'editProject.php' : 'addProject.php'; 
        // Si hay id_proyecto, se edita, sino se crea

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_proyecto,
                nom_proyecto,
                desc_proyecto,
                fch_inicio_proy,
                fch_fin_proy,
                estado_proy,
                id_usuario
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    projectModal.style.display = "none";
                    loadProjects();
                } else {
                    alert("Error al guardar el proyecto: " + data.message);
                }
            })
            .catch(error => console.error("Error:", error));
    });

    // Cargar los proyectos desde la base de datos
    function loadProjects() {
        fetch("getProyecto.php")
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector("#proyectosTable tbody");
                tableBody.innerHTML = ""; // Limpiar tabla antes de insertar

                data.forEach(proyectos => {
                    const row = document.createElement("tr");

                    row.innerHTML = `
                        <td>${proyectos.id_proyecto}</td>
                        <td>${proyectos.nom_proyecto}</td>
                        <td>${proyectos.desc_proyecto}</td>
                        <td>${proyectos.fch_creacion_proy}</td>
                        <td>${proyectos.fch_inicio_proy}</td>
                        <td>${proyectos.fch_fin_proy}</td>
                        <td>${proyectos.estado_proy}</td>
                        <td>${proyectos.nom_usuario}</td>
                        <td>
                            <button class="editBtn" data-id="${proyectos.id_proyecto}">Editar</button>
                            <button class="deleteBtn" data-id="${proyectos.id_proyecto}">Eliminar</button>
                        </td>
                    `;

                    tableBody.appendChild(row);
                });

                // Asignar eventos de edición y eliminación
                document.querySelectorAll(".editBtn").forEach(button => {
                    button.addEventListener("click", function () {
                        const id_proyecto = this.dataset.id;
                        editProject(id_proyecto);
                    });
                });

                document.querySelectorAll(".deleteBtn").forEach(button => {
                    button.addEventListener("click", function () {
                        const id_proyecto = this.dataset.id;
                        deleteProject(id_proyecto);
                    });
                });
            })
            .catch(error => console.error("Error al cargar los proyectos:", error));
    }

    // Editar un proyecto
    function editProject(id_proyecto) {
        fetch(`getProyecto.php?id_proyecto=${id_proyecto}`)
            .then(response => response.json())
            .then(proyecto => {
                if (proyecto.success === false) {
                    alert(proyecto.message);
                    return;
                }

                modalTitle.textContent = "Editar Proyecto";
                document.getElementById("id_proyecto").value = proyectos.id_proyecto;
                document.getElementById("nom_proyecto").value = proyectos.nom_proyecto;
                document.getElementById("desc_proyecto").value = proyectos.desc_proyecto;
                document.getElementById("fch_inicio_proy").value = proyectos.fch_inicio_proy;
                document.getElementById("fch_fin_proy").value = proyectos.fch_fin_proy;
                document.getElementById("estado_proy").value = proyectos.estado_proy;
                document.getElementById("id_usuario").value = proyectos.id_usuario;
                projectModal.style.display = "block";
            })
            .catch(error => console.error("Error al cargar el proyecto:", error));
    }

    // Eliminar un proyecto
    function deleteProject(id_proyecto) {
        if (!confirm("¿Estás seguro de que deseas eliminar este proyecto?")) return;

        fetch(`deleteProject.php?id_proyecto=${id_proyecto}`, {
            method: "DELETE",
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    loadProjects();
                } else {
                    alert("Error al eliminar el proyecto: " + data.message);
                }
            })
            .catch(error => console.error("Error al eliminar el proyecto:", error));
    }
});