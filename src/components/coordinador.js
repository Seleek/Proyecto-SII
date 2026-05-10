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

function loadOfertaTab() {
    const tbody = document.getElementById('gruposTableBody');
    tbody.innerHTML = '';
    grupos.forEach(grupo => {
        const materia = getMateriaById(grupo.id_materia);
        const docente = getDocenteById(grupo.id_docente);
        const usuarioDocente = getUsuarioById(docente.id_usuario);

        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${materia.nombre}</td>
        <td>${grupo.grupo}</td>
        <td>${grupo.semestre}</td>
        <td>${usuarioDocente.nombre}</td>
        `;
        tbody.appendChild(tr);
    });
}

function loadAsignacionTab() {
    const tbody = document.getElementById('inscripcionesTableBody');
    tbody.innerHTML = '';
    inscripciones.forEach(inscripcion => {
        const alumno = getAlumnoById(inscripcion.id_alumno);
        const usuarioAlumno = getUsuarioById(alumno.id_usuario);
        const grupo = getGrupoById(inscripcion.id_grupo);
        const materia = getMateriaById(grupo.id_materia);

        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${usuarioAlumno.nombre}</td>
        <td>${materia.nombre}</td>
        <td>${grupo.grupo}</td>

        <td><span class = "badge badge-success">${inscripcion.estado}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

function loadAjustesTab() {
    const container = document.getElementById('grupoAjuste');
    container.innerHTML = '';

    grupos.forEach(grupo => {
        const materia = getMateriaById(grupo.id_materia);
        const docente = getDocenteById(grupo.id_docente);
        const usuarioDocente = getUsuarioById(docente.id_usuario);

        const div = document.createElement('div');
        div.className= 'card';
        div.style.marginBottom = '16px';
        div.style.padding = '16px';
        div.innerHTML = `
    
        <div style = "display: flex: justify-content: space-between; align-items: start;">
            <div>
                <h4 style = "color: #333; font-size: 18px; margin-bottom: 8px;">${materia.nombre} - Grupo ${grupo.grupo}</h4>
                <p style = "color: #666; font-size: 14px; margin-bottom: 4px;">Docente: ${usuarioDocente.nombre}</p>
                <p style = "color: #666; font-size: 14px;">Semestre: ${grupo.semestre}</p>
            </div>

        <button class = "btn btn-gold">Editar</button>
        </div>
        `;
        container.appendChild(div);
    });
}

function loadReportesTab() {
    document.getElementById('totalAlumnos').textContent = alumnos.length;
    document.getElementById('totalGrupos').textContent = grupos.length;
    document.getElementById('totalInscripciones').textContent = inscripciones.length;
}

