package school.sptech.projeto_integrador_api.estados.repository;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import school.sptech.projeto_integrador_api.estados.model.Estado;

import java.util.List;

@Repository
public class EstadoRepository {

    private final JdbcTemplate template;

    public EstadoRepository(JdbcTemplate template) {
        this.template = template;
    }

    public List<Estado> getAll() {
        String sql = "SELECT * FROM estado";

        return template.query(sql, new BeanPropertyRowMapper<>(Estado.class));
    }

    public String getNomeById(Integer id) {
        String sql = "SELECT nome FROM estado WHERE id=?";

        return template.queryForObject(sql, String.class, id);
    }
}
