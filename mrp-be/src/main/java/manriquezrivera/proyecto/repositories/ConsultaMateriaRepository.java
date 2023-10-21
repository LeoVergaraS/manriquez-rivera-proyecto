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
                 "AND s.borrado = 0 AND s.fecha BETWEEN :fechaInicio " + 
                 "AND :fechaFin GROUP BY m.nombre", nativeQuery = true)
  List<ConsultaMateria> getConsultaMateria(@Param("fechaInicio") String fechaInicio, @Param("fechaFin") String fechaFin);

  @Query(value= "SELECT count(*) "+
                "FROM(SELECT distinct m.nombre "+ 
                      "FROM mrp.sesion as s, mrp.caso as c, mrp.materia as m "+ 
                      "WHERE c.id_materia = m.id AND c.id = s.id_caso "+ 
                      "AND s.borrado = 0 AND s.fecha BETWEEN :fechaInicio AND :fechaFin) as materiasTiempo", nativeQuery = true)
  Integer getConsultaCantidadMaterias(@Param("fechaInicio") String fechaInicio, @Param("fechaFin") String fechaFin);

  @Query(value= 
    "SELECT *"+
    "FROM (SELECT  m.nombre , sum(tiempo) as tiempo "+ 
          "FROM mrp.sesion as s, mrp.caso as c, mrp.materia as m "+ 
          "WHERE c.id_materia = m.id AND c.id = s.id_caso "+ 
          "AND s.borrado = 0 AND s.fecha BETWEEN :fechaInicio AND :fechaFin "+
				  "group by m.nombre) as tiempoMateria "+
   "order by tiempo desc "+
   "limit 1", nativeQuery = true)   
   String getConsultaNombreTiempoMateriaMax(@Param("fechaInicio") String fechaInicio, @Param("fechaFin") String fechaFin);

  @Query(value= 
    "SELECT * " +
    "FROM (SELECT su.nombre, sum(s.tiempo) as tiempo " +
	  "      FROM caso c, sesion s, sub_materia su " +
	  "      WHERE s.borrado = 0 AND " + 
		"            su.id = c.id_submateria AND " +
		"            s.id_caso = c.id AND " +
		"            s.fecha BETWEEN :fechaInicio AND :fechaFin " +
	  "      GROUP BY su.nombre) as clt " +
    "ORDER BY clt.tiempo DESC " +
    "LIMIT 1", nativeQuery = true)   
   String getConsultaNombreTiempoSubmateriaMax(@Param("fechaInicio") String fechaInicio, @Param("fechaFin") String fechaFin);     
  
  @Query(value=
    "SELECT count(*) "+
    "FROM (SELECT su.nombre as tiempo "+ 
                 "FROM mrp.sesion as s, mrp.caso as c, mrp.materia as m, mrp.sub_materia as su "+ 
                 "WHERE c.id_materia = m.id AND c.id = s.id_caso AND su.id_materia = m.id "+
                 "AND s.borrado = 0 AND s.fecha BETWEEN :fechaInicio AND :fechaFin "+
				         "group by su.nombre) as submaterias", nativeQuery=true)   
  Integer getConsultaCantidadSubmaterias(@Param("fechaInicio") String fechaInicio, @Param("fechaFin") String fechaFin);
}
