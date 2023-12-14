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
import manriquezrivera.proyecto.models.ConsultaSesionesTabla;
import manriquezrivera.proyecto.models.ConsultaMateria;
import manriquezrivera.proyecto.services.ConsultaService;

@RestController
@CrossOrigin
@RequestMapping("/api/consultas")
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
		List<ConsultaMateria> consultasMaterias = consultaService.getCM(fechaInicio, fechaFin, dropSelect, dropSiempre,
				idAbogado);
		if (consultasMaterias == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(consultasMaterias);
	}

	// funcion que obtiene las sesiones con respecto a los filtros
	// VISTA GENERAL(Fechas en especifico)
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
	// VISTA GENERAL (DESDE SIEMPRE)
	@GetMapping("/sesiones/{idAbogado}")
	public ResponseEntity<List<ConsultaSesiones>> getConsultasSesionesDesdeSiempre(
			@PathVariable("idAbogado") Long idAbogado) {
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
			@PathVariable("ff") String fechaFin, @PathVariable("dropSiempre") Integer dropSiempre,
			@PathVariable("idAbogado") Long idAbogado) {
		InfoTabla consultaInfotabla = consultaService.getInfoTabla(fechaInicio, fechaFin, dropSiempre, idAbogado);
		if (consultaInfotabla == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(consultaInfotabla);
	}

	@GetMapping("/sesiones/id_caso/{id}/{fi}/{ff}/{id_abo}/{dropSelect}")
	public ResponseEntity<List<ConsultaSesiones>> getByidCasoEntity(@PathVariable("id") Long id,
			@PathVariable("fi") String fechaInicio, @PathVariable("ff") String fechaFin,
			@PathVariable("id_abo") Long id_abo,
			@PathVariable("dropSelect") Integer dropSelect) {
		List<ConsultaSesiones> consultas = consultaService.getConsultasByCaso(id, fechaInicio, fechaFin, id_abo,
				dropSelect);
		if (consultas == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(consultas);
	}

	@GetMapping("/sesiones/{id_caso}/{id_abo}")
	public ResponseEntity<List<ConsultaSesiones>> getByidCasoEntityDesdeSiempre(@PathVariable("id_caso") Long id_caso,
			@PathVariable("id_abo") Long id_abo) {
		List<ConsultaSesiones> consultas = consultaService.getConsultasByCasoDesdeSiempre(id_caso, id_abo);
		if (consultas == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(consultas);
	}

	@GetMapping("/sesiones/tabla/id_caso/{id}/{fi}/{ff}/{id_abo}/{dropSelect}")
	public ResponseEntity<List<ConsultaSesionesTabla>> getSesionseByIdCasoTabla(@PathVariable("id") Long id,
			@PathVariable("fi") String fechaInicio, @PathVariable("ff") String fechaFin,
			@PathVariable("id_abo") Long id_abo,
			@PathVariable("dropSelect") Integer dropSelect) {

		List<ConsultaSesionesTabla> consultas = consultaService.getConsultasByCasoTabla(id, fechaInicio, fechaFin, id_abo,
				dropSelect);
		if (consultas == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(consultas);
	}

	@GetMapping("/sesiones/tabla/id_caso/{id}/{id_abo}")
	public ResponseEntity<List<ConsultaSesionesTabla>> getSesionseByIdCasoTablaDesdeSiempre(
			@PathVariable("id") Long id,
			@PathVariable("id_abo") Long id_abo) {

		List<ConsultaSesionesTabla> consultas = consultaService.getConsultasByCasoTablaDesdeSiempre(id, id_abo);
		if (consultas == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(consultas);
	}

	// ----------------------------Vista Materia ---------------------------------
	@GetMapping("/materia/estadisticas/{abo}/{id}/{fi}/{ff}/{dropSiempre}")
	public ResponseEntity<InfoTablaMateria> getEstadisticasMateria(@PathVariable("abo") Long id_abogado,
			@PathVariable("id") Long id_materia, @PathVariable("fi") String fechaInicio,
			@PathVariable("ff") String fechaFin, @PathVariable("dropSiempre") Integer dropSiempre) {
		InfoTablaMateria consultaEstadisticasMateria = consultaService.getInfoTablaMateria(id_abogado, id_materia,
				fechaInicio, fechaFin, dropSiempre);
		return ResponseEntity.ok().body(consultaEstadisticasMateria);
	}
	// GRAFICO //
	@GetMapping("/materia/sesiones/{id_materia}/{fi}/{ff}/{dropSelect}/{id_abogado}")
	public ResponseEntity<List<ConsultaSesiones>> getSesionesMateriaPorFecha(
			@PathVariable("id_abogado") Long id_abogado,
			@PathVariable("id_materia") Long id_materia, @PathVariable("fi") String fechaInicio,
			@PathVariable("ff") String fechaFin, @PathVariable("dropSelect") Integer cantidadDias) {
		List<ConsultaSesiones> consultaSesionesMateria = consultaService.getCSMateria(id_materia, fechaInicio, fechaFin,
				cantidadDias, id_abogado);
		return ResponseEntity.ok().body(consultaSesionesMateria);
	}

	@GetMapping("/materia/sesiones/{id_materia}/{id_abogado}")
	public ResponseEntity<List<ConsultaSesiones>> getSesionesMateria(@PathVariable("id_abogado") Long id_abogado,
			@PathVariable("id_materia") Long id_materia) {
		List<ConsultaSesiones> consultaSesionesMateria = consultaService.getCSMateriaDesdeSiempre(id_materia,
				id_abogado);
		return ResponseEntity.ok().body(consultaSesionesMateria);
	}
	// TABLA //
		@GetMapping("/materia/tabla/{id_materia}/{fi}/{ff}/{dropSelect}/{id_abogado}")
	public ResponseEntity<List<ConsultaSesionesTabla>> getSesionesMateriaPorFechaTabla(
			@PathVariable("id_abogado") Long id_abogado,
			@PathVariable("id_materia") Long id_materia, @PathVariable("fi") String fechaInicio,
			@PathVariable("ff") String fechaFin, @PathVariable("dropSelect") Integer cantidadDias) {
		List<ConsultaSesionesTabla> consultaSesionesMateria = consultaService.getConsultasByMateriaTablaMateria(id_materia, fechaInicio, fechaFin,
				 id_abogado, cantidadDias);
		return ResponseEntity.ok().body(consultaSesionesMateria);
	}

	@GetMapping("/materia/tabla/{id_materia}/{id_abogado}")
	public ResponseEntity<List<ConsultaSesionesTabla>> getSesionesMateriaTabla(@PathVariable("id_abogado") Long id_abogado,
			@PathVariable("id_materia") Long id_materia) {
		List<ConsultaSesionesTabla> consultaSesionesMateria = consultaService.getConsultasByMateriaTablaDesdeSiempreMateria(id_materia,
				id_abogado);
		return ResponseEntity.ok().body(consultaSesionesMateria);
	}



	// ----------------------------------------------------------------------------
	// Para los 2 cards que salen en la vista Dashboard-Cliente
	@GetMapping("/cliente/estadisticas/{id}/{fi}/{ff}/{id_abo}/{flag}")
	public ResponseEntity<InfoTablaCliente> getEstadisticasCliente(@PathVariable("id") Long id_caso,
			@PathVariable("fi") String fechaInicio,
			@PathVariable("ff") String fechaFin, @PathVariable("id_abo") Long id_abo,
			@PathVariable("flag") Integer flag) {
		InfoTablaCliente consultaEstadisticasCliente = consultaService.getInfoTablaCliente(id_caso, fechaInicio,
				fechaFin,
				id_abo, flag);
		return ResponseEntity.ok().body(consultaEstadisticasCliente);
	}
}
