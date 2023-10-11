package manriquezrivera.proyecto.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import manriquezrivera.proyecto.models.ConsultaCliente;
import manriquezrivera.proyecto.models.ConsultaMateria;
import manriquezrivera.proyecto.services.ConsultaService;

@RestController
@CrossOrigin
@RequestMapping("/consultas")
public class ConsultaController {
  @Autowired
  ConsultaService consultaService;

  @GetMapping("/cliente/{id}/{fi}/{ff}")
  public ResponseEntity<List<ConsultaCliente>> getConsultasCliente(@PathVariable("id") Long id, @PathVariable("fi") String fechaInicio, @PathVariable("ff") String fechaFin){
    List<ConsultaCliente> consultasCliente = consultaService.getCC(id, fechaInicio, fechaFin);
    if(consultasCliente == null){
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().body(consultasCliente);
  }

  @GetMapping("/materia/{fi}/{ff}")
  public ResponseEntity<List<ConsultaMateria>> getConsultasMateria(@PathVariable("fi") String fechaInicio, @PathVariable("ff") String fechaFin){
    List<ConsultaMateria> consultasMaterias = consultaService.getCM(fechaInicio, fechaFin);
    if(consultasMaterias == null){
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().body(consultasMaterias);
  }
}
