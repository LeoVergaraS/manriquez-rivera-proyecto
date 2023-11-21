package manriquezrivera.proyecto.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import manriquezrivera.proyecto.entity.Submateria;
import manriquezrivera.proyecto.services.SubMateriaService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@CrossOrigin
@RequestMapping("/submaterias")
public class SubmateriaController {
  @Autowired
  SubMateriaService submateriaService;

  @GetMapping
  public ResponseEntity<List<Submateria>> getSubmaterias() {
    List<Submateria> submaterias = submateriaService.getAllSubMaterias();
    if (submaterias == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().body(submaterias);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Submateria> getSubmateria(@PathVariable(value = "id") Long id) {
    Submateria submateria = submateriaService.getSubMateriaById(id);
    if (submateria == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().body(submateria);
  }

  @PostMapping
  public ResponseEntity<Submateria> postSubmateria(@RequestBody Submateria submateria) {
    Submateria submateriaExistente = submateriaService.getSubmateriaByNombre(submateria.getNombre());
    if (submateriaExistente != null) {
      return ResponseEntity.badRequest().build();
    }

    Submateria submateriaGuardada = submateriaService.saveSubMateria(submateria);
    return ResponseEntity.ok().body(submateriaGuardada);
  }

  @PostMapping("/delete")
  public ResponseEntity<String> deleteSubmateria(@RequestBody Submateria submateria) {
    submateriaService.deleteSubMateria(submateria);
    return ResponseEntity.ok().body("Submateria eliminada correctamente");
  }
}
