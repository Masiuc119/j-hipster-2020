package by.iba.masiuk.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import by.iba.masiuk.web.rest.TestUtil;

public class ExpeditionDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExpeditionDTO.class);
        ExpeditionDTO expeditionDTO1 = new ExpeditionDTO();
        expeditionDTO1.setId(1L);
        ExpeditionDTO expeditionDTO2 = new ExpeditionDTO();
        assertThat(expeditionDTO1).isNotEqualTo(expeditionDTO2);
        expeditionDTO2.setId(expeditionDTO1.getId());
        assertThat(expeditionDTO1).isEqualTo(expeditionDTO2);
        expeditionDTO2.setId(2L);
        assertThat(expeditionDTO1).isNotEqualTo(expeditionDTO2);
        expeditionDTO1.setId(null);
        assertThat(expeditionDTO1).isNotEqualTo(expeditionDTO2);
    }
}
