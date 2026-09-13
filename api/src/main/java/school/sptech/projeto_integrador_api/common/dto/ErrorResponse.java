package school.sptech.projeto_integrador_api.common.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import school.sptech.projeto_integrador_api.common.model.ErrorCode;

import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
public record ErrorResponse(
        ErrorCode errorCode,
        String mensagem,
        Map<String, String> erros
) {
    public ErrorResponse(ErrorCode errorCode, String mensagem) {
        this(errorCode, mensagem, null);
    }
}
