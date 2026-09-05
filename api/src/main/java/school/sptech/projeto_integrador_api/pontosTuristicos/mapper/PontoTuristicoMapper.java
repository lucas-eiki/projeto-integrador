package school.sptech.projeto_integrador_api.pontosTuristicos.mapper;

import org.springframework.stereotype.Component;
import school.sptech.projeto_integrador_api.pontosTuristicos.dto.PontoTuristicoResponse;
import school.sptech.projeto_integrador_api.pontosTuristicos.model.Estado;
import school.sptech.projeto_integrador_api.pontosTuristicos.model.PontoTuristico;

@Component
public class PontoTuristicoMapper {

    public PontoTuristicoResponse toResponse(PontoTuristico entity) {
        return new PontoTuristicoResponse(
                entity.getId(),
                entity.getNome(),
                entity.getDescricao(),
                entity.getEndereco(),
                Estado.fromNome(entity.getEstado()),
                entity.getCategoria()
        );
    }
}

