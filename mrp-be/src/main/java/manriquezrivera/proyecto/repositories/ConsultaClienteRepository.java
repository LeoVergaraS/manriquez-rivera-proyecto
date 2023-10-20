package manriquezrivera.proyecto.repositories;

import java.util.List;

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

    @Query(value= "SELECT * "+
                  "FROM(SELECT cl.nombre, sum(tiempo) as tiempo "+
			          "FROM mrp.sesion as se, mrp.cliente as cl, mrp.caso as ca "+
                      "WHERE cl.borrado = 0 AND  cl.id = ca.id_cliente AND se.id_caso = ca.id AND "+
                      "se.fecha  BETWEEN :fechaInicio AND :fechaFin "+
                      "group by cl.nombre) as clTiempo "+
                  "order by tiempo desc "+
		          "Limit 1", nativeQuery=true)
    String getConsultaNombreTiempoClienteMax(@Param("fechaInicio") String fechaInicio, @Param("fechaFin") String fechaFin);
}
