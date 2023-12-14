package manriquezrivera.proyecto.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import manriquezrivera.proyecto.services.ClienteService;
import manriquezrivera.proyecto.entity.Cliente;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@CrossOrigin
@RequestMapping("/api/clientes")
public class ClienteController {
    @Autowired
    ClienteService clienteService;

    @GetMapping
    public ResponseEntity<List<Cliente>> getClientes(){
      List<Cliente> clientes = clienteService.getAllClientes();
      if(clientes == null){
        return ResponseEntity.notFound().build();
      }
      return ResponseEntity.ok().body(clientes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> getCliente(@PathVariable(value = "id") Long id){
      Cliente cliente = clienteService.getClienteById(id);
      if(cliente == null){
        return ResponseEntity.notFound().build();
      }
      return ResponseEntity.ok().body(cliente);
    }

    @PostMapping
    public ResponseEntity<Cliente> postCliente(@RequestBody Cliente cliente){
      
      Cliente clienteExistente = clienteService.getClienteByNombre(cliente.getNombre());
      if(clienteExistente != null){
        return ResponseEntity.badRequest().build();
      }      
      
      else{
        Cliente clienteGuardado = clienteService.saveCliente(cliente);
        return ResponseEntity.ok().body(clienteGuardado);
      }
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteCliente(@RequestBody Cliente cliente){
      clienteService.deleteCliente(cliente);
      return ResponseEntity.ok().body("Cliente eliminado correctamente");
    }
}
