package manriquezrivera.proyecto.controllers;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.node.ObjectNode;

import manriquezrivera.proyecto.services.CasoAbogadoService;
import manriquezrivera.proyecto.services.CasoService;
import manriquezrivera.proyecto.services.ClienteService;
import manriquezrivera.proyecto.entity.Caso;
import manriquezrivera.proyecto.models.CasoDTO;

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

	@Autowired
	ClienteService clienteService;

	@Autowired
	CasoAbogadoService casoAbogadoService;

	@GetMapping
	public ResponseEntity<List<Caso>> getCasos() {
		List<Caso> casos = casoService.getAllCasos();
		if (casos == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(casos);
	}

	// get casos para el HOME
	@GetMapping("/abogado/{id}")
	public ResponseEntity<List<Caso>> getCasos(@PathVariable(value = "id") Integer id) {
		System.out.println("Hola");
		List<Caso> casos = casoService.getCasoByIdAbogado(id);
		if (casos == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(casos);
	}

	// get casos para vista cliente con intervalo de fecha
	@GetMapping("/abogado/{id}/{fechaInicio}/{fechaFin}")
	public ResponseEntity<List<Caso>> getCasos(@PathVariable(value = "id") Integer id,
			@PathVariable(value = "fechaInicio") String fechaInicio,
			@PathVariable(value = "fechaFin") String fechaFin) {
		List<Caso> casos = casoService.getCasoByFecha(id, fechaInicio, fechaFin);
		if (casos == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(casos);
	}

	// get casos para vista cliente desde siempre
	@GetMapping("/abogado/siempre/{id}/{fechaInicio}/{fechaFin}")
	public ResponseEntity<List<CasoDTO>> getCasosDesdeSiempreByIdAbogado(@PathVariable(value = "id") Integer id,
			@PathVariable(value = "fechaInicio") String fechaInicio,
			@PathVariable(value = "fechaFin") String fechaFin) {
		System.out.println("Desde siempre");
		List<Caso> casos = casoService.getCasoDesdeSiempre(id, fechaInicio, fechaFin);
		System.out.println("Salimos del service");
		System.out.println("Los casos son: " + casos);
		if (casos == null) {
			return ResponseEntity.notFound().build();
		}
		System.out.println("No son nulos ");

		casos.forEach(caso -> {
			Hibernate.initialize(caso.getId_materia());
			Hibernate.initialize(caso.getId_submateria());
			Hibernate.initialize(caso.getId_cliente());
		});

		// transferir el array casos a un array de CasoDTO
		List<CasoDTO> casosDTO = casoService.mapCasosToDTO(casos);

		return ResponseEntity.ok().body(casosDTO);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Caso> getCaso(@PathVariable(value = "id") Long id) {
		Caso caso = casoService.getCasoById(id);
		if (caso == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(caso);
	}

	@PostMapping
	public ResponseEntity<Caso> postCaso(@RequestBody ObjectNode request) {
		Caso casoGuardado = casoService.saveCaso(request);
		return ResponseEntity.ok().body(casoGuardado);
	}

	@PostMapping("/delete")
	public ResponseEntity<String> deleteCaso(@RequestBody Caso caso) {
		casoService.deleteCaso(caso);
		return ResponseEntity.ok().body("Caso eliminado correctamente");
	}
}
