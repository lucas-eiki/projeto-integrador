package school.sptech.projeto_integrador_api.pontosTuristicos.dto;

import school.sptech.projeto_integrador_api.pontosTuristicos.model.Estado;

public record PontoTuristicoRequest(
        String nome,
        String descricao,
        String endereco,
        Estado estado,
        String categoria
) {
}
