package manriquezrivera.proyecto.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import manriquezrivera.proyecto.entity.CasoAbogado;
@Repository
public interface CasoAbogadoRepository extends JpaRepository<CasoAbogado, Long>  {
    @Query(value = "SELECT * FROM caso_abogado ca WHERE ca.id_caso = :id_caso AND ca.id_abogado = :id_abogado", nativeQuery = true)
    public CasoAbogado getByCasoByAbogado(@Param("id_caso") Long id_caso, @Param("id_abogado") Long id_abogado); 
}
