package manriquezrivera.proyecto.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manriquezrivera.proyecto.entity.Caso;
import manriquezrivera.proyecto.repositories.CasoRepository;

@Service
public class CasoService{
    @Autowired
    private CasoRepository casoRepository;

    public List<Caso> getAllCasos(){
        return casoRepository.getAll();
    }

    public Caso getCasoById(Long id){
        return casoRepository.getById(id);
    }

    public Caso saveCaso(Caso caso){
        return casoRepository.save(caso);
    }

    public Caso deleteCaso(Caso caso){
        caso.setBorrado(true);
        return casoRepository.save(caso);
    }
}