INSERT INTO mrp.sub_materia (id_materia, nombre, borrado)
VALUES
  (1, 'SubMateria 1', 0),
  (2, 'SubMateria 2', 0),
  (3, 'SubMateria 3', 0),
  (4, 'SubMateria 4', 0),
  (5, 'SubMateria 5', 0),
  (6, 'SubMateria 6', 0);

INSERT INTO mrp.cliente (nombre, borrado)
VALUES
    ('Juan', 0),
    ('María', 0),
    ('Carlos', 0),
    ('Laura', 0),
    ('Pedro', 0),
    ('Juan', 0),
    ('María', 0),
    ('Carlos', 0),
    ('Laura', 0),
    ('Pedro', 0);

INSERT INTO mrp.caso (fecha, borrado, id_cliente, id_materia, id_submateria)
VALUES
    ('2023-07-15', 0, 1, 3, 4),
    ( '2022-10-30', 0, 2, 5, 1),
    ( '2023-04-02', 0, 3, 2, 6),
    ( '2022-09-20', 0, 4, 8, 5),
    ( '2023-01-18', 0, 5, 1, 3),
    ( '2023-08-09', 0, 4, 6, 2),
    ( '2022-11-25', 0, 2, 7, 4),
    ( '2022-06-03', 0, 3, 3, 1),
    ( '2023-10-02', 0, 1, 8, 6),
    ( '2023-02-14', 0, 5, 2, 5),
    ( '2023-05-20', 0, 3, 4, 2),
    ( '2022-12-08', 0, 5, 6, 1),
    ( '2022-07-11', 0, 2, 7, 3),
    ( '2023-03-16', 0, 1, 1, 5),
    ( '2022-09-29', 0, 4, 8, 6),
    ( '2023-08-25', 0, 3, 3, 4),
    ( '2022-11-01', 0, 2, 2, 1),
    ( '2023-01-07', 0, 5, 7, 5),
    ( '2023-06-14', 0, 4, 5, 3),
    ( '2022-03-19', 0, 1, 6, 2),
    ( '2023-09-05', 0, 3, 1, 6),
    ( '2022-04-23', 0, 2, 8, 4),
    ( '2023-07-30', 0, 1, 4, 1),
    ( '2022-10-15', 0, 5, 3, 6),
    ( '2023-02-27', 0, 4, 2, 4),
    ( '2022-06-28', 0, 2, 1, 2),
    ( '2023-11-10', 0, 1, 7, 3),
    ( '2023-04-12', 0, 3, 6, 5),
    ( '2022-12-23', 0, 4, 5, 1),
    ( '2022-08-07', 0, 5, 8, 2);

INSERT INTO mrp.sesion (fecha, borrado, tiempo, id_caso, id_abogado)
SELECT
  DATE_ADD(c.fecha, INTERVAL FLOOR(RAND() * DATEDIFF(CURRENT_DATE(), c.fecha)) DAY), -- Fecha aleatoria posterior al caso
  0, -- Valor de borrado
  FLOOR(30 + RAND() * 120), -- Tiempo aleatorio en minutos (entre 30 y 150 minutos)
  c.id, -- ID del caso correspondiente
  a.id -- ID de un abogado aleatorio
FROM mrp.caso c
JOIN mrp.abogado a ON RAND() < 0.5 -- Asigna un abogado aleatorio con una probabilidad del 50%
ORDER BY RAND()
LIMIT 100;
   
INSERT INTO mrp.caso_abogado (id_abogado, id_caso)
VALUES
  (1, 1),
  (2, 2),
  (1, 3),
  (2, 4),
  (1, 5),
  (2, 6),
  (1, 7),
  (2, 8),
  (1, 9),
  (2, 10),
  (1, 11),
  (2, 12),
  (1, 13),
  (2, 14),
  (1, 15),
  (2, 16),
  (1, 17),
  (2, 18),
  (1, 19),
  (2, 20),
  (1, 21),
  (2, 22),
  (1, 23),
  (2, 24),
  (1, 25),
  (2, 26),
  (1, 27),
  (2, 28),
  (1, 29),
  (2, 30);



    



