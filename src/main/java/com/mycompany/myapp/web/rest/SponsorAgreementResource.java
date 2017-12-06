package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.SponsorAgreement;
import com.mycompany.myapp.service.SponsorAgreementService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.service.dto.SponsorAgreementCriteria;
import com.mycompany.myapp.service.SponsorAgreementQueryService;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SponsorAgreement.
 */
@RestController
@RequestMapping("/api")
public class SponsorAgreementResource {

    private final Logger log = LoggerFactory.getLogger(SponsorAgreementResource.class);

    private static final String ENTITY_NAME = "sponsorAgreement";

    private final SponsorAgreementService sponsorAgreementService;

    private final SponsorAgreementQueryService sponsorAgreementQueryService;

    public SponsorAgreementResource(SponsorAgreementService sponsorAgreementService, SponsorAgreementQueryService sponsorAgreementQueryService) {
        this.sponsorAgreementService = sponsorAgreementService;
        this.sponsorAgreementQueryService = sponsorAgreementQueryService;
    }

    /**
     * POST  /sponsor-agreements : Create a new sponsorAgreement.
     *
     * @param sponsorAgreement the sponsorAgreement to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sponsorAgreement, or with status 400 (Bad Request) if the sponsorAgreement has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sponsor-agreements")
    @Timed
    public ResponseEntity<SponsorAgreement> createSponsorAgreement(@Valid @RequestBody SponsorAgreement sponsorAgreement) throws URISyntaxException {
        log.debug("REST request to save SponsorAgreement : {}", sponsorAgreement);
        if (sponsorAgreement.getId() != null) {
            throw new BadRequestAlertException("A new sponsorAgreement cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SponsorAgreement result = sponsorAgreementService.save(sponsorAgreement);
        return ResponseEntity.created(new URI("/api/sponsor-agreements/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sponsor-agreements : Updates an existing sponsorAgreement.
     *
     * @param sponsorAgreement the sponsorAgreement to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sponsorAgreement,
     * or with status 400 (Bad Request) if the sponsorAgreement is not valid,
     * or with status 500 (Internal Server Error) if the sponsorAgreement couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sponsor-agreements")
    @Timed
    public ResponseEntity<SponsorAgreement> updateSponsorAgreement(@Valid @RequestBody SponsorAgreement sponsorAgreement) throws URISyntaxException {
        log.debug("REST request to update SponsorAgreement : {}", sponsorAgreement);
        if (sponsorAgreement.getId() == null) {
            return createSponsorAgreement(sponsorAgreement);
        }
        SponsorAgreement result = sponsorAgreementService.save(sponsorAgreement);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sponsorAgreement.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sponsor-agreements : get all the sponsorAgreements.
     *
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of sponsorAgreements in body
     */
    @GetMapping("/sponsor-agreements")
    @Timed
    public ResponseEntity<List<SponsorAgreement>> getAllSponsorAgreements(SponsorAgreementCriteria criteria) {
        log.debug("REST request to get SponsorAgreements by criteria: {}", criteria);
        List<SponsorAgreement> entityList = sponsorAgreementQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * GET  /sponsor-agreements/:id : get the "id" sponsorAgreement.
     *
     * @param id the id of the sponsorAgreement to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sponsorAgreement, or with status 404 (Not Found)
     */
    @GetMapping("/sponsor-agreements/{id}")
    @Timed
    public ResponseEntity<SponsorAgreement> getSponsorAgreement(@PathVariable Long id) {
        log.debug("REST request to get SponsorAgreement : {}", id);
        SponsorAgreement sponsorAgreement = sponsorAgreementService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(sponsorAgreement));
    }

    /**
     * DELETE  /sponsor-agreements/:id : delete the "id" sponsorAgreement.
     *
     * @param id the id of the sponsorAgreement to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sponsor-agreements/{id}")
    @Timed
    public ResponseEntity<Void> deleteSponsorAgreement(@PathVariable Long id) {
        log.debug("REST request to delete SponsorAgreement : {}", id);
        sponsorAgreementService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
