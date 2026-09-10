package school.sptech.projeto_integrador_api.pontosTuristicos.dto;

public record PontoTuristicoRequest(
        String nome,
        String descricao,
        String endereco,
        Integer estadoId,
        String categoria
) {
}
