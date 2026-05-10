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

function mostrarHorariosAlumno(idAlumno){
    const inscripcionesAlumno = inscripciones.filter(i => i.id_alumno === idAlumno);
    const tbody = document.getElementById('horariosTableBody');
    tbody.innerHTML = '';

    inscripcionesAlumno,forEach(inscripcion => {
        const grupo = getGrupoById(inscripcion.id_grupo);
        const materia = getMateriaById(grupo.id_materia);
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${materia.nombre}</td>
        <td>${grupo.grupo}</td>
        <td>${grupo.semestre}</td>
        <td><span class = "badge badge-success">${inscripcion.estado}</span></td>

        `;
        tbody.appendChild(tr);
    });

    document.getElementById('horariosTable').style.display = 'block';
}

