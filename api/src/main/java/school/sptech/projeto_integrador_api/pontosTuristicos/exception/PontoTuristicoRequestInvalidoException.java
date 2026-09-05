package school.sptech.projeto_integrador_api.pontosTuristicos.exception;

import school.sptech.projeto_integrador_api.common.exception.BusinessException;
import school.sptech.projeto_integrador_api.common.model.ErrorCode;

import java.util.Map;

public class PontoTuristicoRequestInvalidoException extends BusinessException {
    private final Map<String, String> erros;

    public PontoTuristicoRequestInvalidoException(Map<String, String> erros) {
        super(ErrorCode.PONTO_TURISTICO_REQUEST_INVALIDO);
        this.erros = erros;
    }

    public Map<String, String> getErros() {
        return erros;
    }
}
