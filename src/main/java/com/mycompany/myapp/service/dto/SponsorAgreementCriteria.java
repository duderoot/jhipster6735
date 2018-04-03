package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;






/**
 * Criteria class for the SponsorAgreement entity. This class is used in SponsorAgreementResource to
 * receive all the possible filtering options from the Http GET request parameters.
 * For example the following could be a valid requests:
 * <code> /sponsor-agreements?id.greaterThan=5&amp;attr1.contains=something&amp;attr2.specified=false</code>
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class SponsorAgreementCriteria implements Serializable {
    private static final long serialVersionUID = 1L;


    private LongFilter id;

    private FloatFilter total;

    private LongFilter sponsorId;

    public SponsorAgreementCriteria() {
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public FloatFilter getTotal() {
        return total;
    }

    public void setTotal(FloatFilter total) {
        this.total = total;
    }

    public LongFilter getSponsorId() {
        return sponsorId;
    }

    public void setSponsorId(LongFilter sponsorId) {
        this.sponsorId = sponsorId;
    }

    @Override
    public String toString() {
        return "SponsorAgreementCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (total != null ? "total=" + total + ", " : "") +
                (sponsorId != null ? "sponsorId=" + sponsorId + ", " : "") +
            "}";
    }

}
