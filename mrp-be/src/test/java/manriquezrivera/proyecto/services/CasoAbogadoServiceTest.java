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
import manriquezrivera.proyecto.entity.CasoAbogado;
import manriquezrivera.proyecto.entity.Cliente;
import manriquezrivera.proyecto.entity.Materia;
import manriquezrivera.proyecto.entity.Submateria;
import manriquezrivera.proyecto.repositories.CasoAbogadoRepository;

@ExtendWith(MockitoExtension.class)
public class CasoAbogadoServiceTest {
    
    @Mock
    private CasoAbogadoRepository casoAbogadoRepository;

    @InjectMocks
    private CasoAbogadoService casoAbogadoService;

    CasoAbogado casoAbogado;
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
        submateria.setId_materia(materia);

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

        casoAbogado = new CasoAbogado();
        casoAbogado.setId(1L);
        casoAbogado.setId_abogado(abogado);
        casoAbogado.setId_caso(caso);
    }

    @DisplayName("Test getCasoAbogados")
    @Test
    void testGetCasoAbogados() {
        // Configurando el comportamiento del repositorio mock
        List<CasoAbogado> listaCasoAbogadosMock = Collections.singletonList(casoAbogado);
        when(casoAbogadoRepository.findAll()).thenReturn(listaCasoAbogadosMock);

        // Ejecutando el método que quieres probar
        List<CasoAbogado> listaCasoAbogados = casoAbogadoService.getAbogados();

        // Verificando que el método del repositorio mock fue invocado
        verify(casoAbogadoRepository, times(1)).findAll();

        // Verificando que la lista retornada es la esperada
        assertEquals(listaCasoAbogadosMock, listaCasoAbogados);
    }

    @DisplayName("Test saveCasoAbogado")
    @Test
    void testSaveCasoAbogado() {
        // Configurando el comportamiento del repositorio mock
        when(casoAbogadoRepository.save(casoAbogado)).thenReturn(casoAbogado);

        // Ejecutando el método que quieres probar
        CasoAbogado casoAbogadoGuardado = casoAbogadoService.saveCasoAbogado(casoAbogado);

        // Verificando que el método del repositorio mock fue invocado
        verify(casoAbogadoRepository, times(1)).save(casoAbogado);

        // Verificando que el objeto retornado es el esperado
        assertEquals(casoAbogado, casoAbogadoGuardado);
    }
    
}
