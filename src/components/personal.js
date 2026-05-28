let registrosAsistencia = [
    { id_registro: 1, nombre_persona: 'Dr. Juan Pérez García', departamento: 'Ingeniería en Sistemas', fecha: '2026-05-25', hora_entrada: '07:55', hora_salida: '15:02', estado: 'completo' },
    { id_registro: 2, nombre_persona: 'Dra. María López Hernández', departamento: 'Coordinación Académica', fecha: '2026-05-25', hora_entrada: '08:01', hora_salida: null, estado: 'solo_entrada' },
    { id_registro: 3, nombre_persona: 'Ing. Carlos Rodríguez', departamento: 'Ingeniería en Sistemas', fecha: '2026-05-25', hora_entrada: '07:48', hora_salida: '14:58', estado: 'completo' },
    { id_registro: 4, nombre_persona: 'Rosa García Mendoza', departamento: 'Servicios Escolares', fecha: '2026-05-25', hora_entrada: '08:05', hora_salida: null, estado: 'solo_entrada' },
    { id_registro: 5, nombre_persona: 'Dr. Juan Pérez García', departamento: 'Ingeniería en Sistemas', fecha: '2026-05-24', hora_entrada: '08:03', hora_salida: '15:10', estado: 'completo' },
    { id_registro: 6, nombre_persona: 'Dra. María López Hernández', departamento: 'Coordinación Académica', fecha: '2026-05-24', hora_entrada: '07:52', hora_salida: '15:00', estado: 'completo' },
    { id_registro: 7, nombre_persona: 'Ing. Carlos Rodríguez', departamento: 'Ingeniería en Sistemas', fecha: '2026-05-24', hora_entrada: null, hora_salida: null, estado: 'ausente' },
    { id_registro: 8, nombre_persona: 'Rosa García Mendoza', departamento: 'Servicios Escolares', fecha: '2026-05-24', hora_entrada: '08:10', hora_salida: '15:05', estado: 'completo' },
];

document.addEventListener('DOMContentLoaded', function (){
    const usuario = loadUserInfo();
    if (!usuario || usuario.rol !== 'personal'){
        window.locarion.href = 'index.html';
        return;
    }
    setupTabs();
    initChecador();
    initVehicular();
});

function initChecador() {
    const today = '2026-05-25';
    document.getElementById('fechaFiltro').value = today;
    renderTablaAsistencia(today);

    document.getElementById('fechaFiltro').addEventListener('change', function () {
        renderTablaAsistencia(this.value);
    });
    document.getElementById('btnRegistrarEntrada').addEventListener('click', function () {
        abrirModalAsistencia('entrada');
    });
    document.getElementById('btnRegistrarSalida').addEventListener('click', function () {
        abrirModalAsistencia('salida');
    });
    document.getElementById('btnGuardarAsistencia').addEventListener('click', guardarAsistencia);
    document.getElementById('btnCancelarAsistencia').addEventListener('click', cerrarModalAsistencia);
}

function renderTablaAsistencia(fecha){
    const filtrados = registrosAsistencia.filter(r => r.fecha === fecha);
    const completos = filtrados.filter (r => r.estado === 'completo').length;
    const soloEntrada = filtrados.filter (r => r.estado === 'solo_entrada').length;
    const ausentes = filtrados.filter (r.estado === 'ausente').length;

    document.getElementById('statTotal').textContent = filtrados.length;
    document.getElementById('statCompletos').textContent = completos;
    document.getElementById('statSoloEntrada').textContent = soloEntrada;
    document.getElementById('statAusentes').textContent = ausentes;

    const tbody = document.getElementById('tbodyAsistencia');
    tbody.innerHTML = '';

    if(filtrados.length === 0){
        tbody.innerHTML = '<tr><td colspan ="5" style="padding:32px;text-align:center;color:#999;">No hay registros para la fecha seleccionada</td></tr>';
        return;
    }

    filtrados.forEach(function (r, idx){
        const bg = idx % 2 === 0 ? '#ffffff' : '#f5f5f5';
        const tr = document.createElement ('tr');
        tr.style.backgroundColor = bg;
        tr.innerHTML = `
            <td style="padding:12px 16px;font-weight:500;color:#333;">${r.nombre_persona}</td>
            <td style="padding:12px 16px;color:#666;">${r.departamento}</td>
            <td style="padding:12px 16px;text-align:center;font-family:monospace;color:#10312B;">
                ${r.hora_entrada ? + r.hora_entrada : '<span style="color:#bbb">—</span>'}
            </td>
            <td style="padding:12px 16px;text-align:center;font-family:monospace;color:#1B396A;">
                ${r.hora_salida ? + r.hora_salida : '<span style="color:#bbb">—</span>'}
            </td>
            <td style="padding:12px 16px;text-align:center;">${getEstadoBadge(r.estado)}</td>
        `;
        tbody.appendChild(tr);
    });

    function getEstadoBadge(estado) {
    if (estado === 'completo')
        return '<span style="background:#d4edda;color:#155724;padding:4px 10px;border-radius:12px;font-size:12px;font-weight:500;">✓ Completo</span>';
    if (estado === 'solo_entrada')
        return '<span style="background:#fff3cd;color:#856404;padding:4px 10px;border-radius:12px;font-size:12px;font-weight:500;">⚠ Solo entrada</span>';
    return '<span style="background:#f8d7da;color:#721c24;padding:4px 10px;border-radius:12px;font-size:12px;font-weight:500;">✗ Ausente</span>';
}

let modalTipoAsistencia = 'entrada';

function abrirModalAsistencia(tipo) {
    modalTipoAsistencia = tipo;
    const now = new Date();
    const hora = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    document.getElementById('modalAsistenciaTitulo').textContent = tipo === 'entrada' ? 'Registrar Entrada' : 'Registrar Salida';
    document.getElementById('inputNombrePersona').value = '';
    document.getElementById('inputDepartamento').value = '';
    document.getElementById('inputHoraAsistencia').value = hora;
    document.getElementById('modalAsistencia').style.display = 'flex';
}

function cerrarModalAsistencia() {
    document.getElementById('modalAsistencia').style.display = 'none';
}

function guardarAsistencia() {
    const nombre = document.getElementById('inputNombrePersona').value.trim();
    const departamento = document.getElementById('inputDepartamento').value.trim();
    const hora = document.getElementById('inputHoraAsistencia').value;
    if (!nombre || !departamento || !hora) { alert('Por favor completa todos los campos.'); return; }

    const fecha = document.getElementById('fechaFiltro').value;
    const existente = registrosAsistencia.find(r => r.nombre_persona === nombre && r.fecha === fecha);

    if (existente) {
        if (modalTipoAsistencia === 'entrada') {
            existente.hora_entrada = hora;
            existente.estado = existente.hora_salida ? 'completo' : 'solo_entrada';
        } else {
            existente.hora_salida = hora;
            existente.estado = 'completo';
        }
    } else {
        registrosAsistencia.push({
            id_registro: registrosAsistencia.length + 1,
            nombre_persona: nombre,
            departamento: departamento,
            fecha: fecha,
            hora_entrada: modalTipoAsistencia === 'entrada' ? hora : null,
            hora_salida: modalTipoAsistencia === 'salida' ? hora : null,
            estado: modalTipoAsistencia === 'entrada' ? 'solo_entrada' : 'ausente',
        });
    }
    cerrarModalAsistencia();
    renderTablaAsistencia(fecha);
}

}
