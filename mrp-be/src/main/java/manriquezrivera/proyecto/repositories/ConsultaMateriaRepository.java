package manriquezrivera.proyecto.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import manriquezrivera.proyecto.models.ConsultaMateria;

@Repository
public interface ConsultaMateriaRepository extends JpaRepository<ConsultaMateria, Long> {
    // Entrada: fechaInicio string yyyy-mm-dd, fechaFin string yyyy-mm-dd
    // Salida: List<ConsultaMateria>
    // Descripcion: Consulta el tiempo trabajado por materia en un tiempo determinado
  @Query(value = "SELECT m.nombre, sum(tiempo) as tiempo " +
      "FROM sesion as s, caso as c, materia as m " +
      "WHERE c.id_materia = m.id AND c.id = s.id_caso " +
      "AND s.borrado = 0 AND s.fecha BETWEEN :fechaInicio " +
      "AND :fechaFin GROUP BY m.nombre", nativeQuery = true)
  List<ConsultaMateria> getConsultaMateria(@Param("fechaInicio") String fechaInicio,
      @Param("fechaFin") String fechaFin);


    // Entrada: fechaInicio string yyyy-mm-dd, fechaFin string yyyy-mm-dd
    // Salida: Integer
    // Descripcion: Consulta la cantidad de materias que se han trabajado en un tiempo determinado
  @Query(value = "SELECT count(*) " +
      "FROM(SELECT distinct m.nombre " +
      "FROM mrp.sesion as s, mrp.caso as c, mrp.materia as m " +
      "WHERE c.id_materia = m.id AND c.id = s.id_caso " +
      "AND s.borrado = 0 AND s.fecha BETWEEN :fechaInicio AND :fechaFin) as materiasTiempo", nativeQuery = true)
  Integer getConsultaCantidadMaterias(@Param("fechaInicio") String fechaInicio, @Param("fechaFin") String fechaFin);

    // Entrada: fechaInicio string yyyy-mm-dd, fechaFin string yyyy-mm-dd
    // Salida: List<ConsultaMateria>
    // Descripcion: Consulta cual es la materia que se ha trabajado mas en un tiempo determinado
  @Query(value = "SELECT *" +
      "FROM (SELECT  m.nombre , sum(tiempo) as tiempo " +
      "FROM mrp.sesion as s, mrp.caso as c, mrp.materia as m " +
      "WHERE c.id_materia = m.id AND c.id = s.id_caso " +
      "AND s.borrado = 0 AND s.fecha BETWEEN :fechaInicio AND :fechaFin " +
      "group by m.nombre) as tiempoMateria " +
      "order by tiempo desc " +
      "limit 1", nativeQuery = true)
  List<ConsultaMateria> getConsultaNombreTiempoMateriaMax(@Param("fechaInicio") String fechaInicio,
      @Param("fechaFin") String fechaFin);

    // Entrada: fechaInicio string yyyy-mm-dd, fechaFin string yyyy-mm-dd
    // Salida: List<ConsultaMateria>
    // Descripcion: Consulta cual es la submateria que se ha trabajado mas en un tiempo determinado
  @Query(value = "SELECT * " +
      "FROM (SELECT su.nombre, sum(s.tiempo) as tiempo " +
      "      FROM caso c, sesion s, sub_materia su " +
      "      WHERE s.borrado = 0 AND " +
      "            su.id = c.id_submateria AND " +
      "            s.id_caso = c.id AND " +
      "            s.fecha BETWEEN :fechaInicio AND :fechaFin " +
      "      GROUP BY su.nombre) as clt " +
      "ORDER BY clt.tiempo DESC " +
      "LIMIT 1", nativeQuery = true)
  List<ConsultaMateria> getConsultaNombreTiempoSubmateriaMax(@Param("fechaInicio") String fechaInicio,
      @Param("fechaFin") String fechaFin);

