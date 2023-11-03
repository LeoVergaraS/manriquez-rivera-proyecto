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

  @GetMapping("/materia/{fi}/{ff}/{dropSelect}/{dropSiempre}/{idAbogado}")
  public ResponseEntity<List<ConsultaMateria>> getConsultasMateria(@PathVariable("fi") String fechaInicio,
      @PathVariable("ff") String fechaFin, @PathVariable("dropSelect") Integer dropSelect,
      @PathVariable("dropSiempre") Integer dropSiempre, @PathVariable("idAbogado") Long idAbogado) {
    List<ConsultaMateria> consultasMaterias = consultaService.getCM(fechaInicio, fechaFin, dropSelect, dropSiempre, idAbogado);
    if (consultasMaterias == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().body(consultasMaterias);
  }
  // funcion que obtiene las sesiones con respecto a los filtros
  // VISTA GENERAL
  @GetMapping("/sesiones/{fi}/{ff}/{dropSelect}/{idAbogado}")
  public ResponseEntity<List<ConsultaSesiones>> getConsultasSesiones(@PathVariable("fi") String fechaInicio,
      @PathVariable("ff") String fechaFin, @PathVariable("dropSelect") Integer dropSelect,
      @PathVariable("idAbogado") Long idAbogado) {
    List<ConsultaSesiones> consultaSesiones = consultaService.getCS(fechaInicio, fechaFin, dropSelect,
        idAbogado);
    if (consultaSesiones == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().body(consultaSesiones);
  }

    // funcion que obtiene las sesiones con respecto a los filtros
  // VISTA GENERAL
  @GetMapping("/sesiones/{idAbogado}")
  public ResponseEntity<List<ConsultaSesiones>> getConsultasSesionesDesdeSiempre(@PathVariable("idAbogado") Long idAbogado) {
    List<ConsultaSesiones> consultaSesiones = consultaService.getCSdesdeSiempre(idAbogado);
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

  @GetMapping("/prueba/{fi}/{ff}/{dropSiempre}/{idAbogado}")
  public ResponseEntity<InfoTabla> getPrueba(@PathVariable("fi") String fechaInicio,
      @PathVariable("ff") String fechaFin, @PathVariable("dropSiempre") Integer dropSiempre, @PathVariable("idAbogado") Long idAbogado) {
    InfoTabla consultaInfotabla = consultaService.getInfoTabla(fechaInicio, fechaFin, dropSiempre, idAbogado);
    if (consultaInfotabla == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().body(consultaInfotabla);
  }

  @GetMapping("/sesiones/id_caso/{id}/{fi}/{ff}/{flag}/{id_abo}")
  public ResponseEntity<List<ConsultaSesiones>> getByidCasoEntity(@PathVariable("id") Long id, @PathVariable("fi") String fechaInicio, @PathVariable("ff") String fechaFin, @PathVariable("flag") Integer flag, @PathVariable("id_abo") Long id_abo){
    List<ConsultaSesiones> consultas = consultaService.getConsultasByCaso(id, fechaInicio, fechaFin, flag, id_abo);
    if(consultas == null){
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok().body(consultas);
  }

  @GetMapping("/materia/estadisticas/{abo}/{id}/{fi}/{ff}")
  public ResponseEntity<InfoTablaMateria> getEstadisticasMateria(@PathVariable("abo") Long id_abogado, @PathVariable("id") Long id_materia, @PathVariable("fi") String fechaInicio,
      @PathVariable("ff") String fechaFin) {
    InfoTablaMateria consultaEstadisticasMateria = consultaService.getInfoTablaMateria(id_abogado, id_materia, fechaInicio, fechaFin);
    return ResponseEntity.ok().body(consultaEstadisticasMateria);
  }

  // Para los 2 cards que salen en la vista Dashboard-Cliente
  @GetMapping("/cliente/estadisticas/{id}/{fi}/{ff}/{id_abo}/{flag}")
    public ResponseEntity<InfoTablaCliente> getEstadisticasCliente(@PathVariable("id") Long id_caso, @PathVariable("fi") String fechaInicio,
      @PathVariable("ff") String fechaFin, @PathVariable("id_abo") Long id_abo, @PathVariable("flag") Integer flag) {
    InfoTablaCliente consultaEstadisticasCliente = consultaService.getInfoTablaCliente(id_caso, fechaInicio, fechaFin,  id_abo, flag);
    return ResponseEntity.ok().body(consultaEstadisticasCliente);
  }
}
