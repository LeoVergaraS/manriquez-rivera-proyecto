package manriquezrivera.proyecto.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import manriquezrivera.proyecto.entity.Abogado;
import manriquezrivera.proyecto.services.AbogadoService;

@RestController
@CrossOrigin
@RequestMapping("/abogados")
public class AbogadoController {
  @Autowired
  AbogadoService abogadoService;

  @GetMapping("/test")
  public ResponseEntity<String> test(){
    return ResponseEntity.ok().body("AbogadoController funciona correctamente");
  }

  @GetMapping
  public ResponseEntity<List<Abogado>> getAbogados(){
    List<Abogado> abogados = abogadoService.getAbogados();
    if(abogados == null){
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().body(abogados);
  }

  @PostMapping
  public ResponseEntity<Abogado> saveAbogado(@RequestBody Abogado abogado){
    Abogado abogadoSaved = abogadoService.saveAbogado(abogado);
    if(abogadoSaved == null){
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().body(abogadoSaved);
  }

  @GetMapping("/caso/{id_caso}")
  public ResponseEntity<List<Abogado>> getAbogadosByCaso(@PathVariable("id_caso") Long id_caso){
    List<Abogado> abogados = abogadoService.getAbogadosByCaso(id_caso);
    if(abogados == null){
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().body(abogados);
  }

  @PostMapping("/delete")
  public ResponseEntity<String> deleteAbogado(@RequestBody Abogado abogado){
    abogadoService.deleteAbogado(abogado);
    return ResponseEntity.ok().body("Abogado eliminado correctamente");
  }

}