    // Entrada: fechaInicio string yyyy-mm-dd, fechaFin string yyyy-mm-dd
    // Salida: List<ConsultaMateria>
    // Descripcion: Consulta la cantidad de submaterias que se han trabajado en un tiempo determinado
  @Query(value = "SELECT count(*) " +
      "FROM (SELECT su.nombre as tiempo " +
      "FROM mrp.sesion as s, mrp.caso as c, mrp.materia as m, mrp.sub_materia as su " +
      "WHERE c.id_materia = m.id AND c.id = s.id_caso AND su.id_materia = m.id " +
      "AND s.borrado = 0 AND s.fecha BETWEEN :fechaInicio AND :fechaFin " +
      "group by su.nombre) as submaterias", nativeQuery = true)
  Integer getConsultaCantidadSubmaterias(@Param("fechaInicio") String fechaInicio, @Param("fechaFin") String fechaFin);

    // Entrada: fechaInicio string yyyy-mm-dd, fechaFin string yyyy-mm-dd
    // Salida: List<ConsultaMateria>
    // Descripcion: Consulta cual es el cliente que se ha trabajado mas en un tiempo determinado
  @Query(value = "SELECT * " +
      "FROM(SELECT cl.nombre, sum(tiempo) as tiempo " +
      "FROM mrp.sesion as se, mrp.cliente as cl, mrp.caso as ca " +
      "WHERE cl.borrado = 0 AND  cl.id = ca.id_cliente AND se.id_caso = ca.id AND " +
      "se.fecha  BETWEEN :fechaInicio AND :fechaFin " +
      "group by cl.nombre) as clTiempo " +
      "order by tiempo desc " +
      "Limit 1", nativeQuery = true)
  List<ConsultaMateria> getConsultaNombreTiempoClienteMax(@Param("fechaInicio") String fechaInicio,
      @Param("fechaFin") String fechaFin);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
    /*
     PARA LA VISTA CONSULTA-MATERIA
    */

    @Query(value="SELECT \"NOMBRE\" as nombre, tiempo " + 
                 "FROM sesion s, caso c " +
                 "WHERE s.borrado = 0 AND " +
                 "      c.id = s.id_caso AND " +
                 "      c.abogado = :abogado AND " +
                 "      c.id_materia = :id_materia AND " +
                 "      s.fecha BETWEEN :fechaInicio AND :fechaFin", nativeQuery = true)
    List<ConsultaMateria> getSesionesByMateriaAndAbogadoAndTiempo(@Param("abogado") String abogado, @Param("id_materia") Long id_materia, @Param("fechaInicio") String fechaInicio, @Param("fechaFin") String fechaFin);

    @Query(value="SELECT coalesce(sum(s.tiempo),0) as tiempo " + 
                 "FROM sesion s, caso c " +
                 "WHERE s.borrado = 0 AND " +
                 "      c.id = s.id_caso AND " +
                 "      c.abogado = :abogado AND " +
                 "      c.id_materia = :id_materia AND " +
                 "      s.fecha BETWEEN :fechaInicio AND :fechaFin", nativeQuery = true)
    Integer getTiempoSesionesByMateriaAndAbogadoAndTiempo(@Param("abogado") String abogado, @Param("id_materia") Long id_materia, @Param("fechaInicio") String fechaInicio, @Param("fechaFin") String fechaFin);

    @Query(value="SELECT count(*)" + 
                 "FROM sesion s, caso c " +
                 "WHERE s.borrado = 0 AND " +
                 "      c.id = s.id_caso AND " +
                 "      c.abogado = :abogado AND " +
                 "      c.id_materia = :id_materia AND " +
                 "      s.fecha BETWEEN :fechaInicio AND :fechaFin " + 
                 "GROUP BY c.id_cliente", nativeQuery = true)
    List<Integer> getCantidadUsuariosByMateriaAndAbogadoAndTiempo(@Param("abogado") String abogado, @Param("id_materia") Long id_materia, @Param("fechaInicio") String fechaInicio, @Param("fechaFin") String fechaFin);

}
