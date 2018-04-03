package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Sponsor.
 */
@Entity
@Table(name = "sponsor")
public class Sponsor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToOne(mappedBy = "sponsor")
    @JsonIgnore
    private SponsorAgreement sponsorAgreement;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Sponsor name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public SponsorAgreement getSponsorAgreement() {
        return sponsorAgreement;
    }

    public Sponsor sponsorAgreement(SponsorAgreement sponsorAgreement) {
        this.sponsorAgreement = sponsorAgreement;
        return this;
    }

    public void setSponsorAgreement(SponsorAgreement sponsorAgreement) {
        this.sponsorAgreement = sponsorAgreement;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Sponsor sponsor = (Sponsor) o;
        if (sponsor.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sponsor.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Sponsor{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
