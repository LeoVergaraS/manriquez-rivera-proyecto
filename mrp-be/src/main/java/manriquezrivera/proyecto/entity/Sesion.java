package manriquezrivera.proyecto.entity;
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
}
