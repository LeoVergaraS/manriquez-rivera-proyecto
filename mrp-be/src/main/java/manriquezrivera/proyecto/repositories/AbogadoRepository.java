package manriquezrivera.proyecto.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import manriquezrivera.proyecto.entity.Abogado;

@Repository
public interface AbogadoRepository extends JpaRepository<Abogado, Long> {
  @Query(value = "SELECT a.* FROM abogado a, caso_abogado ca WHERE ca.id_caso = :id_caso AND ca.id_abogado = a.id", nativeQuery = true)
  List<Abogado> getByCaso(@Param("id_caso") Long id_caso);
}
