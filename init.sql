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

CREATE TABLE IF NOT EXISTS `abogado` (
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

INSERT INTO `abogado`
(nombre, borrado)
VALUE ('Daniel Manriquez',0),
('Pablo Rivera', 0)


  
