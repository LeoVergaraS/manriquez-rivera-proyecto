package manriquezrivera.proyecto.models;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class  ConsultaSesiones{
    @Id
    private Long tiempo;
    private Date fecha;
}