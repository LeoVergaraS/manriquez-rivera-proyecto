package manriquezrivera.proyecto.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.node.ObjectNode;

import manriquezrivera.proyecto.entity.Caso;
import manriquezrivera.proyecto.entity.Abogado;
import manriquezrivera.proyecto.entity.CasoAbogado;
import manriquezrivera.proyecto.entity.Cliente;
import manriquezrivera.proyecto.entity.Sesion;
import manriquezrivera.proyecto.entity.Submateria;
import manriquezrivera.proyecto.models.CasoDTO;
import manriquezrivera.proyecto.repositories.CasoAbogadoRepository;
import manriquezrivera.proyecto.repositories.CasoRepository;
import manriquezrivera.proyecto.repositories.SesionRepository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;

@Service
public class CasoService {
    @Autowired
    private CasoRepository casoRepository;

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private SubMateriaService subMateriaService;

    @Autowired
    private CasoAbogadoRepository casoAbogadoRepository;

    @Autowired
    private SesionRepository sesionRepository;

    public List<Caso> getAllCasos() {
        return casoRepository.getAll();
    }

    public Caso getCasoById(Long id) {
        return casoRepository.getById(id);
    }

    public List<Caso> getCasoByIdAbogado(Integer id) {
        Long idLong = id.longValue();
        if (idLong == -1) {
            return casoRepository.getAll();
        } else {
            return casoRepository.getByIdAbogado(idLong);
        }
    }

    private List<Long> castRequestToIds(ObjectNode request) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            ObjectReader reader = mapper.readerFor(new TypeReference<List<Long>>() {
            });
            List<Long> abogados = reader.readValue(request.get("abogados"));
            return abogados;
        } catch (IOException e) {
            // Handle the exception here
            e.printStackTrace();
        }
        return null;
    }

    private Caso castRequestToCaso(ObjectNode request) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            ObjectReader reader = mapper.readerFor(new TypeReference<Caso>() {
            });
            Caso caso = reader.readValue(request.get("caso"));
            return caso;
        } catch (IOException e) {
            // Handle the exception here
            e.printStackTrace();
        }
        return null;
    }

    public Caso saveCaso(ObjectNode request) {
        List<Long> abogados = castRequestToIds(request);
        Caso caso = castRequestToCaso(request);

        String nombreCliente = caso.getId_cliente().getNombre();
        String nombreSubmateria = caso.getId_submateria().getNombre();

        Cliente cliente = clienteService.getClienteByNombre(nombreCliente);
        Submateria submateria = subMateriaService.getSubmateriaByNombre(nombreSubmateria);

        if (cliente == null) {
            Cliente clienteCreado = clienteService.saveCliente(new Cliente(null, nombreCliente, false));
            caso.setId_cliente(clienteCreado);
        } else {
            caso.setId_cliente(cliente);
        }

        if (submateria == null) {
            Submateria submateriaCreada = subMateriaService.saveSubMateria(new Submateria(null, nombreSubmateria, false));
            caso.setId_submateria(submateriaCreada);
        } else {
            caso.setId_submateria(submateria);
        }

        Caso casoGuardado = casoRepository.save(caso);

        // creacion de tupla en tabla intermdia
        for (Long id_abogado : abogados) {
            CasoAbogado ca = casoAbogadoRepository.getByCasoByAbogado(casoGuardado.getId(), id_abogado);
            if (ca == null) {
                CasoAbogado nuevoCasoAbogado = new CasoAbogado(null, casoGuardado,
                        new Abogado(id_abogado, null, false));
                casoAbogadoRepository.save(nuevoCasoAbogado);
            }
        }

        return casoGuardado;
    }

    public Caso deleteCaso(Caso caso) {
        caso.setBorrado(true);
        return casoRepository.save(caso);
    }

    // CON INTERVALO DE FECHA
    public List<Caso> getCasoByFecha(Integer id, String fechaInicio, String fechaFin) {
        Long idLong = id.longValue();
        if (idLong == -1) {
            return casoRepository.getCasosByFechaSinAbogado(fechaInicio, fechaFin);
        } else {
            return casoRepository.getCasosByFecha(idLong, fechaInicio, fechaFin);
        }
    }

    // DESDE SIEMPRE
    public List<Caso> getCasoDesdeSiempre(Integer id, String fechaInicio, String fechaFin) {
        Long idLong = id.longValue();

        if (idLong == -1) {
            System.out.println("Sin abogado");
            List<Sesion> sesiones = sesionRepository.getByIdAbogadoAuxSinAbogado();
            fechaInicio = sesiones.get(0).getFecha().toString();
            return casoRepository.getCasosByFechaSinAbogado(fechaInicio, fechaFin);
        } else {
            System.out.println("Con abogado");
            List<Sesion> sesiones = sesionRepository.getByIdAbogadoAux(idLong);
            fechaInicio = sesiones.get(0).getFecha().toString();
            return casoRepository.getCasosByFecha(idLong, fechaInicio, fechaFin);
        }
    }

    public List<CasoDTO> mapCasosToDTO(List<Caso> casos) {
        List<CasoDTO> casosDTO = new ArrayList<>();
        for (Caso caso : casos) {
            casosDTO.add(mapCasoToDTO(caso));
        }
        return casosDTO;
    }

    public CasoDTO mapCasoToDTO(Caso caso) {
        CasoDTO casoDTO = new CasoDTO();
        casoDTO.setId(caso.getId());
        casoDTO.setFecha(caso.getFecha());
        casoDTO.setNombre_cliente(caso.getId_cliente().getNombre());
        casoDTO.setNombre_materia(caso.getId_materia().getNombre());
        return casoDTO;
    }

}