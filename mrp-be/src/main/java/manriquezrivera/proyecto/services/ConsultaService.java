package manriquezrivera.proyecto.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.sound.midi.SysexMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manriquezrivera.proyecto.models.ConsultaCliente;
import manriquezrivera.proyecto.models.ConsultaMateria;
import manriquezrivera.proyecto.models.ConsultaSesiones;
import manriquezrivera.proyecto.models.InfoTabla;
import manriquezrivera.proyecto.models.InfoTablaCliente;
import manriquezrivera.proyecto.models.InfoTablaMateria;
import manriquezrivera.proyecto.repositories.ConsultaClienteRepository;
import manriquezrivera.proyecto.repositories.ConsultaMateriaRepository;
import manriquezrivera.proyecto.repositories.ConsultaSesionesRepository;
import manriquezrivera.proyecto.repositories.ConsultaSesionesTablaRepository;
import manriquezrivera.proyecto.models.ConsultaSesionesTabla;
//import manriquezrivera.proyecto.util.Util;
@Service
public class ConsultaService {
	@Autowired
	ConsultaClienteRepository consultaClienteRepository;
	@Autowired
	ConsultaMateriaRepository consultaMateriaRepository;

	@Autowired
	ConsultaSesionesRepository consultaSesionesRepository;

	@Autowired 
	ConsultaSesionesTablaRepository consultaSesionesTablaRepository;

	// public Util util;
	// ---------------------------------------------- VISTA GENERAL
	// ----------------------------------------------
	// gráfico de la vista general
	public List<ConsultaMateria> getCM(String fechaInicio, String fechaFin, Integer cantidadDias, Integer dropSiempre,
			Long idAbogado) {

		List<ConsultaSesiones> allConsultas;

		// ABOGADO EN ESPECIFICO
		if (idAbogado != -1) {
			// si se selecciona desde siempre se setea la fecha de inicio con la primera
			// sesión del abogado
			if (dropSiempre == 1) {
				allConsultas = consultaSesionesRepository.getConsultaSesionesDesdeSiempreByIdAbogado(idAbogado);
				fechaInicio = allConsultas.get(0).getFecha().toString();
			}
			return consultaMateriaRepository.getConsultaSesionesMateriasByIdAbogado(fechaInicio, fechaFin, idAbogado);
		}

		// TODOS LOS ABOGADOS
		else {
			if (dropSiempre == 1) {
				allConsultas = consultaSesionesRepository.getConsultaSesiones();
				fechaInicio = allConsultas.get(0).getFecha().toString();
			}
			return consultaMateriaRepository.getConsultaSesionesMaterias(fechaInicio, fechaFin);
		}

	}

	public List<ConsultaCliente> getCC(Long id, String fechaInicio, String fechaFin) {
		return consultaClienteRepository.getConsultaClientes(id, fechaInicio, fechaFin);
	}

	// OBTIENEN SESIONES DE ABOGADOS CON INTERVALOS DE TIEMPO DE DIAS (NO INCLUYE
	// DESDE SIEMPRE)
	public List<ConsultaSesiones> getCS(String fechaInicio, String fechaFin, Integer cantidadDias,
			Long idAbogado) {
		List<ConsultaSesiones> consultaSesiones;
		// Se obtienen las sesiones con las fechas inicio y fin establecidas

		// ABOGADO EN ESPECIFICO
		if (idAbogado != -1) {
			consultaSesiones = consultaSesionesRepository.getConsultaSesionesByIdAbogado(fechaInicio,
					fechaFin, idAbogado);
		}
		// TODOS LOS ABOGADOS
		else {
			consultaSesiones = consultaSesionesRepository.getConsultaSesiones(fechaInicio,
					fechaFin);
		}
		// se obtiene la lista con las fechas vacias rellenadas de ceros (PARA EL
		// GRAFICO)
		List<ConsultaSesiones> consultaSesionesActualizado = rellenadorDeCeros(consultaSesiones, fechaFin,
				cantidadDias);

		return consultaSesionesActualizado;
	}

