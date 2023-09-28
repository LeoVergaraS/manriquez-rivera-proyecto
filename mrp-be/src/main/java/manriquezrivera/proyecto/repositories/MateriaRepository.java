package manriquezrivera.proyecto.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import manriquezrivera.proyecto.entity.Materia;

@Repository
public interface MateriaRepository extends JpaRepository<Materia, Long>{
    @Query(value = "SELECT * FROM materia WHERE borrado = 0", nativeQuery = true)
    List<Materia> getAll();

    @Query(value = "SELECT * FROM materia WHERE borrado = 0 and id = :id", nativeQuery = true)
    Materia getById(@Param("id") Long id);
}
