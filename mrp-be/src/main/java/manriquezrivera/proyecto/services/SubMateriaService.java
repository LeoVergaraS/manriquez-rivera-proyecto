package manriquezrivera.proyecto.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import manriquezrivera.proyecto.entity.Submateria;

import manriquezrivera.proyecto.repositories.SubMateriaRepository;

@Service 
public class SubMateriaService{
    @Autowired
    private SubMateriaRepository subMateriaRepository;

    public List<Submateria> getAllSubMaterias(){
        return subMateriaRepository.findAll();
    }

    public Submateria getSubMateriaById(Long id){
        return subMateriaRepository.findById(id).get();
    }

    public Submateria saveSubMateria(Submateria subMateria){
        return subMateriaRepository.save(subMateria);
    }

    public void deleteSubMateriaById(Long id){
        subMateriaRepository.deleteById(id);
    }
}