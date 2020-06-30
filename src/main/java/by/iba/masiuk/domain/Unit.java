package by.iba.masiuk.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Unit.
 */
@Entity
@Table(name = "unit")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Unit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "hire_date")
    private LocalDate hireDate;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "biography")
    private String biography;

    @Min(value = 0)
    @Max(value = 32)
    @Column(name = "number_of_teeth")
    private Integer numberOfTeeth;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "unit")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Expedition> expeditions = new HashSet<>();

    @ManyToMany(mappedBy = "units")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Language> languages = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getHireDate() {
        return hireDate;
    }

    public Unit hireDate(LocalDate hireDate) {
        this.hireDate = hireDate;
        return this;
    }

    public void setHireDate(LocalDate hireDate) {
        this.hireDate = hireDate;
    }

    public String getBiography() {
        return biography;
    }

    public Unit biography(String biography) {
        this.biography = biography;
        return this;
    }

    public void setBiography(String biography) {
        this.biography = biography;
    }

    public Integer getNumberOfTeeth() {
        return numberOfTeeth;
    }

    public Unit numberOfTeeth(Integer numberOfTeeth) {
        this.numberOfTeeth = numberOfTeeth;
        return this;
    }

    public void setNumberOfTeeth(Integer numberOfTeeth) {
        this.numberOfTeeth = numberOfTeeth;
    }

    public User getUser() {
        return user;
    }

    public Unit user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Expedition> getExpeditions() {
        return expeditions;
    }

    public Unit expeditions(Set<Expedition> expeditions) {
        this.expeditions = expeditions;
        return this;
    }

    public Unit addExpedition(Expedition expedition) {
        this.expeditions.add(expedition);
        expedition.setUnit(this);
        return this;
    }

    public Unit removeExpedition(Expedition expedition) {
        this.expeditions.remove(expedition);
        expedition.setUnit(null);
        return this;
    }

    public void setExpeditions(Set<Expedition> expeditions) {
        this.expeditions = expeditions;
    }

    public Set<Language> getLanguages() {
        return languages;
    }

    public Unit languages(Set<Language> languages) {
        this.languages = languages;
        return this;
    }

    public Unit addLanguage(Language language) {
        this.languages.add(language);
        language.getUnits().add(this);
        return this;
    }

    public Unit removeLanguage(Language language) {
        this.languages.remove(language);
        language.getUnits().remove(this);
        return this;
    }

    public void setLanguages(Set<Language> languages) {
        this.languages = languages;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Unit)) {
            return false;
        }
        return id != null && id.equals(((Unit) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Unit{" +
            "id=" + getId() +
            ", hireDate='" + getHireDate() + "'" +
            ", biography='" + getBiography() + "'" +
            ", numberOfTeeth=" + getNumberOfTeeth() +
            "}";
    }
}
