package manriquezrivera.proyecto.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import manriquezrivera.proyecto.models.ConsultaSesionesTabla;

public interface ConsultaSesionesTablaRepository extends JpaRepository<ConsultaSesionesTabla, Long>  {
    	// Sesiones por abogado con intervalo de fecha para la tabla 
	@Query(value = "SELECT s.id as id,s.fecha as fecha, s.tiempo as tiempo, s.actividad as actividad, sesion.hora_inicio as hora_inicio FROM sesion as s, caso_abogado as ca, caso as c WHERE ca.id_abogado = :id_abogado AND ca.id_abogado = s.id_abogado AND s.id_caso = :id_caso AND s.borrado = 0 AND c.id = :id_caso AND s.id_caso = ca.id_caso AND s.fecha BETWEEN :fechaInicio AND :fechaFin ORDER BY s.fecha ASC", nativeQuery = true)
	List<ConsultaSesionesTabla> getConsultaSesionesByIdAbogadoTabla(@Param ("id_abogado") Long id_abogado, @Param ("id_caso") Long id_caso, @Param ("fechaInicio") String fechaInicio, @Param ("fechaFin") String fechaFin);
	
	// Sesiones sin abogado con intervalo de fecha para la tabla 
	@Query(value = "SELECT sesion.id, sesion.fecha, sesion.tiempo, sesion.actividad, sesion.hora_inicio as hora_inicio FROM caso, sesion WHERE caso.id = :id_caso AND sesion.id_caso = caso.id AND sesion.borrado = 0 AND sesion.fecha BETWEEN :fechaInicio AND :fechaFin ORDER BY sesion.fecha ASC", nativeQuery = true)
	List<ConsultaSesionesTabla> getConsultaSesionesTabla(@Param ("id_caso") Long id_caso, @Param ("fechaInicio") String fechaInicio, @Param ("fechaFin") String fechaFin);

	// Sesiones por abogado desde siempre para la tabla 
	@Query(value = "SELECT s.id as id, s.fecha as fecha, s.tiempo as tiempo, s.actividad as actividad, s.hora_inicio as hora_inicio FROM sesion as s, caso_abogado as ca, caso as c WHERE ca.id_abogado = :id_abogado AND ca.id_abogado = s.id_abogado AND s.id_caso = :id_caso AND s.borrado = 0 AND c.id = :id_caso AND s.id_caso = ca.id_caso ORDER BY s.fecha ASC", nativeQuery = true)
	List<ConsultaSesionesTabla> getConsultaSesionesByIdAbogadoTablaDesdeSiempre(@Param ("id_abogado") Long id_abogado, @Param ("id_caso") Long id_caso);

	// Sesiones sin abogado desde siempre para la tabla 
	@Query(value = "SELECT s.id as id,s.fecha as fecha, s.tiempo as tiempo, s.actividad as actividad, s.hora_inicio as hora_inicio FROM sesion as s, caso as c WHERE s.id_caso = :id_caso AND s.borrado = 0 AND c.id = :id_caso ORDER BY s.fecha ASC", nativeQuery = true)
	List<ConsultaSesionesTabla> getConsultaSesionesTablaDesdeSiempre(@Param ("id_caso") Long id_caso);
}
