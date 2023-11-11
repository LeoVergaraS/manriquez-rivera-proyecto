package manriquezrivera.proyecto.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import manriquezrivera.proyecto.models.ConsultaSesiones;

@Repository
public interface ConsultaSesionesRepository extends JpaRepository<ConsultaSesiones, Long> {
	// QUERY PARA LOS DIAS
	@Query(value = "SELECT fecha , sum(tiempo) as tiempo FROM mrp.sesion " +
			"WHERE borrado = 0 AND id_abogado = :idAbogado AND " +
			"fecha BETWEEN :fechaInicio AND :fechaFin " +
			"GROUP BY fecha", nativeQuery = true)
	List<ConsultaSesiones> getConsultaSesionesByIdAbogado(@Param("fechaInicio") String fechaInicio,
			@Param("fechaFin") String fechaFin, @Param("idAbogado") Long idAbogado);

	@Query(value = "SELECT fecha , sum(tiempo) as tiempo FROM mrp.sesion " +
			"WHERE borrado = 0 AND " +
			"fecha BETWEEN :fechaInicio AND :fechaFin " +
			"GROUP BY fecha ORDER by fecha asc", nativeQuery = true)
	List<ConsultaSesiones> getConsultaSesiones(@Param("fechaInicio") String fechaInicio,
			@Param("fechaFin") String fechaFin);

	// ---------------------------------------
	// QUERY DESDE SIEMPRE (TODOS ABOGADOS)
	@Query(value = "SELECT fecha , sum(tiempo) as tiempo FROM mrp.sesion " +
			"WHERE borrado = 0 " +
			"GROUP BY fecha", nativeQuery = true)
	List<ConsultaSesiones> getConsultaSesionesDesdeSiempre();

	// QUERY DESDE SIEMPRE (ABOGADO ESPECIFICO)
	@Query(value = "SELECT fecha , sum(tiempo) as tiempo FROM mrp.sesion " +
			"WHERE borrado = 0 AND id_abogado = :idAbogado " +
			"GROUP BY fecha ORDER BY fecha", nativeQuery = true)
	List<ConsultaSesiones> getConsultaSesionesDesdeSiempreByIdAbogado(@Param("idAbogado") Long idAbogado);

	// -----------------------------------------
	@Query(value = "SELECT count(*) as cantidadSesiones FROM mrp.sesion " +
			"WHERE borrado = 0 AND " +
			"fecha BETWEEN :fechaInicio AND :fechaFin ", nativeQuery = true)
	int getConsultaCantidadSesiones(@Param("fechaInicio") String fechaInicio, @Param("fechaFin") String fechaFin);

	@Query(value = "SELECT COALESCE(sum(tiempo), 0) as cantidadTiempo FROM mrp.sesion " +
			"WHERE borrado = 0 AND " +
			"fecha BETWEEN :fechaInicio AND :fechaFin ", nativeQuery = true)
	int getConsultaCantidadTiempo(@Param("fechaInicio") String fechaInicio, @Param("fechaFin") String fechaFin);

	@Query(value = "SELECT * FROM mrp.sesion WHERE borrado = 0 ORDER BY fecha asc", nativeQuery = true)
	List<ConsultaSesiones> getConsultaSesiones();

	// ---------------- QUERY VISTA CLIENTE
	@Query(value = "SELECT fecha, sum(tiempo) as tiempo FROM mrp.sesion WHERE borrado = 0 AND :id = id_caso AND fecha BETWEEN :fechaInicio AND :fechaFin GROUP BY fecha ORDER BY fecha ASC", nativeQuery = true)
	List<ConsultaSesiones> getConsultaSesionesByIdCaso(@Param("id") Long id, @Param("fechaInicio") String fechaInicio,
			@Param("fechaFin") String fechaFin);

	@Query(value = "SELECT s.fecha, sum(tiempo) as tiempo FROM mrp.sesion as s, mrp.caso_abogado as ca WHERE s.borrado = 0 AND :id = s.id_caso AND s.id_caso = ca.id_caso AND :id_abo = ca.id_abogado AND s.id_abogado = ca.id_abogado AND fecha BETWEEN :fechaInicio AND :fechaFin GROUP by s.fecha ORDER BY fecha ASC", nativeQuery = true)
	List<ConsultaSesiones> getConsultaSesionesByIdCasoConAbogado(@Param("id") Long id,
			@Param("fechaInicio") String fechaInicio, @Param("fechaFin") String fechaFin, @Param("id_abo") Long id_abo);

	@Query(value = "SELECT fecha, sum(tiempo) as tiempo FROM mrp.sesion WHERE borrado = 0 AND :id = id_caso GROUP BY fecha ORDER BY fecha ASC", nativeQuery = true)
	List<ConsultaSesiones> getConsultaSesionesByIdCaso2(@Param("id") Long id);

	@Query(value = "SELECT s.fecha, sum(tiempo) as tiempo FROM mrp.sesion as s, mrp.caso_abogado as ca WHERE s.borrado = 0 AND :id = s.id_caso AND s.id_caso = ca.id_caso AND :id_abo = ca.id_abogado AND s.id_abogado = ca.id_abogado GROUP by s.fecha ORDER BY fecha ASC", nativeQuery = true)
	List<ConsultaSesiones> getConsultaSesionesByIdCasoConAbogado2(@Param("id") Long id, @Param("id_abo") Long id_abo);

