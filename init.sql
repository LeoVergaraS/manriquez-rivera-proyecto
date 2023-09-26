-- Create database --
CREATE DATABASE IF NOT EXISTS `mrp`;
USE `mrp`;

-- Create tables -- 
CREATE TABLE IF NOT EXISTS `materia` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- Insert data -- 
INSERT INTO `materia`
(nombre)
VALUES('Derecho Laboral'),
('Derecho de Familia'),
('Derecho Civil'),
('Deudas'),
('Copropiedad'),
('Derecho Comercial'),
('Derecho Constitucional'),
('Juzgado de Policía Local');