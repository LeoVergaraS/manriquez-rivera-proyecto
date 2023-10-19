package manriquezrivera.proyecto.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

  public int getCCS( String fechaInicio, String fechaFin){
    return consultaSesionesRepository.getConsultaCantidadSesiones(fechaInicio, fechaFin);
  }

  public int getCCT(String fechaInicio, String fechaFin){
    return consultaSesionesRepository.getConsultaCantidadTiempo(fechaInicio, fechaFin);
  }

  /*public int getCantidadClientes(String fechaInicio, String fechaFin){
    return consultaClienteRepository.getConsultaCantidadClientes(fechaInicio, fechaFin);
  } */
}
