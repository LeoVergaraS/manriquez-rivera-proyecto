USE mrp;
SELECT m.nombre, sum(tiempo) as tiempo
FROM sesion as s JOIN materia as m ON s.id_materia = m.id
GROUP BY m.nombre;

SELECT fecha, sum(tiempo) as tiempo
FROM sesion
WHERE id_cliente = 1 AND
	fecha BETWEEN '2022-10-10' AND '2023-10-10'
GROUP BY fecha;

SELECT *
FROM (SELECT su.nombre, sum(s.tiempo) as tiempo
	  FROM caso c, sesion s, sub_materia su
	  WHERE s.borrado = 0 AND
			su.id = c.id_submateria AND
			s.id_caso = c.id AND
			s.fecha BETWEEN '2020-01-01' AND '2023-10-20'
	  GROUP BY su.nombre) as clt
ORDER BY clt.tiempo DESC
LIMIT 1;
      