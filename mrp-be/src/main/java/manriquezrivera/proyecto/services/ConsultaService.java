package manriquezrivera.proyecto.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manriquezrivera.proyecto.models.ConsultaCliente;
import manriquezrivera.proyecto.models.ConsultaMateria;
import manriquezrivera.proyecto.repositories.ConsultaClienteRepository;
import manriquezrivera.proyecto.repositories.ConsultaMateriaRepository;

@Service
public class ConsultaService {
  @Autowired
  ConsultaClienteRepository consultaClienteRepository;

  @Autowired
  ConsultaMateriaRepository consultaMateriaRepository;

  public List<ConsultaMateria> getCM(String fechaInicio, String fechaFin){
    return consultaMateriaRepository.getConsultaMateria(fechaInicio, fechaFin);
  }

  public List<ConsultaCliente> getCC(Long id, String fechaInicio, String fechaFin){
    return consultaClienteRepository.getConsultaClientes(id, fechaInicio, fechaFin);
  }
}
