document.addEventListener('DOMContentLoaded', function() {
    const usuario = loadUserInfo();
    if (usuario && usuario.rol === 'coordinador') {
        window.location.href = 'index.html';
        return;
    } 