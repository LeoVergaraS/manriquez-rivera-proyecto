package manriquezrivera.proyecto.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Date;
@Entity
@Table(name = "caso")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Caso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    private String abogado;
    private boolean borrado;
    private Date fecha;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_materia")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Materia id_materia;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_submateria")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Submateria id_submateria;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cliente")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Cliente id_cliente;

}