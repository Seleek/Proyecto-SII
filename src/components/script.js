document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    if(loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const correo = document.getElementById('correo').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('errorMessage');

            const usuario = usuarios.find(u => u.correo === correo && u.password === password);

            if(usuario){
                localStorage.setItem('usuarioActual', JSON.stringify(usuario));

                switch(usuario.rol) {
                    case 'coordinador':
                        window.location.href = 'coordinador.html';
                        break;
                    case 'profesor':
                        window.location.href = 'profesor.html';
                        break;
                    case 'alumno':
                        window.location.href = 'alumno.html';
                        break;
                }
            } else {
                errorMessage.textContent = 'Correo o contraseña incorrectos.';
                errorMessage.style.display = 'block';
            }
        });
    }
});

function logout(){
    localStorage.removeItem('usuarioActual');
    window.location.href = 'index.html';
}

function checkAuth() {
    const usuario = JSON.parse(localStorage.getItem('usuarioActual'));
    if (!usuario) {
        window.location.href = 'index.html';
        return null;
    }
    return usuario;
}

function loadUserInfo() {
    const usuario = checkAuth();
    if(!usuario) return;

    const userNameElement = document.getElementById('userName');
    const userEmailElement = document.getElementById('userEmail');
    const userRoleElement = document.getElementById('userRole');

    if(userNameElement) userNameElement.textContent = usuario.nombre;
    if(userEmailElement) userEmailElement.textContent = usuario.correo;
    if(userRoleElement) {
        let roleName = '';
        switch(usuario.rol) {
            case 'coordinador':
                roleName = 'Coordinador';
                break;
            case 'docente':
                roleName = 'Docente';
                break;
            case 'alumno':
                roleName = 'Alumno';
                break;
        }
        userRoleElement.textContent = roleName;
    }

    const header = document.querySelector('dashboard-header');
    if(header) {
        switch(usuario.rol) {
            case 'coordinador':
                header.style.backgroundColor = '#621132';
                break;
            case 'docente':
                header.style.backgroundColor = '#1b396a';
                break;
            case 'alumno':
                header.style.backgroundColor = '#10312b';
                break;
        }
    }
    return usuario;
}

