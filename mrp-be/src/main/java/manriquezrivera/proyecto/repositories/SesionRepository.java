package manriquezrivera.proyecto.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import manriquezrivera.proyecto.entity.Sesion;

public interface SesionRepository extends JpaRepository<Sesion, Long>{
    
}
