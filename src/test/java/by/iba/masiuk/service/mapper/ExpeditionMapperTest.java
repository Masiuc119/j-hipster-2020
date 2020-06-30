package by.iba.masiuk.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class ExpeditionMapperTest {

    private ExpeditionMapper expeditionMapper;

    @BeforeEach
    public void setUp() {
        expeditionMapper = new ExpeditionMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(expeditionMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(expeditionMapper.fromId(null)).isNull();
    }
}
