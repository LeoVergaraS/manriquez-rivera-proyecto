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
    ('Pedro', 0);

INSERT INTO mrp.sesion (tiempo, fecha, borrado, abogado, id_cliente, id_materia, id_submateria)
VALUES
    (79, '2023-07-15', 0, 'Daniel Manriquez', 1, 3, 4),
    (42, '2022-10-30', 0, 'Daniel Manriquez', 2, 5, 1),
    (96, '2023-04-02', 0, 'Daniel Manriquez', 3, 2, 6),
    (28, '2022-09-20', 0, 'Daniel Manriquez', 4, 8, 5),
    (55, '2023-01-18', 0, 'Daniel Manriquez', 5, 1, 3),
    (87, '2023-08-09', 0, 'Daniel Manriquez', 4, 6, 2),
    (60, '2022-11-25', 0, 'Daniel Manriquez', 2, 7, 4),
    (34, '2022-06-03', 0, 'Daniel Manriquez', 3, 3, 1),
    (72, '2023-10-02', 0, 'Daniel Manriquez', 1, 8, 6),
    (41, '2023-02-14', 0, 'Daniel Manriquez', 5, 2, 5),
    (105, '2023-05-20', 0, 'Daniel Manriquez', 3, 4, 2),
    (67, '2022-12-08', 0, 'Daniel Manriquez', 5, 6, 1),
    (22, '2022-07-11', 0, 'Daniel Manriquez', 2, 7, 3),
    (89, '2023-03-16', 0, 'Daniel Manriquez', 1, 1, 5),
    (50, '2022-09-29', 0, 'Daniel Manriquez', 4, 8, 6),
    (75, '2023-08-25', 0, 'Daniel Manriquez', 3, 3, 4),
    (41, '2022-11-01', 0, 'Daniel Manriquez', 2, 2, 1),
    (92, '2023-01-07', 0, 'Daniel Manriquez', 5, 7, 5),
    (64, '2023-06-14', 0, 'Daniel Manriquez', 4, 5, 3),
    (38, '2022-03-19', 0, 'Daniel Manriquez', 1, 6, 2),
    (79, '2023-09-05', 0, 'Daniel Manriquez', 3, 1, 6),
    (29, '2022-04-23', 0, 'Daniel Manriquez', 2, 8, 4),
    (58, '2023-07-30', 0, 'Daniel Manriquez', 1, 4, 1),
    (45, '2022-10-15', 0, 'Daniel Manriquez', 5, 3, 6),
    (83, '2023-02-27', 0, 'Daniel Manriquez', 4, 2, 4),
    (36, '2022-06-28', 0, 'Daniel Manriquez', 2, 1, 2),
    (91, '2023-11-10', 0, 'Daniel Manriquez', 1, 7, 3),
    (55, '2023-04-12', 0, 'Daniel Manriquez', 3, 6, 5),
    (99, '2022-12-23', 0, 'Daniel Manriquez', 4, 5, 1),
    (27, '2022-08-07', 0, 'Daniel Manriquez', 5, 8, 2);



