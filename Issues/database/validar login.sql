SELECT * FROM usuarios
WHERE correo = 'juan@test.com'
AND password = crypt('123456', password);