	// OBTIENEN SESIONES DE ABOGADOS DESDE SIEMPRE (NO INCLUYE POR DIAS)
	public List<ConsultaSesiones> getCSdesdeSiempre(Long idAbogado) {
		List<ConsultaSesiones> consultaSesiones;
		Integer cantidadDias;
		// Obtenemos una fecha actual
		// ABOGADO EN ESPECIFICO
		if (idAbogado != -1) {
			consultaSesiones = consultaSesionesRepository.getConsultaSesionesDesdeSiempreByIdAbogado(idAbogado);
			// return consultaSesiones; // descomentar para mostrar sin rellenado de ceros
		}
		// TODOS LOS ABOGADOS
		else {
			consultaSesiones = consultaSesionesRepository.getConsultaSesiones();
		}

		cantidadDias = calcularDias(idAbogado);
		String fechaFin = fechaActualString();

		// se obtiene la lista con las fechas vacias rellenadas de ceros (PARA EL
		// GRAFICO)
		List<ConsultaSesiones> consultaSesionesActualizado = rellenadorDeCeros(consultaSesiones, fechaFin,
				cantidadDias);

		return consultaSesionesActualizado;
	}

	// ---------------------------------------------- ------------
	// ----------------------------------------------
	// ---------------------------------------------- VISTA MATERIA
	// ----------------------------------------------
	public List<ConsultaSesiones> getCSMateria(Long idMateria, String fechaInicio, String fechaFin,
			Integer cantidadDias,
			Long idAbogado) {
		List<ConsultaSesiones> consultaSesiones;
		// Se obtienen las sesiones con las fechas inicio y fin establecidas

		// ABOGADO EN ESPECIFICO
		if (idAbogado != -1) {
			consultaSesiones = consultaSesionesRepository.getConsultaSesionesByIdMateriaConAbogadoFecha(idMateria,
					idAbogado, fechaInicio,
					fechaFin);
		}
		// TODOS LOS ABOGADOS
		else {
			consultaSesiones = consultaSesionesRepository.getConsultaSesionesByIdMateriaFecha(idMateria, fechaInicio,
					fechaFin);
		}
		// se obtiene la lista con las fechas vacias rellenadas de ceros (PARA EL
		// GRAFICO)
		List<ConsultaSesiones> consultaSesionesActualizado = rellenadorDeCeros(consultaSesiones, fechaFin,
				cantidadDias);

		return consultaSesionesActualizado;
	}

	public List<ConsultaSesiones> getCSMateriaDesdeSiempre(Long idMateria,
			Long idAbogado) {
		List<ConsultaSesiones> consultaSesiones;
		Integer cantidadDias;
		// Se obtienen las sesiones con las fechas inicio y fin establecidas

		// ABOGADO EN ESPECIFICO
		if (idAbogado != -1) {
			consultaSesiones = consultaSesionesRepository.getConsultaSesionesByIdMateriaConAbogado(idMateria,
					idAbogado);
			System.out.println("XD" + consultaSesiones);
		}
		// TODOS LOS ABOGADOS
		else {
			consultaSesiones = consultaSesionesRepository.getConsultaSesionesByIdMateria(idMateria);
		}
		// se obtiene la lista con las fechas vacias rellenadas de ceros (PARA EL
		// GRAFICO)
		cantidadDias = calcularDias(idAbogado);
		String fechaFin = fechaActualString();
		List<ConsultaSesiones> consultaSesionesActualizado = rellenadorDeCeros(consultaSesiones, fechaFin,
				cantidadDias);

		return consultaSesionesActualizado;
	}

	// -------------------------------------------------------------------------------------------------------
	// cantidad de sesiones
	public int getCCS(String fechaInicio, String fechaFin) {
		return consultaSesionesRepository.getConsultaCantidadSesiones(fechaInicio, fechaFin);
	}

	// tiempo total de sesiones
	public int getCCT(String fechaInicio, String fechaFin) {
		return consultaSesionesRepository.getConsultaCantidadTiempo(fechaInicio, fechaFin);
	}