	// Sesiones por abogado con intervalo de fecha para la tabla 
	@Query(value = "SELECT s.fecha as fecha, s.tiempo as tiempo FROM sesion as s, caso_abogado as ca, caso as c WHERE ca.id_abogado = :id_abogado AND ca.id_abogado = s.id_abogado AND s.id_caso = :id_caso AND s.borrado = 0 AND c.id = :id_caso AND s.id_caso = ca.id_caso AND s.fecha BETWEEN :fechaInicio AND :fechaFin ORDER BY s.fecha ASC", nativeQuery = true)
	List<ConsultaSesiones> getConsultaSesionesByIdAbogadoTabla(@Param ("id_abogado") Long id_abogado, @Param ("id_caso") Long id_caso, @Param ("fechaInicio") String fechaInicio, @Param ("fechaFin") String fechaFin);
	
	// Sesiones sin abogado con intervalo de fecha para la tabla 
	@Query(value = "SELECT sesion.fecha, sesion.tiempo FROM caso, sesion WHERE caso.id = :id_caso AND sesion.id_caso = caso.id AND sesion.borrado = 0 AND sesion.fecha BETWEEN :fechaInicio AND :fechaFin ORDER BY sesion.fecha ASC", nativeQuery = true)
	List<ConsultaSesiones> getConsultaSesionesTabla(@Param ("id_caso") Long id_caso, @Param ("fechaInicio") String fechaInicio, @Param ("fechaFin") String fechaFin);

	// Sesiones por abogado desde siempre para la tabla 
	@Query(value = "SELECT s.fecha as fecha, s.tiempo as tiempo FROM sesion as s, caso_abogado as ca, caso as c WHERE ca.id_abogado = :id_abogado AND ca.id_abogado = s.id_abogado AND s.id_caso = :id_caso AND s.borrado = 0 AND c.id = :id_caso AND s.id_caso = ca.id_caso ORDER BY s.fecha ASC", nativeQuery = true)
	List<ConsultaSesiones> getConsultaSesionesByIdAbogadoTablaDesdeSiempre(@Param ("id_abogado") Long id_abogado, @Param ("id_caso") Long id_caso);

	// Sesiones sin abogado desde siempre para la tabla 
	@Query(value = "SELECT s.fecha as fecha, s.tiempo as tiempo FROM sesion as s, caso as c WHERE s.id_caso = :id_caso AND s.borrado = 0 AND c.id = :id_caso ORDER BY s.fecha ASC", nativeQuery = true)
	List<ConsultaSesiones> getConsultaSesionesTablaDesdeSiempre(@Param ("id_caso") Long id_caso);

	//------------------ ---QUERYS PARA VISTA MATERIA -----------------------------
	// Desde siempre
	@Query(value = "SELECT distinct s.fecha, s.tiempo " +
			"FROM mrp.sesion as s, mrp.materia as m, mrp.caso as c " +
			"WHERE c.id_materia = :id_mat AND c.id = s.id_caso AND s.id_abogado = :id_abo AND s.borrado=0 ", nativeQuery = true)
	List<ConsultaSesiones> getConsultaSesionesByIdMateriaConAbogado(@Param("id_mat") Long id_mat,
			@Param("id_abo") Long id_abo);
	// Desde siempre sin abogado
		@Query(value = "SELECT distinct s.fecha, s.tiempo " +
			"FROM mrp.sesion as s, mrp.materia as m, mrp.caso as c " +
			"WHERE c.id_materia = :id_mat AND c.id = s.id_caso AND s.borrado=0 ", nativeQuery = true)
	List<ConsultaSesiones> getConsultaSesionesByIdMateria(@Param("id_mat") Long id_mat);

	// fecha especifico con abogado
	@Query(value = "SELECT distinct s.fecha, s.tiempo " +
			"FROM mrp.sesion as s, mrp.materia as m, mrp.caso as c " +
			"WHERE c.id_materia = :id_mat AND c.id = s.id_caso AND s.id_abogado = :id_abo AND s.borrado=0 AND " +
			"s.fecha BETWEEN :fechaInicio AND :fechaFin", nativeQuery = true)
	List<ConsultaSesiones> getConsultaSesionesByIdMateriaConAbogadoFecha(@Param("id_mat") Long id_mat,
			@Param("id_abo") Long id_abo, @Param("fechaInicio") String fechaInicio, @Param("fechaFin") String fechaFin);

	// fecha especifico sin abogado
		@Query(value = "SELECT distinct s.fecha, s.tiempo " +
			"FROM mrp.sesion as s, mrp.materia as m, mrp.caso as c " +
			"WHERE c.id_materia = :id_mat AND c.id = s.id_caso AND s.borrado=0 AND " +
			"s.fecha BETWEEN :fechaInicio AND :fechaFin", nativeQuery = true)
	List<ConsultaSesiones> getConsultaSesionesByIdMateriaFecha(@Param("id_mat") Long id_mat, 
	@Param("fechaInicio") String fechaInicio, @Param("fechaFin") String fechaFin);


	// ------------------------------------------------------------------
			// INFO TABLA CON ABOGADO
	@Query(value = "SELECT count(*) as cantidadSesiones FROM mrp.sesion " +
			"WHERE borrado = 0 AND " +
			"fecha BETWEEN :fechaInicio AND :fechaFin AND id_abogado = :idAbogado", nativeQuery = true)
	int getConsultaCantidadSesionesByIdAbogado(@Param("fechaInicio") String fechaInicio,
			@Param("fechaFin") String fechaFin, @Param("idAbogado") Long idAbogado);

	@Query(value = "SELECT COALESCE(sum(tiempo), 0) as cantidadTiempo FROM mrp.sesion " +
			"WHERE borrado = 0 AND " +
			"fecha BETWEEN :fechaInicio AND :fechaFin AND id_abogado = :idAbogado", nativeQuery = true)
	int getConsultaCantidadTiempoByIdAbogado(@Param("fechaInicio") String fechaInicio, @Param("fechaFin") String fechaFin, @Param("idAbogado") Long idAbogado);

}