document.addEventListener('DOMContentLoaded', function() {
    loadUsers();

    const userForm = document.getElementById('userForm');
    const cancelButton = document.getElementById('cancelButton');

    userForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(userForm);

        fetch('save_user.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadUsers();
                userForm.reset();
                cancelButton.style.display = 'none';
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    });

    cancelButton.addEventListener('click', function() {
        userForm.reset();
        cancelButton.style.display = 'none';
    });
});

function loadUsers() {
    fetch('get_users.php')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#usersTable tbody');
            tableBody.innerHTML = '';

            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id_usuario}</td>
                    <td>${user.nom_usuario}</td>
                    <td>${user.email}</td>
                    <td>${user.fecha_creacion}</td>
                    <td class="table-actions">
                        <button onclick="editUser(${user.id_usuario})">Editar</button>
                        <button onclick="deleteUser(${user.id_usuario})">Eliminar</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

function editUser(id_usuario) {
    fetch(`get_user.php?id_usuario=${id_usuario}`)
        .then(response => response.json())
        .then(user => {
            document.getElementById('id_usuario').value = user.id_usuario;
            document.getElementById('nom_usuario').value = user.nombre;
            document.getElementById('email').value = user.email;
            document.getElementById('pass').value = user.pass;
            document.getElementById('cancelButton').style.display = 'inline';
        })
        .catch(error => console.error('Error:', error));
}

function deleteUser(id_usuario) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        fetch(`delete_user.php?id_usuario=${id_usuario}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadUsers();
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    }
}

/**

CREATE TABLE IF NOT EXISTS proyectos (
    id_proyecto INT AUTO_INCREMENT PRIMARY KEY,
    nom_proyecto VARCHAR(100) NOT NULL,
    desc_proyecto TEXT,
    fch_creacion_proy TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fch_inicio_proy DATE,
    fecha_fin_proy DATE,
    estado_proy ENUM('Pendiente', 'En Proceso', 'Completado') DEFAULT 'Pendiente',
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE IF NOT EXISTS tareas (
    id_tarea INT AUTO_INCREMENT PRIMARY KEY,
    nom_tarea VARCHAR(100) NOT NULL,
    desc_tarea TEXT,
    fch_creacion_tarea TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fcha_inicio_tarea DATE,
    fch_final_tarea DATE,
    prioridad_tarea ENUM('Baja', 'Media', 'Alta') DEFAULT 'Media',
    estado_tarea ENUM('Pendiente', 'En Proceso', 'Completada') DEFAULT 'Pendiente',
    id_proyecto INT,
    FOREIGN KEY (id_proyecto) REFERENCES proyectos(id_proyecto)
);

CREATE TABLE IF NOT EXISTS asignaciones (
    id_asignacion INT AUTO_INCREMENT PRIMARY KEY,
    id_tarea INT,
    id_usuario INT,
    fch_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_tarea) REFERENCES tareas(id_tarea),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE IF NOT EXISTS informes (
    id_informe INT AUTO_INCREMENT PRIMARY KEY,
    id_proyecto INT,
    fch_informe TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    progreso VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_proyecto) REFERENCES proyectos(id_proyecto)
);

CREATE TABLE IF NOT EXISTS comentarios (
    id_comentario INT AUTO_INCREMENT PRIMARY KEY,
    id_tarea INT,
    id_usuario INT,
    comentario TEXT,
    fch_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_tarea) REFERENCES tareas(id_tarea),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

**/

