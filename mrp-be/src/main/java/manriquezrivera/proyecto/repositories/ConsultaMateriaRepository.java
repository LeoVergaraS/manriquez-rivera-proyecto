package manriquezrivera.proyecto.repositories;

import java.util.List;

import org.antlr.v4.runtime.atn.SemanticContext.AND;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import manriquezrivera.proyecto.models.ConsultaMateria;

@Repository
public interface ConsultaMateriaRepository extends JpaRepository<ConsultaMateria, Long>{
  @Query(value = "SELECT m.nombre, sum(tiempo) as tiempo " + 
                 "FROM sesion as s, caso as c, materia as m " + 
                 "WHERE c.id_materia = m.id AND c.id = s.id_caso " + 
                 "AND s.borrado = 0 AND fecha BETWEEN :fechaInicio " + 
                 "AND :fechaFin GROUP BY m.nombre", nativeQuery = true)
  List<ConsultaMateria> getConsultaMateria(@Param("fechaInicio") String fechaInicio, @Param("fechaFin") String fechaFin);
}
