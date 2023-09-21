package manriquezrivera.proyecto.entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
@Entity
@Table(name = "sub_materia")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Submateria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    private Long id_materia;    
}
