package manriquezrivera.proyecto.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import manriquezrivera.proyecto.entity.Caso;
import manriquezrivera.proyecto.entity.Sesion;

@Repository
public interface CasoRepository extends JpaRepository<Caso, Long>{
    @Query(value = "SELECT * FROM caso WHERE borrado = 0", nativeQuery = true)
    List<Caso> getAll();

    @Query(value = "SELECT * FROM caso WHERE borrado = 0 AND id = :id", nativeQuery = true)
    Caso getById(@Param("id") Long id);

    @Query(value = "SELECT c.* FROM caso as c, caso_abogado as ca WHERE c.borrado = 0 AND :idAbogado = ca.id_abogado AND c.id = ca.id_caso ", nativeQuery = true)
    List<Caso> getByIdAbogado(@Param("idAbogado") Long idAbogado);
}
