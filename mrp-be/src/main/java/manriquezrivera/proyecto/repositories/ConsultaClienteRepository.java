package manriquezrivera.proyecto.repositories;

import java.util.List;

import org.antlr.v4.runtime.atn.SemanticContext.AND;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import manriquezrivera.proyecto.models.ConsultaCliente;

@Repository
public interface ConsultaClienteRepository extends JpaRepository<ConsultaCliente, Long> {
  @Query(value = "SELECT fecha, sum(tiempo) as tiempo " +
      "FROM sesion as s, caso as c " +
      "WHERE c.id_cliente = :id AND s.id_caso = c.id AND" +
      "      s.borrado = 0 AND" +
      "      fecha BETWEEN :fechaInicio AND :fechaFin " +
      "GROUP BY fecha", nativeQuery = true)
  List<ConsultaCliente> getConsultaClientes(@Param("id") Long id, @Param("fechaInicio") String fechaInicio,
      @Param("fechaFin") String fechaFin);

  @Query(value =    "SELECT count(*) as cantidadClientes " +
                    "FROM (SELECT distinct cl.nombre " + 
                        "FROM mrp.sesion as se, mrp.cliente as cl, mrp.caso as ca "+
                        "WHERE cl.borrado = 0 AND " + "cl.id = ca.id_cliente AND " + "se.id_caso = ca.id AND "+
                              "se.fecha  BETWEEN :fechaInicio AND :fechaFin) as clientes", nativeQuery = true)
  int getConsultaCantidadClientes(@Param("fechaInicio") String fechaInicio, @Param("fechaFin") String fechaFin);


    // @Query(value=		"SELECT max(tiempo) "+
    //                     "FROM(SELECT cl.nombre, sum(tiempo) as tiempo "+
	// 		                "FROM mrp.sesion as se, mrp.cliente as cl, mrp.caso as ca "+ 
    //                         "WHERE cl.borrado = 0 AND  cl.id = ca.id_cliente AND se.id_caso = ca.id AND "+ 
    //                               "se.fecha  BETWEEN :fechaInicio AND :fechaFin "+
    //                               "group by cl.nombre) as clTiempo", nativeQuery=true)
    // int getConsultaTiempoClienteMax(@Param("fechaInicio") String fechaInicio, @Param("fechaFin") String fechaFin);

    @Query(value = "SELECT count(*) FROM sesion as s, caso as c WHERE c.abogado = :abogado AND  c.id = :id_caso AND s.id_caso = c.id AND s.borrado = 0 AND s.fecha BETWEEN :fi AND :ff", nativeQuery = true)
    Integer getCantidadSesionesPorCliente(@Param("abogado") String abogado, @Param("fi") String fi, @Param("ff") String ff, @Param("id_caso") Long id_caso);

    @Query(value = "SELECT sum(s.tiempo) as tiempo FROM sesion as s, caso as c WHERE c.abogado = :abogado AND  c.id = :id_caso AND id_caso = c.id AND s.borrado = 0 AND s.fecha BETWEEN :fi AND :ff GROUP BY s.id_caso", nativeQuery = true)
    Integer getTiempoSesionesPorCliente(@Param("abogado") String abogado, @Param("fi") String fi, @Param("ff") String ff, @Param("id_caso") Long id_caso);

}
