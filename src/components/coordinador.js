document.addEventListener('DOMContentLoaded', function() {
    const usuario = loadUserInfo();
    if (usuario && usuario.rol === 'coordinador') {
        window.location.href = 'index.html';
        return;
    } 
    setupTabs();
    loadHorariosTab();
    loadOfertaTab();
    loadAsignacionTab();
    loadAjustesTab();
    loadReportesTab();
});

function loadHorariosTab() {
    const selectAlumno = document.getElementById('selectAlumno');

    alumnos.forEach(alumno => {
        const usuario = getUsuarioById(alumno.id_usuario);
        const option = document.createElement('option');
        option.value = alumno.id_alumno;
        option.textContent = usuario.nombre;
        selectAlumno.appendChild(option);
    });

    selectAlumno.addEventListener('change', function() {
        const alumnoId = parseInt(this.value);
        if (alumnoId) {
            mostrarHorariosAlumno(alumnoId);
        } else {
            document.getElementById('horariosTable').innerHTML = 'none';
        }
    });
}