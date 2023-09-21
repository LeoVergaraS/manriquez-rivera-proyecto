package manriquezrivera.proyecto.services;

@Service
public class MateriaService{
    @Autowired
    private MateriaRepository materiaRepository;

    public List<Materia> getAllMaterias(){
        return materiaRepository.findAll();
    }

    public Materia getMateriaById(Long id){
        return materiaRepository.findById(id).get();
    }

    public Materia saveMateria(Materia materia){
        return materiaRepository.save(materia);
    }

    public void deleteMateriaById(Long id){
        materiaRepository.deleteById(id);
    }
}