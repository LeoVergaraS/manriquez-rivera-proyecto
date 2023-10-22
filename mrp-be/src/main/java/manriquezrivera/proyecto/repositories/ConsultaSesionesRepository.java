package manriquezrivera.proyecto.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import manriquezrivera.proyecto.models.ConsultaSesiones;

@Repository
public interface ConsultaSesionesRepository extends JpaRepository<ConsultaSesiones, Long> {
  @Query(value = "SELECT fecha , sum(tiempo) as tiempo FROM mrp.sesion " +
      "WHERE borrado = 0 AND " +
      "fecha BETWEEN :fechaInicio AND :fechaFin " +
      "GROUP BY fecha", nativeQuery = true)
  List<ConsultaSesiones> getConsultaSesionesDias(@Param("fechaInicio") String fechaInicio,
      @Param("fechaFin") String fechaFin);

  @Query(value = "SELECT count(*) as cantidadSesiones FROM mrp.sesion " +
      "WHERE borrado = 0 AND " +
      "fecha BETWEEN :fechaInicio AND :fechaFin ", nativeQuery = true)
  int getConsultaCantidadSesiones(@Param("fechaInicio") String fechaInicio, @Param("fechaFin") String fechaFin);

  @Query(value = "SELECT COALESCE(sum(tiempo), 0) as cantidadTiempo FROM mrp.sesion " +
      "WHERE borrado = 0 AND " +
      "fecha BETWEEN :fechaInicio AND :fechaFin ", nativeQuery = true)
  int getConsultaCantidadTiempo(@Param("fechaInicio") String fechaInicio, @Param("fechaFin") String fechaFin);

  @Query(value = "SELECT * FROM mrp.sesion WHERE borrado = 0", nativeQuery = true)
  List<ConsultaSesiones> getConsultaSesiones();

    @Query(value = "SELECT fecha, tiempo FROM mrp.sesion WHERE borrado = 0 AND :id = id_caso ORDER BY fecha ASC", nativeQuery = true)
  List<ConsultaSesiones> getConsultaSesionesByIdCaso(@Param ("id") Long id);
}