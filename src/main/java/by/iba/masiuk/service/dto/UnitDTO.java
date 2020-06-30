package by.iba.masiuk.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import javax.persistence.Lob;

/**
 * A DTO for the {@link by.iba.masiuk.domain.Unit} entity.
 */
public class UnitDTO implements Serializable {
    
    private Long id;

    private LocalDate hireDate;

    @Lob
    private String biography;

    @Min(value = 0)
    @Max(value = 32)
    private Integer numberOfTeeth;


    private Long userId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getHireDate() {
        return hireDate;
    }

    public void setHireDate(LocalDate hireDate) {
        this.hireDate = hireDate;
    }

    public String getBiography() {
        return biography;
    }

    public void setBiography(String biography) {
        this.biography = biography;
    }

    public Integer getNumberOfTeeth() {
        return numberOfTeeth;
    }

    public void setNumberOfTeeth(Integer numberOfTeeth) {
        this.numberOfTeeth = numberOfTeeth;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UnitDTO)) {
            return false;
        }

        return id != null && id.equals(((UnitDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UnitDTO{" +
            "id=" + getId() +
            ", hireDate='" + getHireDate() + "'" +
            ", biography='" + getBiography() + "'" +
            ", numberOfTeeth=" + getNumberOfTeeth() +
            ", userId=" + getUserId() +
            "}";
    }
}
