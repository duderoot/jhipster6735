package com.mycompany.myapp.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import com.mycompany.myapp.domain.SponsorAgreement;
import com.mycompany.myapp.domain.*; // for static metamodels
import com.mycompany.myapp.repository.SponsorAgreementRepository;
import com.mycompany.myapp.service.dto.SponsorAgreementCriteria;


/**
 * Service for executing complex queries for SponsorAgreement entities in the database.
 * The main input is a {@link SponsorAgreementCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link SponsorAgreement} or a {@link Page} of {@link SponsorAgreement} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class SponsorAgreementQueryService extends QueryService<SponsorAgreement> {

    private final Logger log = LoggerFactory.getLogger(SponsorAgreementQueryService.class);

    private final SponsorAgreementRepository sponsorAgreementRepository;

    public SponsorAgreementQueryService(SponsorAgreementRepository sponsorAgreementRepository) {
        this.sponsorAgreementRepository = sponsorAgreementRepository;
    }

    /**
     * Return a {@link List} of {@link SponsorAgreement} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<SponsorAgreement> findByCriteria(SponsorAgreementCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<SponsorAgreement> specification = createSpecification(criteria);
        return sponsorAgreementRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link SponsorAgreement} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<SponsorAgreement> findByCriteria(SponsorAgreementCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<SponsorAgreement> specification = createSpecification(criteria);
        return sponsorAgreementRepository.findAll(specification, page);
    }

    /**
     * Function to convert SponsorAgreementCriteria to a {@link Specification}
     */
    private Specification<SponsorAgreement> createSpecification(SponsorAgreementCriteria criteria) {
        Specification<SponsorAgreement> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), SponsorAgreement_.id));
            }
            if (criteria.getTotal() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getTotal(), SponsorAgreement_.total));
            }
            if (criteria.getSponsorId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getSponsorId(), SponsorAgreement_.sponsor, Sponsor_.id));
            }
        }
        return specification;
    }

}
