package manriquezrivera.proyecto.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import manriquezrivera.proyecto.models.ConsultaMateria;

@Repository
public interface ConsultaMateriaRepository extends JpaRepository<ConsultaMateria, Long>{
  @Query(value = "SELECT m.nombre, sum(tiempo) as tiempo " + 
                 "FROM sesion as s JOIN materia as m ON s.id_materia = m.id " + 
                 "GROUP BY m.nombre", nativeQuery = true)
  List<ConsultaMateria> getConsultaMateria();
}
