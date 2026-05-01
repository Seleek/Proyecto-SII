INSERT INTO usuarios (nombre, correo, password, rol)
VALUES (
    'Juan Perez',
    'juan@test.com',
    crypt('123456', gen_salt('bf')),
    'docente'
);