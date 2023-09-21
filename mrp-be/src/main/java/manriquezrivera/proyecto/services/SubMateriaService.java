package manriquezrivera.proyecto.services;

@Service 
public class SubMateriaService{
    @Autowired
    private SubMateriaRepository subMateriaRepository;

    public List<SubMateria> getAllSubMaterias(){
        return subMateriaRepository.findAll();
    }

    public SubMateria getSubMateriaById(Long id){
        return subMateriaRepository.findById(id).get();
    }

    public SubMateria saveSubMateria(SubMateria subMateria){
        return subMateriaRepository.save(subMateria);
    }

    public void deleteSubMateriaById(Long id){
        subMateriaRepository.deleteById(id);
    }
}