package school.sptech.projeto_integrador_api.pontosTuristicos.exception;

import school.sptech.projeto_integrador_api.common.exception.BusinessException;
import school.sptech.projeto_integrador_api.common.model.ErrorCode;

public class PontoTuristicoJaExisteException extends BusinessException {
    public PontoTuristicoJaExisteException() {
        super(
                ErrorCode.PONTO_TURISTICO_JA_EXISTE,
                "Esse ponto turístico já existe"
        );
    }
}
