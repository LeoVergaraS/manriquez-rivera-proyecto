package manriquezrivera.proyecto.controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import manriquezrivera.proyecto.entity.Materia;
import manriquezrivera.proyecto.services.MateriaService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@CrossOrigin
@RequestMapping("/materias")
public class MateriaController {
    @Autowired
    MateriaService materiaService;

    @GetMapping
    public ResponseEntity<List<Materia>> getMateria(){
      List<Materia> materias = materiaService.getAllMaterias();
      if(materias == null){
        return ResponseEntity.notFound().build();
      }
      return ResponseEntity.ok().body(materias);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Materia> getMateria(@PathVariable(value = "id") Long id){
      Materia materia = materiaService.getMateriaById(id);
      if(materia == null){
        return ResponseEntity.notFound().build();
      }
      return ResponseEntity.ok().body(materia);
    }

    @PostMapping
    public ResponseEntity<Materia> postMateria(@RequestBody Materia materia){
      Materia materiaGuardada = materiaService.saveMateria(materia);
      return ResponseEntity.ok().body(materiaGuardada);
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<String> deleteMateria(@PathVariable(value = "id") Long id){
      materiaService.deleteMateriaById(id);
      return ResponseEntity.ok().body("Materia eliminada correctamente");
    }
}
