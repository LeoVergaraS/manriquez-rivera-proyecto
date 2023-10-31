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

  public Abogado saveAbogado(Abogado abogado) {
    return abogadoRepository.save(abogado);
  }

  public List<Abogado> getAbogadosByCaso(Long id_caso) {
    return abogadoRepository.getByCaso(id_caso);
  }
}
