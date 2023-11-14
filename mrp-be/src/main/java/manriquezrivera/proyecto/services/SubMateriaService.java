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
        return subMateriaRepository.getAll();
    }

    public Submateria getSubMateriaById(Long id){
        return subMateriaRepository.getById(id);
    }

    public List<Submateria> getSubmateriaByNombre(String nombre){
        return subMateriaRepository.getByNombre(nombre);
    }

    public List<Submateria> getSubmateriaByIdMateria(Long id_materia){
        return subMateriaRepository.getByIdMateria(id_materia);
    }

    public Submateria saveSubMateria(Submateria subMateria){
        return subMateriaRepository.save(subMateria);
    }

    public Submateria deleteSubMateria(Submateria submateria){
        submateria.setBorrado(true);
        return subMateriaRepository.save(submateria);
    }
}