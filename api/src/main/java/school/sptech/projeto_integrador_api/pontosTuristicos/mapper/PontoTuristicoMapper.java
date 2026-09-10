package school.sptech.projeto_integrador_api.pontosTuristicos.mapper;

import org.springframework.stereotype.Component;
import school.sptech.projeto_integrador_api.estados.repository.EstadoRepository;
import school.sptech.projeto_integrador_api.pontosTuristicos.dto.PontoTuristicoResponse;
import school.sptech.projeto_integrador_api.pontosTuristicos.model.Estado;
import school.sptech.projeto_integrador_api.pontosTuristicos.model.PontoTuristico;

@Component
public class PontoTuristicoMapper {

    private final EstadoRepository estadoRepository;

    public PontoTuristicoMapper(EstadoRepository estadoRepository) {
        this.estadoRepository = estadoRepository;
    }

    public PontoTuristicoResponse toResponse(PontoTuristico entity) {
        String estado = estadoRepository.getNomeById(entity.getEstadoId());

        return new PontoTuristicoResponse(
                entity.getId(),
                entity.getNome(),
                entity.getDescricao(),
                entity.getEndereco(),
                estado,
                entity.getCategoria()
        );
    }
}

