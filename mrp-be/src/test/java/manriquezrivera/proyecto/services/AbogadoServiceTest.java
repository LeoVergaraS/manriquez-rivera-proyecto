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
import manriquezrivera.proyecto.repositories.AbogadoRepository;

@ExtendWith(MockitoExtension.class)
class AbogadoServiceTest {

    @Mock
    private AbogadoRepository abogadoRepository;

    @InjectMocks
    private AbogadoService abogadoService;

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

    @DisplayName("Test getAbogados")
    @Test
    void testGetAbogados() {
        // Configurando el comportamiento del repositorio mock
        List<Abogado> listaAbogadosMock = Collections.singletonList(abogado);
        when(abogadoRepository.findAll()).thenReturn(listaAbogadosMock);

        // Ejecutando el método que quieres probar
        List<Abogado> listaAbogados = abogadoService.getAbogados();

        // Verificando que el método del repositorio mock fue invocado
        verify(abogadoRepository, times(1)).findAll();

        // Verificando que la lista retornada es la esperada
        assertEquals(listaAbogadosMock, listaAbogados);
    }

    @DisplayName("Test saveAbogado")
    @Test
    void testSaveAbogado() {
        // Configurando el comportamiento del repositorio mock
        when(abogadoRepository.save(abogado)).thenReturn(abogado);

        // Ejecutando el método que quieres probar
        Abogado abogadoGuardado = abogadoService.saveAbogado(abogado);

        // Verificando que el método del repositorio mock fue invocado
        verify(abogadoRepository, times(1)).save(abogado);

        // Verificando que el abogado retornado es el esperado
        assertEquals(abogado, abogadoGuardado);
    }

    @DisplayName("Test getAbogadosByCaso")
    @Test
    void testGetAbogadosByCaso() {
        // Configurando el comportamiento del repositorio mock
        List<Abogado> listaAbogadosMock = Collections.singletonList(abogado);
        when(abogadoRepository.getByCaso(1L)).thenReturn(listaAbogadosMock);

        // Ejecutando el método que quieres probar
        List<Abogado> listaAbogados = abogadoService.getAbogadosByCaso(1L);

        // Verificando que el método del repositorio mock fue invocado
        verify(abogadoRepository, times(1)).getByCaso(1L);

        // Verificando que la lista retornada es la esperada
        assertEquals(listaAbogadosMock, listaAbogados);
    }

    @DisplayName("Test getAbogadoByNombre")
    @Test
    void testGetAbogadoByNombre() {
        // Configurando el comportamiento del repositorio mock
        when(abogadoRepository.getByNombre("Abogado 1")).thenReturn(abogado);

        // Ejecutando el método que quieres probar
        Abogado abogadoEncontrado = abogadoService.getAbogadoByNombre("Abogado 1");

        // Verificando que el método del repositorio mock fue invocado
        verify(abogadoRepository, times(1)).getByNombre("Abogado 1");

        // Verificando que el abogado retornado es el esperado
        assertEquals(abogado, abogadoEncontrado);
    }

    @DisplayName("Test deleteAbogado")
    @Test
    void testDeleteAbogado() {
        when(abogadoService.deleteAbogado(abogado)).thenReturn(abogado);
        boolean borradoAbogado = abogadoService.deleteAbogado(abogado).isBorrado();
        assertEquals(true, borradoAbogado);
    }
    

}
