package manriquezrivera.proyecto.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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

  @GetMapping
  public ResponseEntity<List<Abogado>> getAbogados(){
    List<Abogado> abogados = abogadoService.getAbogados();
    if(abogados == null){
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().body(abogados);
  }

}