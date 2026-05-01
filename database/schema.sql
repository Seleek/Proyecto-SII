-- =========================================
-- EXTENSION PARA ENCRIPTAR PASSWORDS
-- =========================================
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =========================================
-- TABLA USUARIOS
-- =========================================
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    rol VARCHAR(20) NOT NULL CHECK (rol IN ('docente', 'alumno', 'coordinador'))
);

-- =========================================
-- TABLA DOCENTES
-- =========================================
CREATE TABLE docentes (
    id_docente SERIAL PRIMARY KEY,
    id_usuario INT UNIQUE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE
);

-- =========================================
-- TABLA ALUMNOS
-- =========================================
CREATE TABLE alumnos (
    id_alumno SERIAL PRIMARY KEY,
    id_usuario INT UNIQUE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE
);

-- =========================================
-- TABLA MATERIAS
-- =========================================
CREATE TABLE materias (
    id_materia SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- =========================================
-- TABLA GRUPOS
-- =========================================
CREATE TABLE grupos (
    id_grupo SERIAL PRIMARY KEY,
    id_materia INT NOT NULL,
    id_docente INT NOT NULL,
    semestre VARCHAR(20) NOT NULL,
    grupo VARCHAR(10) NOT NULL,
    FOREIGN KEY (id_materia) REFERENCES materias(id_materia)
        ON DELETE CASCADE,
    FOREIGN KEY (id_docente) REFERENCES docentes(id_docente)
        ON DELETE CASCADE
);

-- =========================================
-- TABLA INSCRIPCIONES
-- =========================================
CREATE TABLE inscripciones (
    id_inscripcion SERIAL PRIMARY KEY,
    id_alumno INT NOT NULL,
    id_grupo INT NOT NULL,
    estado VARCHAR(20) DEFAULT 'activo',
    UNIQUE (id_alumno, id_grupo),
    FOREIGN KEY (id_alumno) REFERENCES alumnos(id_alumno)
        ON DELETE CASCADE,
    FOREIGN KEY (id_grupo) REFERENCES grupos(id_grupo)
        ON DELETE CASCADE
);

-- =========================================
-- TABLA UNIDADES
-- =========================================
CREATE TABLE unidades (
    id_unidad SERIAL PRIMARY KEY,
    id_grupo INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    objetivo TEXT,
    FOREIGN KEY (id_grupo) REFERENCES grupos(id_grupo)
        ON DELETE CASCADE
);

-- =========================================
-- TABLA CALIFICACIONES PARCIALES
-- =========================================
CREATE TABLE calificaciones_parciales (
    id_calificacion SERIAL PRIMARY KEY,
    id_alumno INT NOT NULL,
    id_unidad INT NOT NULL,
    calificacion NUMERIC(5,2) CHECK (calificacion >= 0 AND calificacion <= 100),
    FOREIGN KEY (id_alumno) REFERENCES alumnos(id_alumno)
        ON DELETE CASCADE,
    FOREIGN KEY (id_unidad) REFERENCES unidades(id_unidad)
        ON DELETE CASCADE
);

-- =========================================
-- TABLA CALIFICACIONES FINALES
-- =========================================
CREATE TABLE calificaciones_finales (
    id_final SERIAL PRIMARY KEY,
    id_alumno INT NOT NULL,
    id_grupo INT NOT NULL,
    calificacion_final NUMERIC(5,2) CHECK (calificacion_final >= 0 AND calificacion_final <= 100),
    FOREIGN KEY (id_alumno) REFERENCES alumnos(id_alumno)
        ON DELETE CASCADE,
    FOREIGN KEY (id_grupo) REFERENCES grupos(id_grupo)
        ON DELETE CASCADE,
    UNIQUE (id_alumno, id_grupo)
);