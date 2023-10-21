package manriquezrivera.proyecto.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manriquezrivera.proyecto.entity.Abogado;
import manriquezrivera.proyecto.repositories.AbogadoRepository;

@Service
public class AbogadoService {
  @Autowired
  AbogadoRepository abogadoRepository;

  public List<Abogado> getAbogados() {
    return abogadoRepository.findAll();
  }
}
