package school.sptech.projeto_integrador_api.pontosTuristicos.repository;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import school.sptech.projeto_integrador_api.estados.repository.EstadoRepository;
import school.sptech.projeto_integrador_api.pontosTuristicos.dto.PontoTuristicoRequest;
import school.sptech.projeto_integrador_api.pontosTuristicos.dto.PontoTuristicoResponse;
import school.sptech.projeto_integrador_api.pontosTuristicos.exception.PontoTuristicoNaoEncontradoException;
import school.sptech.projeto_integrador_api.pontosTuristicos.mapper.PontoTuristicoMapper;
import school.sptech.projeto_integrador_api.pontosTuristicos.model.PontoTuristico;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class PontoTuristicoRepository {
    private final JdbcTemplate template;
    private final PontoTuristicoMapper mapper;
    private final EstadoRepository estadoRepository;

    public PontoTuristicoRepository(JdbcTemplate template, PontoTuristicoMapper mapper, EstadoRepository estadoRepository) {
        this.template = template;
        this.mapper = mapper;
        this.estadoRepository = estadoRepository;
    }

    public List<PontoTuristicoResponse> getAll(String query, String categoria, List<Integer> estadosId) {
        String sql = """
                SELECT * FROM ponto_turistico
                WHERE 1=1
                """;

        List<String> params = new ArrayList<>();

        if(query != null && !query.isBlank()) {
            sql += " AND (LOWER(nome) LIKE ? OR LOWER(descricao) LIKE ?)";
            params.add("%" + query.toLowerCase() + "%");
            params.add("%" + query.toLowerCase() + "%");
        }
        if(categoria != null) {
            sql += " AND categoria=?";
            params.add(categoria);
        }
        if(estadosId != null && !estadosId.isEmpty()) {
            sql += " AND estado IN ?";
            params.add("(" + estadosId.stream().map(String::valueOf).collect(Collectors.joining(", ")) + ")");
        }

        var lista = template.query(
                sql,
                new BeanPropertyRowMapper<>(PontoTuristico.class),
                params.toArray()
        );
        return lista.stream()
                .map(mapper::toResponse)
                .toList();
    }

    public PontoTuristicoResponse getById(Long id) {
        String sql = """
                SELECT * FROM ponto_turistico
                WHERE id=?
                """;

        try {
            var resposta = template.queryForObject(sql, new BeanPropertyRowMapper<>(PontoTuristico.class), id);
            return mapper.toResponse(resposta);
        } catch (DataAccessException e) {
            throw new PontoTuristicoNaoEncontradoException(id);
        }
    }

    public PontoTuristicoResponse post(PontoTuristicoRequest request) {
        String sql = """
                INSERT INTO ponto_turistico (nome, descricao, endereco, estadoId, categoria)
                VALUES (?, ?, ?, ?, ?)
                """;

        KeyHolder holder = new GeneratedKeyHolder();

        template.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(
                    sql,
                    Statement.RETURN_GENERATED_KEYS
            );

            statement.setString(1, request.nome());
            statement.setString(2, request.descricao());
            statement.setString(3, request.endereco());
            statement.setInt(4, request.estadoId());
            statement.setString(5, request.categoria());

            return statement;
        }, holder);

        String estadoNome = estadoRepository.getNomeById(request.estadoId());

        Long id = (long) holder.getKeyAs(Integer.class);

        return new PontoTuristicoResponse(
                id,
                request.nome(),
                request.descricao(),
                request.endereco(),
                estadoNome,
                request.categoria()
        );
    }

    public PontoTuristicoResponse updateById(PontoTuristicoRequest request, Long id) {
        String sql = """
                UPDATE ponto_turistico SET
                nome=?,
                descricao=?,
                endereco=?,
                estadoId=?,
                categoria=?
                WHERE id=?
                """;

        template.update(
                sql,
                request.nome(),
                request.descricao(),
                request.endereco(),
                request.estadoId(),
                request.categoria(),
                id
        );

        String estadoNome = estadoRepository.getNomeById(request.estadoId());

        return new PontoTuristicoResponse(
                id,
                request.nome(),
                request.descricao(),
                request.endereco(),
                estadoNome,
                request.categoria()
        );
    }

    public void deleteById(Long id) {
        String sql = """
                DELETE FROM ponto_turistico
                WHERE id=?
                """;

        template.update(sql, id);
    }

    public boolean alreadyExists(PontoTuristicoRequest request) {
        String sql = """
                SELECT COUNT(*)
                FROM ponto_turistico
                WHERE
                nome=? AND
                descricao=? AND
                endereco=? AND
                estadoId=?
                """;

        var resposta = template.queryForObject(
                sql,
                Long.class,
                request.nome(),
                request.descricao(),
                request.endereco(),
                request.estadoId()
        );

        return resposta != null && resposta > 0;
    }

    public boolean existsById(Long id) {
        String sql = """
                SELECT COUNT(*)
                FROM ponto_turistico
                WHERE id=?
                """;

        var resposta = template.queryForObject(sql, Long.class, id);
        return resposta != null && resposta > 0;
    }
}
