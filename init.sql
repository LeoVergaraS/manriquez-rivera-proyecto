-- Create database --
CREATE DATABASE IF NOT EXISTS `mrp`;
USE `mrp`;

-- Create tables -- 
CREATE TABLE IF NOT EXISTS `materia` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `borrado` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
);

-- Insert data -- 
INSERT INTO `materia`
(nombre, borrado)
VALUES('Derecho Laboral',0),
('Derecho de Familia',0),
('Derecho Civil',0),
('Deudas',0),
('Copropiedad',0),
('Derecho Comercial',0),
('Derecho Constitucional',0),
('Juzgado de Policía Local',0);

INSERT INTO `sub_materia` (id_materia, nombre, borrado)
VALUES
  (1, 'SubMateria 1', 0),
  (2, 'SubMateria 2', 0),
  (3, 'SubMateria 3', 0),
  (4, 'SubMateria 4', 0),
  (5, 'SubMateria 5', 0),
  (6, 'SubMateria 6', 0);

  INSERT INTO `cliente` (nombre, borrado)
VALUES
  ('pipetboy' , 0),
  ('ianci' , 0);

  INSERT INTO mrp.sesion
(fecha,
tiempo,
id_cliente,
id_materia,
id_submateria,
borrado,
abogado)
VALUES
('2000-06-06',
1,
1,
1,
1,
0,
"Daniel Manriquez"),
('2001-06-06',
3,
2,
2,
3,
0,
"Juanito Perez");
  
