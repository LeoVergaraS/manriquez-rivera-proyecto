package manriquezrivera.proyecto.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manriquezrivera.proyecto.entity.Cliente;
import manriquezrivera.proyecto.repositories.ClienteRepository;

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

    public Cliente deleteCliente(Cliente cliente){
        cliente.setBorrado(true);
        return clienteRepository.save(cliente);
    }
}