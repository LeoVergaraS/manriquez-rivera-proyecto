package manriquezrivera.proyecto.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manriquezrivera.proyecto.entity.Materia;
import manriquezrivera.proyecto.repositories.MateriaRepository;

@Service
public class MateriaService{
    @Autowired
    private MateriaRepository materiaRepository;

    public List<Materia> getAllMaterias(){
        return materiaRepository.getAll();
    }

    public Materia getMateriaById(Long id){
        return materiaRepository.getById(id);
    }

    public Materia saveMateria(Materia materia){
        return materiaRepository.save(materia);
    }

    public Materia deleteMateria(Materia materia){
        materia.setBorrado(true);
        return materiaRepository.save(materia);
    }
}