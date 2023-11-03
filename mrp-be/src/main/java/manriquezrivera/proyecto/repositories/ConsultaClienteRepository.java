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

    @Query(value = "SELECT count(*)\n" + //
            "FROM sesion as s, caso as c\n" + //
            "WHERE s.id_caso = c.id AND c.id = :id_caso AND s.borrado = 0 AND s.fecha BETWEEN :fi AND :ff", nativeQuery = true)
    Integer getCantidadSesionesPorCliente(@Param("fi") String fi, @Param("ff") String ff, @Param("id_caso") Long id_caso);

    @Query(value = "SELECT count(*)\n" + //
            "FROM sesion as s, caso as c,  caso_abogado as ca\n" + //
            "WHERE s.id_abogado = ca.id_abogado AND ca.id_abogado = :id_abo AND s.id_caso = c.id AND c.id = :id_caso AND ca.id_caso = c.id AND s.borrado = 0 AND s.fecha BETWEEN :fi AND :ff", nativeQuery = true)
    Integer getCantidadSesionesPorClienteConAbogado(@Param("id_abo") Long id_abo, @Param("fi") String fi, @Param("ff") String ff, @Param("id_caso") Long id_caso);

    @Query(value = "SELECT sum(tiempo)\n" + //
            "FROM sesion as s, caso as c\n" + //
            "WHERE s.id_caso = c.id AND c.id = :id_caso AND s.borrado = 0 AND s.fecha BETWEEN :fi AND :ff", nativeQuery = true)
    Integer getTiempoSesionesPorCliente(@Param("fi") String fi, @Param("ff") String ff, @Param("id_caso") Long id_caso);

    @Query(value = "SELECT sum(tiempo) FROM sesion as s, caso as c, caso_abogado as ca WHERE s.id_caso = c.id AND c.id = :id_caso AND s.borrado = 0 AND s.id_abogado = ca.id_abogado AND ca.id_abogado = :id_abo AND ca.id_caso = c.id AND s.fecha BETWEEN :fi AND :ff", nativeQuery = true)
    Integer getTiempoSesionesPorClienteConAbogado(@Param("id_abo") Long id_abo, @Param("fi") String fi, @Param("ff") String ff, @Param("id_caso") Long id_caso);

    // PARA INFOTABLA CON ABOGADO
      @Query(value =    "SELECT count(*) as cantidadClientes " +
                    "FROM (SELECT distinct cl.nombre " + 
                        "FROM mrp.sesion as se, mrp.cliente as cl, mrp.caso as ca "+
                        "WHERE cl.borrado = 0 AND cl.id = ca.id_cliente AND se.id_caso = ca.id AND se.id_abogado = :idAbogado AND "+
                              "se.fecha  BETWEEN :fechaInicio AND :fechaFin) as clientes", nativeQuery = true)
  int getConsultaCantidadClientesByIdAbogado(@Param("fechaInicio") String fechaInicio, @Param("fechaFin") String fechaFin, @Param("idAbogado") Long idAbogado);

}
