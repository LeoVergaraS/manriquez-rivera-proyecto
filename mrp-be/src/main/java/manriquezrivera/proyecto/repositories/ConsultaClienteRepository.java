package manriquezrivera.proyecto.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import manriquezrivera.proyecto.models.ConsultaCliente;

@Repository
public interface ConsultaClienteRepository extends JpaRepository<ConsultaCliente, Long>{
  @Query(value = "SELECT fecha, sum(tiempo) as tiempo " + 
                 "FROM sesion " + 
                 "WHERE id_cliente = :id " + 
                 "GROUP BY fecha", nativeQuery = true)
  List<ConsultaCliente> getConsultaClientes(@Param("id") Long id);
}
