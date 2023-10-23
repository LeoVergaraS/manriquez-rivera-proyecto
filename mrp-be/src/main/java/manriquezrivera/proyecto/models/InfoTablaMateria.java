package manriquezrivera.proyecto.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InfoTablaMateria {
  private Integer cantidad_sesiones;
  private Integer tiempo_total;
  private Integer cantidad_clientes;
}
