package manriquezrivera.proyecto.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import manriquezrivera.proyecto.entity.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long>{
    @Query(value = "SELECT * FROM cliente WHERE borrado = 0", nativeQuery = true)
    List<Cliente> getAll();

    @Query(value = "SELECT * FROM cliente WHERE borrado = 0 AND id = :id", nativeQuery = true)
    Cliente getById(@Param("id") Long id);

    @Query(value = "SELECT * FROM cliente WHERE borrado = 0 AND nombre = :nombre", nativeQuery = true)
    Cliente getByNombre(@Param("nombre") String nombre);

}
