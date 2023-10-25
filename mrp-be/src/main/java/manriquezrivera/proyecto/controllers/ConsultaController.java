package manriquezrivera.proyecto.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import manriquezrivera.proyecto.models.InfoTabla;
import manriquezrivera.proyecto.models.InfoTablaCliente;
import manriquezrivera.proyecto.models.InfoTablaMateria;
import manriquezrivera.proyecto.models.ConsultaCliente;
import manriquezrivera.proyecto.models.ConsultaSesiones;
import manriquezrivera.proyecto.models.ConsultaMateria;
import manriquezrivera.proyecto.services.ConsultaService;

@RestController
@CrossOrigin
@RequestMapping("/consultas")
public class ConsultaController {
  @Autowired
  ConsultaService consultaService;

  @GetMapping("/cliente/{id}/{fi}/{ff}")
  public ResponseEntity<List<ConsultaCliente>> getConsultasCliente(@PathVariable("id") Long id,
      @PathVariable("fi") String fechaInicio, @PathVariable("ff") String fechaFin) {
    List<ConsultaCliente> consultasCliente = consultaService.getCC(id, fechaInicio, fechaFin);
    if (consultasCliente == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().body(consultasCliente);
  }

  // cantidad de clientes
  @GetMapping("/cliente/cantidad/{fi}/{ff}")
  public ResponseEntity<Integer> getConsultaCantidadClientes(@PathVariable("fi") String fechaInicio,
      @PathVariable("ff") String fechaFin) {
    int consultasCliente = consultaService.getCantidadClientes(fechaInicio, fechaFin);
    if (consultasCliente == 0) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().body(consultasCliente);
  }

  @GetMapping("/materia/{fi}/{ff}/{dropSelect}/{dropSiempre}")
  public ResponseEntity<List<ConsultaMateria>> getConsultasMateria(@PathVariable("fi") String fechaInicio,
      @PathVariable("ff") String fechaFin, @PathVariable("dropSelect") Integer dropSelect,
      @PathVariable("dropSiempre") Integer dropSiempre) {
    List<ConsultaMateria> consultasMaterias = consultaService.getCM(fechaInicio, fechaFin, dropSelect, dropSiempre);
    if (consultasMaterias == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().body(consultasMaterias);
  }

  @GetMapping("/sesiones/{fi}/{ff}/{dropSelect}/{dropSiempre}/{dropAnio}")
  public ResponseEntity<List<ConsultaSesiones>> getConsultasSesiones(@PathVariable("fi") String fechaInicio,
      @PathVariable("ff") String fechaFin, @PathVariable("dropSelect") Integer dropSelect,
      @PathVariable("dropSiempre") Integer dropSiempre, @PathVariable("dropAnio") Integer dropAnio) {
    List<ConsultaSesiones> consultaSesiones = consultaService.getCS(fechaInicio, fechaFin, dropSelect, dropSiempre,
        dropAnio);
    if (consultaSesiones == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().body(consultaSesiones);
  }

  // cantidad de sesiones por tal intervalo de tiempo
  @GetMapping("/sesiones/cantidad/{fi}/{ff}")
  public ResponseEntity<Integer> getConsultasCantidadSesiones(@PathVariable("fi") String fechaInicio,
      @PathVariable("ff") String fechaFin) {
    int consultaSesiones = consultaService.getCCS(fechaInicio, fechaFin);
    if (consultaSesiones == 0) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().body(consultaSesiones);
  }

  // cantidad de tiempo total de sesiones
  @GetMapping("/sesiones/tiempo/{fi}/{ff}")
  public ResponseEntity<Integer> getConsultasTiempoSesiones(@PathVariable("fi") String fechaInicio,
      @PathVariable("ff") String fechaFin) {
    int consultaTiempoSesiones = consultaService.getCCT(fechaInicio, fechaFin);
    if (consultaTiempoSesiones == 0) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().body(consultaTiempoSesiones);
  }

  @GetMapping("/prueba/{fi}/{ff}/{dropSiempre}")
  public ResponseEntity<InfoTabla> getPrueba(@PathVariable("fi") String fechaInicio,
      @PathVariable("ff") String fechaFin, @PathVariable("dropSiempre") Integer dropSiempre) {
    InfoTabla consultaInfotabla = consultaService.getInfoTabla(fechaInicio, fechaFin, dropSiempre);
    if (consultaInfotabla == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().body(consultaInfotabla);
  }

  @GetMapping("/sesiones/id_caso/{id}/{fi}/{ff}/{flag}")
  public ResponseEntity<List<ConsultaSesiones>> getByidCasoEntity(@PathVariable("id") Long id, @PathVariable("fi") String fechaInicio, @PathVariable("ff") String fechaFin, @PathVariable("flag") Integer flag){
    List<ConsultaSesiones> consultas = consultaService.getConsultasByCaso(id, fechaInicio, fechaFin, flag);
    if(consultas == null){
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().body(consultas);
  }

  @GetMapping("/materia/estadisticas/{abo}/{id}/{fi}/{ff}")
  public ResponseEntity<InfoTablaMateria> getEstadisticasMateria(@PathVariable("abo") String abogado, @PathVariable("id") Long id_materia, @PathVariable("fi") String fechaInicio,
      @PathVariable("ff") String fechaFin) {
    InfoTablaMateria consultaEstadisticasMateria = consultaService.getInfoTablaMateria(abogado, id_materia, fechaInicio, fechaFin);
    return ResponseEntity.ok().body(consultaEstadisticasMateria);
  }

  @GetMapping("/cliente/estadisticas/{abo}/{id}/{fi}/{ff}")
    public ResponseEntity<InfoTablaCliente> getEstadisticasCliente(@PathVariable("abo") String abogado, @PathVariable("id") Long id_caso, @PathVariable("fi") String fechaInicio,
      @PathVariable("ff") String fechaFin) {
    InfoTablaCliente consultaEstadisticasCliente = consultaService.getInfoTablaCliente(abogado, id_caso, fechaInicio, fechaFin);
    return ResponseEntity.ok().body(consultaEstadisticasCliente);
  }
}
