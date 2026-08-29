package school.sptech.projeto_integrador_api.pontosTuristicos.service;

import org.springframework.stereotype.Service;
import school.sptech.projeto_integrador_api.pontosTuristicos.dto.PontoTuristicoRequest;
import school.sptech.projeto_integrador_api.pontosTuristicos.dto.PontoTuristicoResponse;
import school.sptech.projeto_integrador_api.pontosTuristicos.exception.PontoTuristicoJaExisteException;
import school.sptech.projeto_integrador_api.pontosTuristicos.exception.PontoTuristicoNaoEncontradoException;
import school.sptech.projeto_integrador_api.pontosTuristicos.exception.PontoTuristicoRequestInvalidoException;
import school.sptech.projeto_integrador_api.pontosTuristicos.repository.PontoTuristicoRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PontoTuristicoService {
    private final PontoTuristicoRepository pontoTuristicoRepository;

    public PontoTuristicoService(PontoTuristicoRepository pontoTuristicoRepository) {
        this.pontoTuristicoRepository = pontoTuristicoRepository;
    }

    public List<PontoTuristicoResponse> getAll() {
        return pontoTuristicoRepository.getAll();
    }

    public PontoTuristicoResponse getById(Long id) {
        return pontoTuristicoRepository.getById(id);
    }

    public PontoTuristicoResponse post(PontoTuristicoRequest request) {
        Map<String, String> mensagensErros = validarCamposRequest(request);
        if(!mensagensErros.isEmpty()) {
            throw new PontoTuristicoRequestInvalidoException(mensagensErros);
        }
        if(alreadyExists(request)) {
            throw new PontoTuristicoJaExisteException();
        }
        return pontoTuristicoRepository.post(request);
    }

    public PontoTuristicoResponse updateById(PontoTuristicoRequest request, Long id) {
        Map<String, String> mensagensErros = validarCamposRequest(request);
        if(!mensagensErros.isEmpty()) {
            throw new PontoTuristicoRequestInvalidoException(mensagensErros);
        }
        if(!existsById(id)) {
            throw new PontoTuristicoNaoEncontradoException(id);
        }
        if(alreadyExists(request)) {
            throw new PontoTuristicoJaExisteException();
        }
        return pontoTuristicoRepository.updateById(request, id);
    }

    public void deleteById(Long id) {
        if(!existsById(id)) {
            throw new PontoTuristicoNaoEncontradoException(id);
        }
        pontoTuristicoRepository.deleteById(id);
    }

    private Map<String, String> validarCamposRequest(PontoTuristicoRequest request) {
        Map<String, String> erros = new HashMap<>();
        if(request.nome() == null || request.nome().isBlank()) {
            erros.put("nome", "Preencha o nome corretamente");
        }
        if(request.endereco() == null || request.endereco().isBlank()) {
            erros.put("endereco", "Preencha o endereço corretamente");
        }
        if(request.estado() == null) {
            erros.put("estado", "Preencha o estado corretamente");
        }
        if(request.categoria() == null || request.categoria().isBlank()) {
            erros.put("categoria", "Preencha a categoria corretamente");
        }
        return erros;
    }

    private boolean alreadyExists(PontoTuristicoRequest request) {
        return pontoTuristicoRepository.alreadyExists(request);
    }

    private boolean existsById(Long id) {
        return pontoTuristicoRepository.existsById(id);
    }
}