	public int getCantidadClientes(String fechaInicio, String fechaFin) {
		return consultaClienteRepository.getConsultaCantidadClientes(fechaInicio, fechaFin);
	}

	// -------------------------------------------------------------------------------------------------------
	// GRÁGICO VISTA CLIENTE - NO INCLUYE DESDE SIEMPRE
	public List<ConsultaSesiones> getConsultasByCaso(Long idCaso, String fechaInicio, String fechaFin, Long idAbo,
			Integer cantidadDias) {

		List<ConsultaSesiones> consultaSesiones;
		if (idAbo != -1) {
			consultaSesiones = consultaSesionesRepository.getConsultaSesionesByIdCasoConAbogado(idCaso, fechaInicio,
					fechaFin, idAbo);
		} else {
			consultaSesiones = consultaSesionesRepository.getConsultaSesionesByIdCaso(idCaso, fechaInicio, fechaFin);
		}

		List<ConsultaSesiones> consultaSesionesActualizado = rellenadorDeCeros(consultaSesiones, fechaFin,
				cantidadDias);

		return consultaSesionesActualizado;
	}

	// GRÁGICO VISTA CLIENTE - INCLUYE DESDE SIEMPRE
	public List<ConsultaSesiones> getConsultasByCasoDesdeSiempre(Long idCaso, Long idAbo) {
		List<ConsultaSesiones> consultaSesiones;
		Integer cantidadDias;

		if (idAbo != -1) {
			consultaSesiones = consultaSesionesRepository.getConsultaSesionesByIdCasoConAbogado2(idCaso, idAbo);
		} else {
			consultaSesiones = consultaSesionesRepository.getConsultaSesionesByIdCaso2(idCaso);
		}

		cantidadDias = calcularDias(idAbo);
		String fechaFin = fechaActualString();

		List<ConsultaSesiones> consultaSesionesActualizado = rellenadorDeCeros(consultaSesiones, fechaFin,
				cantidadDias);

		return consultaSesionesActualizado;
	}

	// TABLA VISTA CLIENTE - NO INCLUYE DESDE SIEMPRE
	public List<ConsultaSesionesTabla> getConsultasByCasoTabla(Long idCaso, String fechaInicio, String fechaFin, Long idAbo,
			Integer cantidadDias) {

		List<ConsultaSesionesTabla> consultaSesionesTabla;
			
		if (idAbo != -1) {
			return consultaSesionesTablaRepository.getConsultaSesionesByIdAbogadoTabla(idAbo, idCaso, fechaInicio, fechaFin);
		} else {
			consultaSesionesTabla  = consultaSesionesTablaRepository.getConsultaSesionesTabla(idCaso, fechaInicio, fechaFin);
			return consultaSesionesTabla;
		}
	}

	// TABLA VISTA CLIENTE - INCLUYE DESDE SIEMPRE
	public List<ConsultaSesionesTabla> getConsultasByCasoTablaDesdeSiempre(Long idCaso, Long idAbo){

		if (idAbo != -1) {
			return consultaSesionesTablaRepository.getConsultaSesionesByIdAbogadoTablaDesdeSiempre(idAbo, idCaso);
		} else {
			return consultaSesionesTablaRepository.getConsultaSesionesTablaDesdeSiempre(idCaso);
		}
	}

		// TABLA VISTA MATERIA - NO INCLUYE DESDE SIEMPRE
	public List<ConsultaSesionesTabla> getConsultasByMateriaTablaMateria(Long idMateria, String fechaInicio, String fechaFin, Long idAbo,
			Integer cantidadDias) {
				System.out.println("XD");
		List<ConsultaSesionesTabla> consultaSesionesTabla;
			
		if (idAbo != -1) {
		 consultaSesionesTabla=	 consultaSesionesTablaRepository.getConsultaSesionesByIdMateriaConAbogadoFecha( idMateria, idAbo, fechaInicio, fechaFin);
		System.out.println(idAbo + " " + idMateria + " " + fechaInicio + " " + fechaFin);
		 System.out.println(consultaSesionesTabla);	 
		 return consultaSesionesTabla;

		} else {
			consultaSesionesTabla  = consultaSesionesTablaRepository.getConsultaSesionesByIdMateriaFecha(idMateria, fechaInicio, fechaFin);
			return consultaSesionesTabla;
		}
	}

