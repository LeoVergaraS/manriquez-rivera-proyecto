package manriquezrivera.proyecto.services;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.node.ObjectNode;

import manriquezrivera.proyecto.entity.Caso;
import manriquezrivera.proyecto.entity.Abogado;
import manriquezrivera.proyecto.entity.CasoAbogado;
import manriquezrivera.proyecto.entity.Cliente;
import manriquezrivera.proyecto.repositories.CasoAbogadoRepository;
import manriquezrivera.proyecto.repositories.CasoRepository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;

@Service
public class CasoService{
    @Autowired
    private CasoRepository casoRepository;

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private CasoAbogadoRepository casoAbogadoRepository;

    

    public List<Caso> getAllCasos(){
        return casoRepository.getAll();
    }

    public Caso getCasoById(Long id){
        return casoRepository.getById(id);
    }

    public List<Caso> getCasoByIdAbogado(Integer id){
        Long idLong = id.longValue();
        if(idLong == 0){
            return casoRepository.getAll();
        }else{
            return casoRepository.getByIdAbogado(idLong);
        }
    }
    private List<Long> castRequestToIds(ObjectNode request){
        ObjectMapper mapper = new ObjectMapper();
        try {
            ObjectReader reader = mapper.readerFor(new TypeReference<List<Long>>() {});
            List<Long> abogados = reader.readValue(request.get("abogados"));
            return abogados;
        } catch (IOException e) {
            // Handle the exception here
            e.printStackTrace();
        }
        return null;
    }

    private Caso castRequestToCaso(ObjectNode request){
        ObjectMapper mapper = new ObjectMapper();
        try {
            ObjectReader reader = mapper.readerFor(new TypeReference<Caso>() {});
            Caso caso = reader.readValue(request.get("caso"));
            return caso;
        } catch (IOException e) {
            // Handle the exception here
            e.printStackTrace();
        }
        return null;
    }

    public Caso saveCaso(ObjectNode request){
        List<Long> abogados = castRequestToIds(request);
        Caso caso = castRequestToCaso(request);

        String nombreCliente = caso.getId_cliente().getNombre();
        Cliente cliente = clienteService.getClienteByNombre(nombreCliente);

        if(cliente == null){
            Cliente clienteCreado = clienteService.saveCliente(new Cliente(null, nombreCliente, false)); 
            caso.setId_cliente(clienteCreado);
        }else{
            caso.setId_cliente(cliente);
        }

        Caso casoGuardado = casoRepository.save(caso);

        //creacion de tupla en tabla intermdia
        for(Long id_abogado : abogados){
            CasoAbogado ca = casoAbogadoRepository.getByCasoByAbogado(casoGuardado.getId(), id_abogado);
            if(ca == null){
                CasoAbogado nuevoCasoAbogado = new CasoAbogado(null, casoGuardado , new Abogado(id_abogado, null, false));
                casoAbogadoRepository.save(nuevoCasoAbogado);
            } 
        }

        return casoGuardado;
    }

    public Caso deleteCaso(Caso caso){
        caso.setBorrado(true);
        return casoRepository.save(caso);
    }
}