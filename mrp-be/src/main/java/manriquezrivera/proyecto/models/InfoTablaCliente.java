package manriquezrivera.proyecto.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InfoTablaCliente {
  private Integer cantidad_sesiones;
  private Integer tiempo_total;
}