	// TABLA VISTA MATERIA - INCLUYE DESDE SIEMPRE
	public List<ConsultaSesionesTabla> getConsultasByMateriaTablaDesdeSiempreMateria(Long idMateria, Long idAbo){
		System.out.println("LOL");
		if (idAbo != -1) {
			return consultaSesionesTablaRepository.getConsultaSesionesByIdMateriaConAbogado( idMateria, idAbo);
		} else {
			return consultaSesionesTablaRepository.getConsultaSesionesByIdMateria(idMateria);
		}
	}

	public InfoTabla getInfoTabla(String fechaInicio, String fechaFin, Integer dropSiempre, Long idAbogado) {
		if (dropSiempre == 1) {
			List<ConsultaSesiones> allConsultas = consultaSesionesRepository.getConsultaSesiones();
			fechaInicio = allConsultas.get(0).getFecha().toString();
		}

		// SIN ABOGADO
		if (idAbogado == -1) {
			Integer cantidad_sesiones = consultaSesionesRepository.getConsultaCantidadSesiones(fechaInicio, fechaFin);
			Integer cantidad_tiempo = consultaSesionesRepository.getConsultaCantidadTiempo(fechaInicio, fechaFin);

			Integer cantidad_clientes = consultaClienteRepository.getConsultaCantidadClientes(fechaInicio, fechaFin);

			List<ConsultaMateria> nombre_tiempo_cliente_max = consultaMateriaRepository
					.getConsultaNombreTiempoClienteMax(fechaInicio, fechaFin);
			String nombre_cliente_max;
			Integer tiempo_cliente_max;
			if (nombre_tiempo_cliente_max.size() == 0) {
				nombre_cliente_max = "No hay clientes";
				tiempo_cliente_max = 0;
			} else {
				nombre_cliente_max = nombre_tiempo_cliente_max.get(0).getNombre();
				tiempo_cliente_max = nombre_tiempo_cliente_max.get(0).getTiempo().intValue();
			}

			Integer cantidad_materias = consultaMateriaRepository.getConsultaCantidadMaterias(fechaInicio, fechaFin);

			List<ConsultaMateria> nombre_tiempo_materia_max = consultaMateriaRepository
					.getConsultaNombreTiempoMateriaMax(fechaInicio, fechaFin);
			String nombre_materia_max;
			Integer tiempo_materia_max;
			if (nombre_tiempo_materia_max.size() == 0) {
				nombre_materia_max = "No hay materias";
				tiempo_materia_max = 0;
			} else {
				nombre_materia_max = nombre_tiempo_materia_max.get(0).getNombre();
				tiempo_materia_max = nombre_tiempo_materia_max.get(0).getTiempo().intValue();
			}

			Integer cantidad_submateria = consultaMateriaRepository.getConsultaCantidadSubmaterias(fechaInicio,
					fechaFin);

			List<ConsultaMateria> nombre_tiempo_submateria_max = consultaMateriaRepository
					.getConsultaNombreTiempoSubmateriaMax(fechaInicio, fechaFin);
			String nombre_submateria_max;
			Integer tiempo_submateria_max;
			if (nombre_tiempo_submateria_max.size() == 0) {
				nombre_submateria_max = "No hay submaterias";
				tiempo_submateria_max = 0;
			} else {
				nombre_submateria_max = nombre_tiempo_submateria_max.get(0).getNombre();
				tiempo_submateria_max = nombre_tiempo_submateria_max.get(0).getTiempo().intValue();
			}

			return new InfoTabla(cantidad_sesiones, cantidad_tiempo,
					cantidad_clientes, nombre_cliente_max, tiempo_cliente_max,
					cantidad_materias, nombre_materia_max, tiempo_materia_max,
					cantidad_submateria, nombre_submateria_max, tiempo_submateria_max);
		} else {
			Integer cantidad_sesiones = consultaSesionesRepository.getConsultaCantidadSesionesByIdAbogado(fechaInicio,
					fechaFin, idAbogado);
			Integer cantidad_tiempo = consultaSesionesRepository.getConsultaCantidadTiempoByIdAbogado(fechaInicio,
					fechaFin, idAbogado);

			Integer cantidad_clientes = consultaClienteRepository.getConsultaCantidadClientesByIdAbogado(fechaInicio,
					fechaFin, idAbogado);

			List<ConsultaMateria> nombre_tiempo_cliente_max = consultaMateriaRepository
					.getConsultaNombreTiempoClienteMaxByIdAbogado(fechaInicio, fechaFin, idAbogado);
			String nombre_cliente_max;
			Integer tiempo_cliente_max;
			if (nombre_tiempo_cliente_max.size() == 0) {
				nombre_cliente_max = "No hay clientes";
				tiempo_cliente_max = 0;
			} else {
				nombre_cliente_max = nombre_tiempo_cliente_max.get(0).getNombre();
				tiempo_cliente_max = nombre_tiempo_cliente_max.get(0).getTiempo().intValue();
			}

			Integer cantidad_materias = consultaMateriaRepository.getConsultaCantidadMateriasByIdAbogado(fechaInicio,
					fechaFin, idAbogado);

			List<ConsultaMateria> nombre_tiempo_materia_max = consultaMateriaRepository
					.getConsultaNombreTiempoMateriaMaxByIdAbogado(fechaInicio, fechaFin, idAbogado);
			String nombre_materia_max;
			Integer tiempo_materia_max;
			if (nombre_tiempo_materia_max.size() == 0) {
				nombre_materia_max = "No hay materias";
				tiempo_materia_max = 0;
			} else {
				nombre_materia_max = nombre_tiempo_cliente_max.get(0).getNombre();
				tiempo_materia_max = nombre_tiempo_cliente_max.get(0).getTiempo().intValue();
			}

			Integer cantidad_submateria = consultaMateriaRepository
					.getConsultaCantidadSubmateriasByIdAbogado(fechaInicio, fechaFin, idAbogado);

			List<ConsultaMateria> nombre_tiempo_submateria_max = consultaMateriaRepository
					.getConsultaNombreTiempoSubmateriaMaxByIdAbogado(fechaInicio, fechaFin, idAbogado);
			String nombre_submateria_max;
			Integer tiempo_submateria_max;
			if (nombre_tiempo_submateria_max.size() == 0) {
				nombre_submateria_max = "No hay submaterias";
				tiempo_submateria_max = 0;
			} else {
				nombre_submateria_max = nombre_tiempo_submateria_max.get(0).getNombre();
				tiempo_submateria_max = nombre_tiempo_submateria_max.get(0).getTiempo().intValue();
			}

			return new InfoTabla(cantidad_sesiones, cantidad_tiempo,
					cantidad_clientes, nombre_cliente_max, tiempo_cliente_max,
					cantidad_materias, nombre_materia_max, tiempo_materia_max,
					cantidad_submateria, nombre_submateria_max, tiempo_submateria_max);
		}

	}

