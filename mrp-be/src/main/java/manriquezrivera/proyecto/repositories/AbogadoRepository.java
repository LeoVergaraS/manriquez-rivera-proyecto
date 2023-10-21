package manriquezrivera.proyecto.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import manriquezrivera.proyecto.entity.Abogado;

@Repository
public interface AbogadoRepository extends JpaRepository<Abogado, Long> {
  
}
