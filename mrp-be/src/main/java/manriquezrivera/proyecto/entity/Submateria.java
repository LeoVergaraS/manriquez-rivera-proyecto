package manriquezrivera.proyecto.entity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_materia")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Materia id_materia;
}
