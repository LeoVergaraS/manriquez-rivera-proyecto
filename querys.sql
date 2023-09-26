USE mrp;
SELECT m.nombre, sum(tiempo) as tiempo
FROM sesion as s JOIN materia as m ON s.id_materia = m.id
GROUP BY m.nombre;
SELECT fecha, sum(tiempo) as tiempo
FROM sesion
WHERE id_cliente = 1
GROUP BY fecha;