package manriquezrivera.proyecto.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import manriquezrivera.proyecto.entity.Submateria;

@Repository
public interface SubMateriaRepository extends JpaRepository<Submateria, Long>{
    @Query(value = "SELECT * FROM sub_materia WHERE borrado = 0", nativeQuery = true)
    List<Submateria> getAll();

    @Query(value = "SELECT * FROM sub_materia WHERE borrado = 0 AND id = :id", nativeQuery = true)
    Submateria getById(@Param("id") Long id);
}
