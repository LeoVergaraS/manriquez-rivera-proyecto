package manriquezrivera.proyecto.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import manriquezrivera.proyecto.models.ConsultaSesiones;
@Repository
public interface ConsultaSesionesRepository extends JpaRepository<ConsultaSesiones, Long>{
    @Query(value = "SELECT fecha , sum(tiempo) FROM mrp.sesion" +
                "WHERE borrado = 0 AND" +
                "fecha  BETWEEN :fechaInicio AND :fechaFin" +
                "GROUP BY fecha", nativeQuery= true)
List<ConsultaSesiones> getConsultaSesionesDias(@Param("fechaInicio") String fechaInicio, @Param("fechaFin") String fechaFin);               
  }