	/*
	 * PARA LA VISTA CONSULTA-MATERIA
	 */

	public InfoTablaMateria getInfoTablaMateria(Long id_abogado, Long id_materia, String fi, String ff,
			Integer dropSiempre) {
		List<ConsultaMateria> sesiones;
		List<Integer> clientes;
		Integer tiempo_total;
		if (dropSiempre == 1) {
			if (id_abogado != -1) {

				sesiones = consultaMateriaRepository.getSesionesByMateriaAndAbogadoDesdeSiempre(
						id_abogado,
						id_materia);
				clientes = consultaMateriaRepository.getCantidadUsuariosByMateriaAndAbogadoDesdeSiempre(
						id_abogado,
						id_materia);
				tiempo_total = consultaMateriaRepository.getTiempoSesionesByMateriaAndAbogadoDesdeSiempre(
						id_abogado,
						id_materia);
			} else {
				sesiones = consultaMateriaRepository.getSesionesByMateriaDesdeSiempre(
						id_materia);
				clientes = consultaMateriaRepository.getCantidadUsuariosByMateriaDesdeSiempre(
						id_materia);
				tiempo_total = consultaMateriaRepository.getTiempoSesionesByMateriaDesdeSiempre(
						id_materia);
			}
		} else {
			if (id_abogado != -1) {
				sesiones = consultaMateriaRepository.getSesionesByMateriaAndAbogadoAndTiempo(
						id_abogado,
						id_materia, fi, ff);
				clientes = consultaMateriaRepository.getCantidadUsuariosByMateriaAndAbogadoAndTiempo(
						id_abogado,
						id_materia, fi, ff);
				tiempo_total = consultaMateriaRepository.getTiempoSesionesByMateriaAndAbogadoAndTiempo(
						id_abogado,
						id_materia,
						fi, ff);
			} else {
				sesiones = consultaMateriaRepository.getSesionesByMateriaAndTiempo(
						id_materia, fi, ff);
				clientes = consultaMateriaRepository.getCantidadUsuariosByMateriaAndTiempo(
						id_materia, fi, ff);
				tiempo_total = consultaMateriaRepository.getTiempoSesionesByMateriaAndTiempo(
						id_materia,
						fi, ff);
			}
		}
		Integer cantidad_sesiones = sesiones.size();
		Integer cantidad_clientes = clientes.size();
		return new InfoTablaMateria(cantidad_sesiones, tiempo_total, cantidad_clientes);

	}

