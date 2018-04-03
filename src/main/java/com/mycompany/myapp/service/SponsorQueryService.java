package com.mycompany.myapp.service;


import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import com.mycompany.myapp.domain.Sponsor;
import com.mycompany.myapp.domain.*; // for static metamodels
import com.mycompany.myapp.repository.SponsorRepository;
import com.mycompany.myapp.service.dto.SponsorCriteria;


/**
 * Service for executing complex queries for Sponsor entities in the database.
 * The main input is a {@link SponsorCriteria} which get's converted to {@link Specifications},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Sponsor} or a {@link Page} of {@link Sponsor} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class SponsorQueryService extends QueryService<Sponsor> {

    private final Logger log = LoggerFactory.getLogger(SponsorQueryService.class);


    private final SponsorRepository sponsorRepository;

    public SponsorQueryService(SponsorRepository sponsorRepository) {
        this.sponsorRepository = sponsorRepository;
    }

    /**
     * Return a {@link List} of {@link Sponsor} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Sponsor> findByCriteria(SponsorCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specifications<Sponsor> specification = createSpecification(criteria);
        return sponsorRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Sponsor} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Sponsor> findByCriteria(SponsorCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specifications<Sponsor> specification = createSpecification(criteria);
        return sponsorRepository.findAll(specification, page);
    }

    /**
     * Function to convert SponsorCriteria to a {@link Specifications}
     */
    private Specifications<Sponsor> createSpecification(SponsorCriteria criteria) {
        Specifications<Sponsor> specification = Specifications.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Sponsor_.id));
            }
            if (criteria.getName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getName(), Sponsor_.name));
            }
            if (criteria.getSponsorAgreementId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getSponsorAgreementId(), Sponsor_.sponsorAgreement, SponsorAgreement_.id));
            }
        }
        return specification;
    }

}
