package manriquezrivera.proyecto.models;

import java.sql.Date;

import lombok.Data;
import manriquezrivera.proyecto.entity.Cliente;
import manriquezrivera.proyecto.entity.Materia;
import manriquezrivera.proyecto.entity.Submateria;

@Data
public class CasoDTO {
    private Long id;
    private boolean borrado;
    private Date fecha;
    private Materia id_materia;
    private Submateria id_submateria;
    private Cliente id_cliente;
}
