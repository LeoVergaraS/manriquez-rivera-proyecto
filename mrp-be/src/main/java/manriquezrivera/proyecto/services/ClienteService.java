package manriquezrivera.proyecto.services;

@Service
public class ClienteService{
    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> getAllClientes(){
        return clienteRepository.findAll();
    }

    public Cliente getClienteById(Long id){
        return clienteRepository.findById(id).get();
    }

    public Cliente saveCliente(Cliente cliente){
        return clienteRepository.save(cliente);
    }

    public void deleteClienteById(Long id){
        clienteRepository.deleteById(id);
    }
}