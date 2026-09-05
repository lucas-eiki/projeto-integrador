package school.sptech.projeto_integrador_api.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import school.sptech.projeto_integrador_api.common.dto.ErrorResponse;
import school.sptech.projeto_integrador_api.common.model.ErrorCode;
import school.sptech.projeto_integrador_api.pontosTuristicos.exception.PontoTuristicoRequestInvalidoException;

import java.util.Map;

@RestControllerAdvice
public class GlobalHandlerException {
    private ResponseEntity<ErrorResponse> buildError(ErrorCode errorCode, HttpStatus status, String mensagem) {
        return ResponseEntity.status(status).body(new ErrorResponse(errorCode, mensagem));
    }

    private ResponseEntity<ErrorResponse> buildError(ErrorCode errorCode, HttpStatus status, String mensagem, Map<String, String> erros) {
        return ResponseEntity.status(status).body(new ErrorResponse(errorCode, mensagem, erros));
    }

    @ExceptionHandler(PontoTuristicoRequestInvalidoException.class)
    public ResponseEntity<ErrorResponse> handlePontoTuristicoRequestInvalido(PontoTuristicoRequestInvalidoException e) {
        return buildError(e.getErrorCode(), e.getErrorCode().getHttpStatus(), e.getMessage(), e.getErros());
    }

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusinessException(BusinessException e) {
        return buildError(e.getErrorCode(), e.getErrorCode().getHttpStatus(), e.getMessage());
    }
}
