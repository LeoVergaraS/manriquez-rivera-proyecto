package manriquezrivera.proyecto.services;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manriquezrivera.proyecto.entity.Caso;
import manriquezrivera.proyecto.entity.Abogado;
import manriquezrivera.proyecto.entity.CasoAbogado;
import manriquezrivera.proyecto.entity.Cliente;
import manriquezrivera.proyecto.repositories.CasoAbogadoRepository;
import manriquezrivera.proyecto.repositories.CasoRepository;

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

    public Caso saveCaso(Map<Caso,List<Long>>  request){
        
        List<Long> abogados = request.get("abogados");
        Caso caso = (Caso) request.get("caso");

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
            CasoAbogado nuevoCasoAbogado = new CasoAbogado(null, casoGuardado , new Abogado(id_abogado,null));
            casoAbogadoRepository.save(nuevoCasoAbogado);
        }

        return casoRepository.save(caso);
    }

    public Caso deleteCaso(Caso caso){
        caso.setBorrado(true);
        return casoRepository.save(caso);
    }
}