package school.sptech.projeto_integrador_api.pontosTuristicos.dto;

public record PontoTuristicoResponse(
        Long id,
        String nome,
        String descricao,
        String endereco,
        String estado,
        String categoria
) {
}
