package by.iba.masiuk.service.dto;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import by.iba.masiuk.domain.enumeration.Complexity;

/**
 * A DTO for the {@link by.iba.masiuk.domain.Expedition} entity.
 */
public class ExpeditionDTO implements Serializable {
    
    private Long id;

    private Complexity complexity;

    private ZonedDateTime dispatchTime;

    private LocalDate deadLine;

    @DecimalMin(value = "0")
    @DecimalMax(value = "1")
    private Double rate;


    private Long unitId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Complexity getComplexity() {
        return complexity;
    }

    public void setComplexity(Complexity complexity) {
        this.complexity = complexity;
    }

    public ZonedDateTime getDispatchTime() {
        return dispatchTime;
    }

    public void setDispatchTime(ZonedDateTime dispatchTime) {
        this.dispatchTime = dispatchTime;
    }

    public LocalDate getDeadLine() {
        return deadLine;
    }

    public void setDeadLine(LocalDate deadLine) {
        this.deadLine = deadLine;
    }

    public Double getRate() {
        return rate;
    }

    public void setRate(Double rate) {
        this.rate = rate;
    }

    public Long getUnitId() {
        return unitId;
    }

    public void setUnitId(Long unitId) {
        this.unitId = unitId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ExpeditionDTO)) {
            return false;
        }

        return id != null && id.equals(((ExpeditionDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ExpeditionDTO{" +
            "id=" + getId() +
            ", complexity='" + getComplexity() + "'" +
            ", dispatchTime='" + getDispatchTime() + "'" +
            ", deadLine='" + getDeadLine() + "'" +
            ", rate=" + getRate() +
            ", unitId=" + getUnitId() +
            "}";
    }
}
