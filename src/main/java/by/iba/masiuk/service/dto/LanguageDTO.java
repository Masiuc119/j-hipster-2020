package by.iba.masiuk.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A DTO for the {@link by.iba.masiuk.domain.Language} entity.
 */
public class LanguageDTO implements Serializable {
    
    private Long id;

    @Size(min = 1, max = 15)
    private String title;

    private Set<UnitDTO> units = new HashSet<>();
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Set<UnitDTO> getUnits() {
        return units;
    }

    public void setUnits(Set<UnitDTO> units) {
        this.units = units;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LanguageDTO)) {
            return false;
        }

        return id != null && id.equals(((LanguageDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LanguageDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", units='" + getUnits() + "'" +
            "}";
    }
}
