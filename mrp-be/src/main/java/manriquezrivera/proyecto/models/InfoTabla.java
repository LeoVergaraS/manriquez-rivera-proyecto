package manriquezrivera.proyecto.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InfoTabla{
    private Integer cantidad_sesiones;
    private Integer cantidad_tiempo;
    private Integer cantidad_clientes;
    private String nombre_cliente_max;
    private Integer tiempo_cliente_max;
    private Integer cantidad_materias;
    private String nombre_materia_max;
    private Integer tiempo_materia_max;
    private Integer cantidad_submateria;
    private String nombre_submateria_max;
    private Integer tiempo_submateria_max;
}