package manriquezrivera.proyecto.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import manriquezrivera.proyecto.entity.Abogado;
import manriquezrivera.proyecto.entity.Caso;
import manriquezrivera.proyecto.entity.Cliente;
import manriquezrivera.proyecto.entity.Materia;
import manriquezrivera.proyecto.entity.Submateria;
import manriquezrivera.proyecto.repositories.CasoRepository;

@ExtendWith(MockitoExtension.class)
public class CasoServiceTest {
    @Mock
    private CasoRepository casoRepository;

    @InjectMocks
    private CasoService casoService;

    Abogado abogado;
    Caso caso;
    Materia materia;
    Submateria submateria;
    Cliente cliente;

    @BeforeEach
    void setup() {
        abogado = new Abogado();
        abogado.setId(1L);
        abogado.setNombre("Abogado 1");
        abogado.setBorrado(false);

        materia = new Materia();
        materia.setId(1L);
        materia.setNombre("Materia 1");
        materia.setBorrado(false);

        submateria = new Submateria();
        submateria.setId(1L);
        submateria.setNombre("Submateria 1");
        submateria.setBorrado(false);

        cliente = new Cliente();
        cliente.setId(1L);
        cliente.setNombre("Cliente 1");
        cliente.setBorrado(false);

        caso = new Caso();
        caso.setId(1L);
        caso.setFecha(null);
        caso.setBorrado(false);
        caso.setId_materia(materia);
        caso.setId_submateria(submateria);
        caso.setId_cliente(cliente);
    }

    @DisplayName("Test getCasos")
    @Test
    void testGetCasos() {
        // Configurando el comportamiento del repositorio mock
        List<Caso> listaCasosMock = Collections.singletonList(caso);
        when(casoRepository.getAll()).thenReturn(listaCasosMock);

        // Ejecutando el método que quieres probar
        List<Caso> listaCasos = casoService.getAllCasos();

        // Verificando que la lista retornada es la esperada
        assertEquals(listaCasosMock, listaCasos);
    }

    @DisplayName("Test getCasosByAbogado")
    @Test
    void testGetCasosByAbogado() {
        // Configurando el comportamiento del repositorio mock
        List<Caso> listaCasosMock = Collections.singletonList(caso);
        when(casoRepository.getByIdAbogado(1L)).thenReturn(listaCasosMock);

        // Ejecutando el método que quieres probar
        List<Caso> listaCasos = casoService.getCasoByIdAbogado(1);

        // Verificando que la lista retornada es la esperada
        assertEquals(listaCasosMock, listaCasos);
    }
    
}
