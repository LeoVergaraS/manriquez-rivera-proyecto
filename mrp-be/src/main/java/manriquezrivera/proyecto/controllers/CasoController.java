package manriquezrivera.proyecto.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import manriquezrivera.proyecto.services.CasoService;
import manriquezrivera.proyecto.entity.Caso;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@CrossOrigin
@RequestMapping("/casos")
public class CasoController {
    @Autowired
    CasoService casoService;

    @GetMapping
    public ResponseEntity<List<Caso>> getCasos(){
      List<Caso> casos = casoService.getAllCasos();
      if(casos == null){
        return ResponseEntity.notFound().build();
      }
      return ResponseEntity.ok().body(casos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Caso> getCaso(@PathVariable(value = "id") Long id){
      Caso caso = casoService.getCasoById(id);
      if(caso == null){
        return ResponseEntity.notFound().build();
      }
      return ResponseEntity.ok().body(caso);
    }

    @PostMapping
    public ResponseEntity<Caso> postCaso(@RequestBody Caso caso){
      Caso casoGuardado = casoService.saveCaso(caso);
      return ResponseEntity.ok().body(casoGuardado);
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteCaso(@RequestBody Caso caso){
      Caso casoEliminado = casoService.deleteCaso(caso);
      return ResponseEntity.ok().body("Caso eliminado correctamente");
    }
}
