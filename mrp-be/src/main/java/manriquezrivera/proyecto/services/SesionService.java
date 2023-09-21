package manriquezrivera.proyecto.services;

@Service
public class SesionService{
    @Autowired
    private SesionRepository sesionRepository;

    public List<Sesion> getAllSesiones(){
        return sesionRepository.findAll();
    }

    public Sesion getSesionById(Long id){
        return sesionRepository.findById(id).get();
    }

    public Sesion saveSesion(Sesion sesion){
        return sesionRepository.save(sesion);
    }

    public void deleteSesionById(Long id){
        sesionRepository.deleteById(id);
    }
}