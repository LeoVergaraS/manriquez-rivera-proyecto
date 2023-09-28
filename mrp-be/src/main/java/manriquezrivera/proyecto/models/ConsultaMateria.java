package manriquezrivera.proyecto.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConsultaMateria {
  @Id
  private String nombre;
  private Long tiempo;
}
