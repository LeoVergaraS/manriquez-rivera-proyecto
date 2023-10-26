package manriquezrivera.proyecto.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manriquezrivera.proyecto.entity.Sesion;
import manriquezrivera.proyecto.repositories.SesionRepository;

@Service
public class SesionService{
    @Autowired
    private SesionRepository sesionRepository;

    public List<Sesion> getAllSesiones(){
        return sesionRepository.getAll();
    }

    public Sesion getSesionById(Long id){
        return sesionRepository.getById(id);
    }

    public List<Sesion> getSesionByIdAbogado(Long id){
        return sesionRepository.getByIdAbogado(id);
    }

    public Sesion saveSesion(Sesion sesion){
        return sesionRepository.save(sesion);
    }

    public Sesion deleteSesion(Sesion sesion){
        sesion.setBorrado(true);
        return sesionRepository.save(sesion);
    }
}