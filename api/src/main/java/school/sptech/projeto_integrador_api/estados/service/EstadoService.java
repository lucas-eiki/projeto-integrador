package school.sptech.projeto_integrador_api.estados.service;

import org.springframework.stereotype.Service;
import school.sptech.projeto_integrador_api.estados.model.Estado;
import school.sptech.projeto_integrador_api.estados.repository.EstadoRepository;

import java.util.List;

@Service
public class EstadoService {

    private final EstadoRepository estadoRepository;

    public EstadoService(EstadoRepository estadoRepository) {
        this.estadoRepository = estadoRepository;
    }

    public List<Estado> getAll() {
        return estadoRepository.getAll();
    }
}
