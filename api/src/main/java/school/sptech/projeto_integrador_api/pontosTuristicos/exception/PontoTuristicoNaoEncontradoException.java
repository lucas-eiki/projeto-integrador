package school.sptech.projeto_integrador_api.pontosTuristicos.exception;

import school.sptech.projeto_integrador_api.common.exception.BusinessException;
import school.sptech.projeto_integrador_api.common.model.ErrorCode;

public class PontoTuristicoNaoEncontradoException extends BusinessException {
    public PontoTuristicoNaoEncontradoException(Long id) {
        super(
                ErrorCode.PONTO_TURISTICO_NAO_ENCONTRADO,
                "Ponto turístico de ID %d não encontrado".formatted(id)
        );
    }
}
