package school.sptech.projeto_integrador_api.common.model;

import org.springframework.http.HttpStatus;

public enum ErrorCode {
    PONTO_TURISTICO_JA_EXISTE(HttpStatus.CONFLICT),
    PONTO_TURISTICO_NAO_ENCONTRADO(HttpStatus.NOT_FOUND),
    PONTO_TURISTICO_REQUEST_INVALIDO(HttpStatus.BAD_REQUEST);

    private final HttpStatus httpStatus;

    ErrorCode(HttpStatus httpStatus) {
        this.httpStatus = httpStatus;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