	/*
	 * PARA LA VISTA CONSULTA-CLIENTE
	 */

	public InfoTablaCliente getInfoTablaCliente(Long id_caso, String fi, String ff, Long id_abo, Integer flag) {
		Integer cantidadSesiones = 0;
		Integer tiempoSesiones = 0;

		if (flag == 1) {
			List<ConsultaSesiones> consultasAux = new ArrayList<ConsultaSesiones>();
			if (id_abo == -1) {
				consultasAux = consultaSesionesRepository.getConsultaSesionesByIdCaso2(id_caso);
				if (consultasAux.size() == 0) {
					cantidadSesiones = 0;
					tiempoSesiones = 0;
				} else {
					fi = consultasAux.get(0).getFecha().toString();
					cantidadSesiones = consultaClienteRepository.getCantidadSesionesPorCliente(fi, ff, id_caso);
					tiempoSesiones = consultaClienteRepository.getTiempoSesionesPorCliente(fi, ff, id_caso);
				}
			} else {
				consultasAux = consultaSesionesRepository.getConsultaSesionesByIdCasoConAbogado2(id_caso, id_abo);
				if (consultasAux.size() == 0) {
					cantidadSesiones = 0;
					tiempoSesiones = 0;
				} else {
					fi = consultasAux.get(0).getFecha().toString();
					cantidadSesiones = consultaClienteRepository.getCantidadSesionesPorClienteConAbogado(id_abo, fi, ff,
							id_caso);
					tiempoSesiones = consultaClienteRepository.getTiempoSesionesPorClienteConAbogado(id_abo, fi, ff,
							id_caso);
				}
			}
		} else {
			if (id_abo == -1) {
				cantidadSesiones = consultaClienteRepository.getCantidadSesionesPorCliente(fi, ff, id_caso);
				tiempoSesiones = consultaClienteRepository.getTiempoSesionesPorCliente(fi, ff, id_caso);
			} else {
				cantidadSesiones = consultaClienteRepository.getCantidadSesionesPorClienteConAbogado(id_abo, fi, ff,
						id_caso);
				tiempoSesiones = consultaClienteRepository.getTiempoSesionesPorClienteConAbogado(id_abo, fi, ff,
						id_caso);
				if (tiempoSesiones == null) {
					tiempoSesiones = 0;
				}
			}
		}

		return new InfoTablaCliente(cantidadSesiones, tiempoSesiones);
	}

