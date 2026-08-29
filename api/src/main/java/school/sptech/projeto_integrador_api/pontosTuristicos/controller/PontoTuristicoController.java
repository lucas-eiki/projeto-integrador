package school.sptech.projeto_integrador_api.pontosTuristicos.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import school.sptech.projeto_integrador_api.pontosTuristicos.dto.PontoTuristicoRequest;
import school.sptech.projeto_integrador_api.pontosTuristicos.dto.PontoTuristicoResponse;
import school.sptech.projeto_integrador_api.pontosTuristicos.service.PontoTuristicoService;

import java.util.List;

@RestController
@RequestMapping("/pontos-turisticos")
public class PontoTuristicoController {
    private final PontoTuristicoService pontoTuristicoService;

    public PontoTuristicoController(PontoTuristicoService pontoTuristicoService) {
        this.pontoTuristicoService = pontoTuristicoService;
    }

    @GetMapping
    public ResponseEntity<List<PontoTuristicoResponse>> getAll(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String categoria,
            @RequestParam(required = false) String estado
    ) {
        var resposta = pontoTuristicoService.getAll(q, categoria, estado);
        if(resposta.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(resposta);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PontoTuristicoResponse> getById(@PathVariable Long id) {
        var resposta = pontoTuristicoService.getById(id);
        return ResponseEntity.status(HttpStatus.OK).body(resposta);
    }

    @PostMapping
    public ResponseEntity<PontoTuristicoResponse> post(@RequestBody PontoTuristicoRequest request) {
        var resposta = pontoTuristicoService.post(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(resposta);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PontoTuristicoResponse> updateById(@RequestBody PontoTuristicoRequest request, @PathVariable Long id) {
        var resposta = pontoTuristicoService.updateById(request, id);
        return ResponseEntity.status(HttpStatus.OK).body(resposta);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        pontoTuristicoService.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
