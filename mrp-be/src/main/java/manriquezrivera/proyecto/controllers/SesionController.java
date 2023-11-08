package manriquezrivera.proyecto.controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import manriquezrivera.proyecto.entity.Sesion;
import manriquezrivera.proyecto.services.SesionService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@CrossOrigin
@RequestMapping("/sesiones")
public class SesionController {
    @Autowired
    SesionService sesionService;

    @GetMapping
    public ResponseEntity<List<Sesion>> getSesiones(){
      List<Sesion> sesiones = sesionService.getAllSesiones();
      if(sesiones == null){
        return ResponseEntity.notFound().build();
      }
      return ResponseEntity.ok().body(sesiones);
    }

    @GetMapping("/{idAbogado}")
    public ResponseEntity<List<Sesion>> getByIdAbogado(@PathVariable(value = "idAbogado") Long idAbogado){
    List<Sesion> sesiones = sesionService.getSesionByIdAbogado(idAbogado);
    if(sesiones == null){
      return ResponseEntity.notFound().build();
    }
      return ResponseEntity.ok().body(sesiones);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sesion> getSesion(@PathVariable(value = "id") Long id){
      Sesion sesion = sesionService.getSesionById(id);
      if(sesion == null){
        return ResponseEntity.notFound().build();
      }
      return ResponseEntity.ok().body(sesion);
    }

    @PostMapping
    public ResponseEntity<Sesion> postSesion(@RequestBody Sesion sesion){
      //System.out.println("sesion controler: "+sesion);
      Sesion sesionGuardada = sesionService.saveSesion(sesion);
      return ResponseEntity.ok().body(sesionGuardada);
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteSesion(@RequestBody Sesion sesion){
      sesionService.deleteSesion(sesion);
      return ResponseEntity.ok().body("Sesion eliminada correctamente");
    }
}
