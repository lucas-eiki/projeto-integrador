package school.sptech.projeto_integrador_api.estados.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import school.sptech.projeto_integrador_api.estados.model.Estado;
import school.sptech.projeto_integrador_api.estados.service.EstadoService;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/estados")
public class EstadoController {

    private final EstadoService estadoService;

    public EstadoController(EstadoService estadoService) {
        this.estadoService = estadoService;
    }

    @GetMapping
    public ResponseEntity<List<Estado>> getAll () {
        var resposta = estadoService.getAll();
        return ResponseEntity.status(HttpStatus.OK).body(resposta);
    }
}
