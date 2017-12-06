package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Sponsor;

import com.mycompany.myapp.repository.SponsorRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing Sponsor.
 */
@RestController
@RequestMapping("/api")
public class SponsorResource {

    private final Logger log = LoggerFactory.getLogger(SponsorResource.class);

    private static final String ENTITY_NAME = "sponsor";

    private final SponsorRepository sponsorRepository;

    public SponsorResource(SponsorRepository sponsorRepository) {
        this.sponsorRepository = sponsorRepository;
    }

    /**
     * POST  /sponsors : Create a new sponsor.
     *
     * @param sponsor the sponsor to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sponsor, or with status 400 (Bad Request) if the sponsor has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sponsors")
    @Timed
    public ResponseEntity<Sponsor> createSponsor(@RequestBody Sponsor sponsor) throws URISyntaxException {
        log.debug("REST request to save Sponsor : {}", sponsor);
        if (sponsor.getId() != null) {
            throw new BadRequestAlertException("A new sponsor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Sponsor result = sponsorRepository.save(sponsor);
        return ResponseEntity.created(new URI("/api/sponsors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sponsors : Updates an existing sponsor.
     *
     * @param sponsor the sponsor to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sponsor,
     * or with status 400 (Bad Request) if the sponsor is not valid,
     * or with status 500 (Internal Server Error) if the sponsor couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sponsors")
    @Timed
    public ResponseEntity<Sponsor> updateSponsor(@RequestBody Sponsor sponsor) throws URISyntaxException {
        log.debug("REST request to update Sponsor : {}", sponsor);
        if (sponsor.getId() == null) {
            return createSponsor(sponsor);
        }
        Sponsor result = sponsorRepository.save(sponsor);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sponsor.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sponsors : get all the sponsors.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of sponsors in body
     */
    @GetMapping("/sponsors")
    @Timed
    public List<Sponsor> getAllSponsors(@RequestParam(required = false) String filter) {
        if ("sponsoragreement-is-null".equals(filter)) {
            log.debug("REST request to get all Sponsors where sponsorAgreement is null");
            return StreamSupport
                .stream(sponsorRepository.findAll().spliterator(), false)
                .filter(sponsor -> sponsor.getSponsorAgreement() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Sponsors");
        return sponsorRepository.findAll();
        }

    /**
     * GET  /sponsors/:id : get the "id" sponsor.
     *
     * @param id the id of the sponsor to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sponsor, or with status 404 (Not Found)
     */
    @GetMapping("/sponsors/{id}")
    @Timed
    public ResponseEntity<Sponsor> getSponsor(@PathVariable Long id) {
        log.debug("REST request to get Sponsor : {}", id);
        Sponsor sponsor = sponsorRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(sponsor));
    }

    /**
     * DELETE  /sponsors/:id : delete the "id" sponsor.
     *
     * @param id the id of the sponsor to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sponsors/{id}")
    @Timed
    public ResponseEntity<Void> deleteSponsor(@PathVariable Long id) {
        log.debug("REST request to delete Sponsor : {}", id);
        sponsorRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
