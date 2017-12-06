package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.SponsorAgreement;
import com.mycompany.myapp.repository.SponsorAgreementRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing SponsorAgreement.
 */
@Service
@Transactional
public class SponsorAgreementService {

    private final Logger log = LoggerFactory.getLogger(SponsorAgreementService.class);

    private final SponsorAgreementRepository sponsorAgreementRepository;

    public SponsorAgreementService(SponsorAgreementRepository sponsorAgreementRepository) {
        this.sponsorAgreementRepository = sponsorAgreementRepository;
    }

    /**
     * Save a sponsorAgreement.
     *
     * @param sponsorAgreement the entity to save
     * @return the persisted entity
     */
    public SponsorAgreement save(SponsorAgreement sponsorAgreement) {
        log.debug("Request to save SponsorAgreement : {}", sponsorAgreement);
        return sponsorAgreementRepository.save(sponsorAgreement);
    }

    /**
     * Get all the sponsorAgreements.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<SponsorAgreement> findAll() {
        log.debug("Request to get all SponsorAgreements");
        return sponsorAgreementRepository.findAll();
    }

    /**
     * Get one sponsorAgreement by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public SponsorAgreement findOne(Long id) {
        log.debug("Request to get SponsorAgreement : {}", id);
        return sponsorAgreementRepository.findOne(id);
    }

    /**
     * Delete the sponsorAgreement by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete SponsorAgreement : {}", id);
        sponsorAgreementRepository.delete(id);
    }
}