	// FUNCIONES DE UTILIDAD -----------------------------------------------
	public List<ConsultaSesiones> rellenadorDeCeros(List<ConsultaSesiones> consultaSesiones, String fechaFin,
			Integer cantidadDias) {
		// Se crea una lista de sesiones vacía. Esta lista será la que se devuelva al
		// final
		List<ConsultaSesiones> consultaSesiones2 = new ArrayList<ConsultaSesiones>();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		// Se crea un arreglo que contenga las fechas que existen entre fechaInicio y
		// fechaFin
		List<String> fechas = new ArrayList<String>();
		fechas.add(fechaFin);

		// Se obtienen las fechas entre fechaInicio y fechaFin
		int i = 0;
		while (i < cantidadDias) {
			Calendar instance = Calendar.getInstance();
			Date date = new Date();
			try {
				date = sdf.parse(fechaFin);
			} catch (ParseException e) {
				e.printStackTrace();
			}
			instance.setTime(date);
			instance.add(Calendar.DATE, -i);
			String fechaString = sdf.format(instance.getTime());
			fechas.add(fechaString);
			i++;
		}
		// invertir orden de un arrgelo
		List<String> fechasInvertidas = new ArrayList<String>();
		for (int j = fechas.size() - 1; j >= 0; j--) {
			fechasInvertidas.add(fechas.get(j));
		}

		// Se pone de tiempo 0 en las fechas que no se encontraron seriones
		i = 0;
		int j = 0;
		while (i < cantidadDias) {
			if (consultaSesiones.size() == 0) {
				int k = 0;
				while (k < cantidadDias) {
					ConsultaSesiones consultaNueva = new ConsultaSesiones();
					consultaNueva.setFecha(java.sql.Date.valueOf(fechasInvertidas.get(k)));
					consultaNueva.setTiempo(0L);
					consultaSesiones2.add(consultaNueva);
					k++;
				}
				break;
			} else if (j < consultaSesiones.size()) {
				if (fechasInvertidas.get(i).equals(consultaSesiones.get(j).getFecha().toString())) {
					consultaSesiones2.add(consultaSesiones.get(j));
					i++;
					j++;
				} else {
					j++;
				}
			} else {
				ConsultaSesiones consultaNueva = new ConsultaSesiones();
				consultaNueva.setFecha(java.sql.Date.valueOf(fechasInvertidas.get(i)));
				consultaNueva.setTiempo(0L);
				consultaSesiones2.add(consultaNueva);
				i++;
				j = 0;
			}
		}
		return consultaSesiones2;
	}

	// Funcion que calcula dias (se utiliza en el desde siempre)
	Integer calcularDias(Long idAbogado) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		List<ConsultaSesiones> allConsultas;

		allConsultas = consultaSesionesRepository.getConsultaSesiones();

		if (allConsultas.isEmpty()) {
			// No hay consultas, por lo que no podemos calcular días.
			return null;
		}

		String fechaInicio = sdf.format(allConsultas.get(0).getFecha());
		Date fechaFinAux = new Date();
		String fechaFin = sdf.format(fechaFinAux);
		Date fechaInicioAux;

		try {
			fechaInicioAux = sdf.parse(fechaInicio);
			Date fechaFinAuxAux = sdf.parse(fechaFin);
			Calendar instance1 = Calendar.getInstance();
			Calendar instance2 = Calendar.getInstance();
			instance2.setTime(fechaFinAuxAux);
			instance1.setTime(fechaInicioAux);

			int dias = 0;

			while (!instance1.after(instance2)) {
				instance1.add(Calendar.DAY_OF_YEAR, 1);
				dias++;
			}

			return dias;
		} catch (ParseException e) {
			e.printStackTrace();
		}

		return null;
	}

	// funcion que retorna una fecha actual en formato STRING
	String fechaActualString() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date fechaFinAux = new Date();
		String fechaFin = sdf.format(fechaFinAux);
		return fechaFin;

	}
}
