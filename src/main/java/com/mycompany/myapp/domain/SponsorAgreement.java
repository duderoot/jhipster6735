package com.mycompany.myapp.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A SponsorAgreement.
 */
@Entity
@Table(name = "sponsor_agreement")
public class SponsorAgreement implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "total")
    private Float total;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Sponsor sponsor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getTotal() {
        return total;
    }

    public SponsorAgreement total(Float total) {
        this.total = total;
        return this;
    }

    public void setTotal(Float total) {
        this.total = total;
    }

    public Sponsor getSponsor() {
        return sponsor;
    }

    public SponsorAgreement sponsor(Sponsor sponsor) {
        this.sponsor = sponsor;
        return this;
    }

    public void setSponsor(Sponsor sponsor) {
        this.sponsor = sponsor;
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
        SponsorAgreement sponsorAgreement = (SponsorAgreement) o;
        if (sponsorAgreement.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sponsorAgreement.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SponsorAgreement{" +
            "id=" + getId() +
            ", total=" + getTotal() +
            "}";
    }
}
