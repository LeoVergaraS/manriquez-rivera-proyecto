package manriquezrivera.proyecto.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import manriquezrivera.proyecto.entity.Sesion;

@Repository
public interface SesionRepository extends JpaRepository<Sesion, Long>{
    @Query(value = "SELECT * FROM sesion WHERE borrado = 0", nativeQuery = true)
    List<Sesion> getAll();

    @Query(value = "SELECT * FROM sesion WHERE borrado = 0 AND id = :id", nativeQuery = true)
    Sesion getById(@Param("id") Long id);

    @Query(value = "SELECT * FROM sesion WHERE borrado = 0 AND id_abogado = :idAbogado", nativeQuery = true)
    List<Sesion> getByIdAbogado(@Param("idAbogado") Long idAbogado);
}
