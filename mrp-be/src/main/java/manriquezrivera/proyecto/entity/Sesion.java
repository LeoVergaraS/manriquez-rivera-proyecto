package manriquezrivera.proyecto.entity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import java.sql.Date;
@Entity
@Table(name = "sesion")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sesion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    private Long tiempo;
    private Date fecha;
    private boolean borrado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_caso")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Caso id_caso;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_abogado")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Abogado id_abogado;

}
