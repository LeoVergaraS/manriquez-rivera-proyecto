package manriquezrivera.proyecto.models;

import java.sql.Date;

import lombok.Data;

@Data
public class CasoDTO {
    private Long id;
    private Date fecha;
    private String nombre_cliente;
    private String nombre_materia;
}
