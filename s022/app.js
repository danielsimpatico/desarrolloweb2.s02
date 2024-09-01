document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Realizar una solicitud AJAX para verificar el usuario
    fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Redirigir a la página de perfil si el inicio de sesión es exitoso
            window.location.href = `perfil.php?nombre=${data.nombre}`;
        } else {
            document.getElementById('error-message').textContent = 'Correo o contraseña incorrectos';
        }
    })
    .catch(error => console.error('Error:', error));
});
