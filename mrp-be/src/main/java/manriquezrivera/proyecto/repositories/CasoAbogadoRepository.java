package manriquezrivera.proyecto.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import manriquezrivera.proyecto.entity.Caso;
import manriquezrivera.proyecto.entity.Abogado;
import manriquezrivera.proyecto.entity.CasoAbogado;
@Repository
public interface CasoAbogadoRepository extends JpaRepository<CasoAbogado, Long>  {
    
}
