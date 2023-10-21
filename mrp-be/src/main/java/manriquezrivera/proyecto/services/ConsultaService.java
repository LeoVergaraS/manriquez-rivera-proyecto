package manriquezrivera.proyecto.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
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

  public List<ConsultaMateria> getCM(String fechaInicio, String fechaFin, Integer dropSelect, Integer dropSiempre) {
    if (dropSiempre == 1) {
      List<ConsultaSesiones> allConsultas = consultaSesionesRepository.getConsultaSesiones();
      fechaInicio = allConsultas.get(0).getFecha().toString();
    }
    return consultaMateriaRepository.getConsultaMateria(fechaInicio, fechaFin);
  }

  public List<ConsultaCliente> getCC(Long id, String fechaInicio, String fechaFin) {
    return consultaClienteRepository.getConsultaClientes(id, fechaInicio, fechaFin);
  }

  public List<ConsultaSesiones> getCS(String fechaInicio, String fechaFin, Integer dropSelect, Integer dropSiempre,
      Integer dropAnio) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

    // Si la opción ingresada es "Desde siempre", se obtiene la fecha de la primera
    // sesión creada
    if (dropSiempre == 1) {
      List<ConsultaSesiones> allConsultas = consultaSesionesRepository.getConsultaSesiones();
      fechaInicio = allConsultas.get(0).getFecha().toString();
      Date fechaFinAux = new Date();
      Date fechaInicioAux;
      try {
        fechaInicioAux = sdf.parse(fechaInicio);
        Calendar instance1 = Calendar.getInstance();
        Calendar instance2 = Calendar.getInstance();
        instance2.setTime(fechaFinAux);
        instance1.setTime(fechaInicioAux);
        Integer dias = instance2.get(Calendar.DAY_OF_YEAR) - instance1.get(Calendar.DAY_OF_YEAR);
        dropSelect = dias;
      } catch (ParseException e) {
        // TODO Auto-generated catch block
        e.printStackTrace();
      }
    }

    // Se obtienen las sesiones con las fechas inicio y fin establecidas
    List<ConsultaSesiones> consultaSesiones = consultaSesionesRepository.getConsultaSesionesDias(fechaInicio, fechaFin);

    // Se crea una lista de sesiones vacía. Esta lista será la que se devuelva al final
    List<ConsultaSesiones> consultaSesiones2 = new ArrayList<ConsultaSesiones>();

    // Se crea un arreglo que contenga las fechas que existen entre fechaInicio y
    // fechaFin
    List<String> fechas = new ArrayList<String>();
    fechas.add(fechaFin);

    // Si la opción ingresada es un año, se obtiene la cantidad de días que tiene ese año. Pueden ser 365 o 366
    if (dropAnio == 1) {
      dropSelect = getCantidadDiasDeUnAnio(2023) - 1;
    }

    // Se obtienen las fechas entre fechaInicio y fechaFin
    int i = 1;
    while (i <= dropSelect) {
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
    while (i < dropSelect) {
      if (consultaSesiones.size() == 0) {
        int k = 0;
        while (k < dropSelect) {
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

  public Integer getCantidadDiasDeUnAnio(Integer anio) {
    Calendar calendar = Calendar.getInstance();
    calendar.set(anio, 11, 31);
    Integer cantidadDias = calendar.get(Calendar.DAY_OF_YEAR);
    return cantidadDias;
  }

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

  /*
   * public String getPrueba(String fechaInicio, String fechaFin){
   * return consultaClienteRepository.getConsultaNombreClienteMax(fechaInicio,
   * fechaFin);
   * }
   */

  public InfoTabla getInfoTabla(String fechaInicio, String fechaFin, Integer dropSiempre) {
    if (dropSiempre == 1) {
      List<ConsultaSesiones> allConsultas = consultaSesionesRepository.getConsultaSesiones();
      fechaInicio = allConsultas.get(0).getFecha().toString();
    }
    Integer cantidad_sesiones = consultaSesionesRepository.getConsultaCantidadSesiones(fechaInicio, fechaFin);
    System.out.println(fechaInicio + " " + fechaFin);
    Integer cantidad_tiempo = consultaSesionesRepository.getConsultaCantidadTiempo(fechaInicio, fechaFin);

    Integer cantidad_clientes = consultaClienteRepository.getConsultaCantidadClientes(fechaInicio, fechaFin);

    List<ConsultaMateria> nombre_tiempo_cliente_max = consultaMateriaRepository.getConsultaNombreTiempoClienteMax(fechaInicio,
        fechaFin);
    String nombre_cliente_max;
    Integer tiempo_cliente_max;
    if(nombre_tiempo_cliente_max.size()==0){
      nombre_cliente_max = "No hay clientes";
      tiempo_cliente_max = 0;
    }else{
      nombre_cliente_max = nombre_tiempo_cliente_max.get(0).getNombre();
      tiempo_cliente_max = nombre_tiempo_cliente_max.get(0).getTiempo().intValue();
    }

    Integer cantidad_materias = consultaMateriaRepository.getConsultaCantidadMaterias(fechaInicio, fechaFin);

    List<ConsultaMateria> nombre_tiempo_materia_max = consultaMateriaRepository.getConsultaNombreTiempoMateriaMax(fechaInicio,
        fechaFin);
    String nombre_materia_max;
    Integer tiempo_materia_max;
    if(nombre_tiempo_materia_max.size()==0){
      nombre_materia_max = "No hay materias";
      tiempo_materia_max = 0;
    }else{
      nombre_materia_max = nombre_tiempo_materia_max.get(0).getNombre();
      tiempo_materia_max = nombre_tiempo_materia_max.get(0).getTiempo().intValue();
    }

    Integer cantidad_submateria = consultaMateriaRepository.getConsultaCantidadSubmaterias(fechaInicio, fechaFin);

    List<ConsultaMateria> nombre_tiempo_submateria_max = consultaMateriaRepository.getConsultaNombreTiempoSubmateriaMax(fechaInicio,
        fechaFin);
    String nombre_submateria_max;
    Integer tiempo_submateria_max;
    if(nombre_tiempo_submateria_max.size()==0){
      nombre_submateria_max = "No hay submaterias";
      tiempo_submateria_max = 0;
    }else{
      nombre_submateria_max = nombre_tiempo_submateria_max.get(0).getNombre();
      tiempo_submateria_max = nombre_tiempo_submateria_max.get(0).getTiempo().intValue();
    }

    return new InfoTabla(cantidad_sesiones, cantidad_tiempo,
        cantidad_clientes, nombre_cliente_max, tiempo_cliente_max,
        cantidad_materias, nombre_materia_max, tiempo_materia_max,
        cantidad_submateria, nombre_submateria_max, tiempo_submateria_max);
  }
}
