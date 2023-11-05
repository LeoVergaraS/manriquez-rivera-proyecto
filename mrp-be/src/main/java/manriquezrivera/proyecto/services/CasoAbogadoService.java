package manriquezrivera.proyecto.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manriquezrivera.proyecto.entity.CasoAbogado;
import manriquezrivera.proyecto.repositories.CasoAbogadoRepository;

@Service
public class CasoAbogadoService {
  @Autowired
  CasoAbogadoRepository casoAbogadoRepository;

  public List<CasoAbogado> getAbogados() {
    return casoAbogadoRepository.findAll();
  }

  public CasoAbogado saveCasoAbogado(CasoAbogado casoAbogado) {
    return casoAbogadoRepository.save(casoAbogado);
  }
}
