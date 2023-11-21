package manriquezrivera.proyecto.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import manriquezrivera.proyecto.entity.Caso;

@Repository
public interface CasoRepository extends JpaRepository<Caso, Long> {
    @Query(value = "SELECT * FROM caso WHERE borrado = 0", nativeQuery = true)
    List<Caso> getAll();

    @Query(value = "SELECT * FROM caso WHERE borrado = 0 AND id = :id", nativeQuery = true)
    Caso getById(@Param("id") Long id);

    @Query(value = "SELECT c.* FROM caso as c, caso_abogado as ca WHERE c.borrado = 0 AND :idAbogado = ca.id_abogado AND c.id = ca.id_caso ", nativeQuery = true)
    List<Caso> getByIdAbogado(@Param("idAbogado") Long idAbogado);

    @Query(value = "SELECT DISTINCT c.id, c.borrado, c.fecha, c.id_materia, c.id_submateria, c.id_cliente FROM sesion as s, caso as c, materia as m, sub_materia as sm, caso_abogado as ca WHERE s.fecha BETWEEN :fechaInicio AND :fechaFin AND s.borrado = 0 AND c.id = s.id_caso AND m.id = c.id_materia AND sm.id = c.id_submateria AND c.borrado = 0 AND :idAbogado = ca.id_abogado AND c.id = ca.id_caso", nativeQuery = true)
    List<Caso> getCasosByFecha(@Param("idAbogado") Long idAbogado, @Param("fechaInicio") String fechaInicio, @Param("fechaFin") String fechaFin);

    @Query(value = "SELECT DISTINCT c.id, c.borrado, c.fecha, c.id_materia, c.id_submateria, c.id_cliente FROM sesion as s, caso as c, materia as m, sub_materia as sm WHERE s.fecha BETWEEN :fechaInicio AND :fechaFin AND s.borrado = 0 AND c.id = s.id_caso AND m.id = c.id_materia AND sm.id = c.id_submateria AND c.borrado = 0", nativeQuery = true)
    List<Caso> getCasosByFechaSinAbogado(@Param("fechaInicio") String fechaInicio, @Param("fechaFin") String fechaFin);
}
