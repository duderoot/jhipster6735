package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Sponsor;
import com.mycompany.myapp.repository.SponsorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
/**
 * Service Implementation for managing Sponsor.
 */
@Service
@Transactional
public class SponsorService {

    private final Logger log = LoggerFactory.getLogger(SponsorService.class);

    private final SponsorRepository sponsorRepository;

    public SponsorService(SponsorRepository sponsorRepository) {
        this.sponsorRepository = sponsorRepository;
    }

    /**
     * Save a sponsor.
     *
     * @param sponsor the entity to save
     * @return the persisted entity
     */
    public Sponsor save(Sponsor sponsor) {
        log.debug("Request to save Sponsor : {}", sponsor);
        return sponsorRepository.save(sponsor);
    }

    /**
     * Get all the sponsors.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Sponsor> findAll() {
        log.debug("Request to get all Sponsors");
        return sponsorRepository.findAll();
    }



    /**
     *  get all the sponsors where SponsorAgreement is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Sponsor> findAllWhereSponsorAgreementIsNull() {
        log.debug("Request to get all sponsors where SponsorAgreement is null");
        return StreamSupport
            .stream(sponsorRepository.findAll().spliterator(), false)
            .filter(sponsor -> sponsor.getSponsorAgreement() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one sponsor by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Sponsor> findOne(Long id) {
        log.debug("Request to get Sponsor : {}", id);
        return sponsorRepository.findById(id);
    }

    /**
     * Delete the sponsor by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Sponsor : {}", id);
        sponsorRepository.deleteById(id);
    }
}
