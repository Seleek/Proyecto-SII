const usuarios = [
    {
        id_usuario: 1,
        nombre: "Juan Perez",
        correo: "juan.perez@mochis.tecnm.mx",
        password: "password123",
        rol: "docente"
    },
    {
        id_usuario: 2,
        nombre: 'Dra. María López Hernández',
        correo: 'maria.lopez@universidad.edu.mx',
        password: 'coord123',
        rol: 'coordinador'
    },
    {
        id_usuario: 3,
        nombre: 'Ana Martínez Silva',
        correo: 'ana.martinez@estudiante.edu.mx',
        password: 'alumno123',
        rol: 'alumno'
    },
    {
        id_usuario: 4,
        nombre: 'Ing. Carlos Rodríguez',
        correo: 'carlos.rodriguez@universidad.edu.mx',
        password: 'profesor123',
        rol: 'docente'
    },
    {
        id_usuario: 5,
        nombre: 'Pedro Sánchez Gómez',
        correo: 'pedro.sanchez@estudiante.edu.mx',
        password: 'alumno123',
        rol: 'alumno'
    }
];

const docentes = [
    {id_docente: 1, id_usuario: 1},
    {id_docente: 2, id_usuario: 4}
];

const alumnos = [
    { id_alumno: 1, id_usuario: 3 },
    { id_alumno: 2, id_usuario: 5 }
];

const materias = [
    { id_materia: 1, nombre: 'Programación Orientada a Objetos' },
    { id_materia: 2, nombre: 'Bases de Datos' },
    { id_materia: 3, nombre: 'Estructura de Datos' },
    { id_materia: 4, nombre: 'Redes de Computadoras' },
    { id_materia: 5, nombre: 'Ingeniería de Software' },
    { id_materia: 6, nombre: 'Sistemas Operativos' },
    { id_materia: 7, nombre: 'Cálculo Diferencial' },
    { id_materia: 8, nombre: 'Residencia Profesional' }
];

const grupos = [
    { id_grupo: 1, id_materia: 1, id_docente: 1, semestre: '2026-1', grupo: 'A' },
    { id_grupo: 2, id_materia: 2, id_docente: 1, semestre: '2026-1', grupo: 'B' },
    { id_grupo: 3, id_materia: 3, id_docente: 2, semestre: '2026-1', grupo: 'A' },
    { id_grupo: 4, id_materia: 4, id_docente: 2, semestre: '2026-1', grupo: 'C' }
];

const inscripciones = [
    { id_inscripcion: 1, id_alumno: 1, id_grupo: 1, estado: 'activo' },
    { id_inscripcion: 2, id_alumno: 1, id_grupo: 2, estado: 'activo' },
    { id_inscripcion: 3, id_alumno: 2, id_grupo: 1, estado: 'activo' },
    { id_inscripcion: 4, id_alumno: 2, id_grupo: 3, estado: 'activo' }
];

const unidades = [
    { id_unidad: 1, id_grupo: 1, nombre: 'Unidad 1: Introducción a POO', objetivo: 'Comprender los conceptos básicos de programación orientada a objetos' },
    { id_unidad: 2, id_grupo: 1, nombre: 'Unidad 2: Herencia y Polimorfismo', objetivo: 'Aplicar herencia y polimorfismo en diseño de software' },
    { id_unidad: 3, id_grupo: 1, nombre: 'Unidad 3: Patrones de Diseño', objetivo: 'Implementar patrones de diseño comunes' },
    { id_unidad: 4, id_grupo: 2, nombre: 'Unidad 1: Modelo Relacional', objetivo: 'Comprender el modelo relacional de bases de datos' },
    { id_unidad: 5, id_grupo: 2, nombre: 'Unidad 2: SQL Avanzado', objetivo: 'Dominar consultas SQL complejas' }
];

const calificacionesParciales = [
    { id_calificacion: 1, id_alumno: 1, id_unidad: 1, calificacion: 85 },
    { id_calificacion: 2, id_alumno: 1, id_unidad: 2, calificacion: 90 },
    { id_calificacion: 3, id_alumno: 2, id_unidad: 1, calificacion: 78 },
    { id_calificacion: 4, id_alumno: 2, id_unidad: 2, calificacion: 82 }
];

const calificacionesFinales = [
    { id_final: 1, id_alumno: 1, id_grupo: 1, calificacion_final: 88 },
    { id_final: 2, id_alumno: 2, id_grupo: 1, calificacion_final: 80 }
];
