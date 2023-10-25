package manriquezrivera.proyecto.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Table(name = "caso_abogado")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CasoAbogado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
   

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_caso")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Caso id_caso;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_abogado")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Abogado id_abogado;

}