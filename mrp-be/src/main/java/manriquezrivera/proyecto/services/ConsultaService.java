package manriquezrivera.proyecto.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import manriquezrivera.proyecto.models.InfoTabla;
import manriquezrivera.proyecto.models.ConsultaCliente;
import manriquezrivera.proyecto.models.ConsultaMateria;
import manriquezrivera.proyecto.models.ConsultaSesiones;
import manriquezrivera.proyecto.repositories.ConsultaClienteRepository;
import manriquezrivera.proyecto.repositories.ConsultaMateriaRepository;
import manriquezrivera.proyecto.repositories.ConsultaSesionesRepository;


@Service
public class ConsultaService {
  @Autowired
  ConsultaClienteRepository consultaClienteRepository;

  @Autowired
  ConsultaMateriaRepository consultaMateriaRepository;

  @Autowired
  ConsultaSesionesRepository consultaSesionesRepository;

  public List<ConsultaMateria> getCM(String fechaInicio, String fechaFin){
    return consultaMateriaRepository.getConsultaMateria(fechaInicio, fechaFin);
  }

  public List<ConsultaCliente> getCC(Long id, String fechaInicio, String fechaFin){
    return consultaClienteRepository.getConsultaClientes(id, fechaInicio, fechaFin);
  }
  
  public List<ConsultaSesiones> getCS( String fechaInicio, String fechaFin){
    return consultaSesionesRepository.getConsultaSesionesDias(fechaInicio, fechaFin);
  }
  // cantidad de sesiones
  public int getCCS( String fechaInicio, String fechaFin){
    return consultaSesionesRepository.getConsultaCantidadSesiones(fechaInicio, fechaFin);
  }
  // tiempo total de sesiones
  public int getCCT(String fechaInicio, String fechaFin){
    return consultaSesionesRepository.getConsultaCantidadTiempo(fechaInicio, fechaFin);
  }
  
  public int getCantidadClientes(String fechaInicio, String fechaFin){
    return consultaClienteRepository.getConsultaCantidadClientes(fechaInicio, fechaFin);
  }

  /*public String getPrueba(String fechaInicio, String fechaFin){
    return consultaClienteRepository.getConsultaNombreClienteMax(fechaInicio, fechaFin);
  }*/

  public InfoTabla getInfoTabla(String fechaInicio, String fechaFin){
    Integer cantidad_sesiones = consultaSesionesRepository.getConsultaCantidadSesiones(fechaInicio, fechaFin);
    Integer cantidad_tiempo = consultaSesionesRepository.getConsultaCantidadTiempo(fechaInicio, fechaFin);
    Integer cantidad_clientes = consultaClienteRepository.getConsultaCantidadClientes(fechaInicio,fechaFin);

    String nombre_tiempo_cliente_max = consultaClienteRepository.getConsultaNombreTiempoClienteMax(fechaInicio,fechaFin);
    String nombre_cliente_max = nombre_tiempo_cliente_max.split(",")[0];
    int tiempo_cliente_max = Integer.parseInt(nombre_tiempo_cliente_max.split(",")[1]);

    Integer cantidad_materias = consultaMateriaRepository.getConsultaCantidadMaterias(fechaInicio,fechaFin);

    String nombre_tiempo_materia_max = consultaMateriaRepository.getConsultaNombreTiempoMateriaMax(fechaInicio,fechaFin);
    String nombre_materia_max = nombre_tiempo_materia_max.split(",")[0];
    Integer tiempo_materia_max = Integer.parseInt(nombre_tiempo_materia_max.split(",")[1]);
    
    Integer cantidad_submateria = consultaMateriaRepository.getConsultaCantidadSubmaterias(fechaInicio,fechaFin);

    String nombre_tiempo_submateria_max = consultaMateriaRepository.getConsultaNombreTiempoSubmateriaMax(fechaInicio, fechaFin);
    String nombre_submateria_max = nombre_tiempo_submateria_max.split(",")[0];
    Integer tiempo_submateria_max = Integer.parseInt(nombre_tiempo_submateria_max.split(",")[1]);
    return new InfoTabla(cantidad_sesiones, cantidad_tiempo,
    cantidad_clientes,nombre_cliente_max,tiempo_cliente_max,
    cantidad_materias,nombre_materia_max,tiempo_materia_max,
    cantidad_submateria,nombre_submateria_max, tiempo_submateria_max);
  }
}
