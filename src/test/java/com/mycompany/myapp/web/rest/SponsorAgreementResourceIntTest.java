package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterApp;

import com.mycompany.myapp.domain.SponsorAgreement;
import com.mycompany.myapp.domain.Sponsor;
import com.mycompany.myapp.repository.SponsorAgreementRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SponsorAgreementResource REST controller.
 *
 * @see SponsorAgreementResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class SponsorAgreementResourceIntTest {

    private static final Float DEFAULT_TOTAL = 1F;
    private static final Float UPDATED_TOTAL = 2F;

    @Autowired
    private SponsorAgreementRepository sponsorAgreementRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSponsorAgreementMockMvc;

    private SponsorAgreement sponsorAgreement;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SponsorAgreementResource sponsorAgreementResource = new SponsorAgreementResource(sponsorAgreementRepository);
        this.restSponsorAgreementMockMvc = MockMvcBuilders.standaloneSetup(sponsorAgreementResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SponsorAgreement createEntity(EntityManager em) {
        SponsorAgreement sponsorAgreement = new SponsorAgreement()
            .total(DEFAULT_TOTAL);
        // Add required entity
        Sponsor sponsor = SponsorResourceIntTest.createEntity(em);
        em.persist(sponsor);
        em.flush();
        sponsorAgreement.setSponsor(sponsor);
        return sponsorAgreement;
    }

    @Before
    public void initTest() {
        sponsorAgreement = createEntity(em);
    }

    @Test
    @Transactional
    public void createSponsorAgreement() throws Exception {
        int databaseSizeBeforeCreate = sponsorAgreementRepository.findAll().size();

        // Create the SponsorAgreement
        restSponsorAgreementMockMvc.perform(post("/api/sponsor-agreements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sponsorAgreement)))
            .andExpect(status().isCreated());

        // Validate the SponsorAgreement in the database
        List<SponsorAgreement> sponsorAgreementList = sponsorAgreementRepository.findAll();
        assertThat(sponsorAgreementList).hasSize(databaseSizeBeforeCreate + 1);
        SponsorAgreement testSponsorAgreement = sponsorAgreementList.get(sponsorAgreementList.size() - 1);
        assertThat(testSponsorAgreement.getTotal()).isEqualTo(DEFAULT_TOTAL);
    }

    @Test
    @Transactional
    public void createSponsorAgreementWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sponsorAgreementRepository.findAll().size();

        // Create the SponsorAgreement with an existing ID
        sponsorAgreement.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSponsorAgreementMockMvc.perform(post("/api/sponsor-agreements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sponsorAgreement)))
            .andExpect(status().isBadRequest());

        // Validate the SponsorAgreement in the database
        List<SponsorAgreement> sponsorAgreementList = sponsorAgreementRepository.findAll();
        assertThat(sponsorAgreementList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSponsorAgreements() throws Exception {
        // Initialize the database
        sponsorAgreementRepository.saveAndFlush(sponsorAgreement);

        // Get all the sponsorAgreementList
        restSponsorAgreementMockMvc.perform(get("/api/sponsor-agreements?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sponsorAgreement.getId().intValue())))
            .andExpect(jsonPath("$.[*].total").value(hasItem(DEFAULT_TOTAL.doubleValue())));
    }

    @Test
    @Transactional
    public void getSponsorAgreement() throws Exception {
        // Initialize the database
        sponsorAgreementRepository.saveAndFlush(sponsorAgreement);

        // Get the sponsorAgreement
        restSponsorAgreementMockMvc.perform(get("/api/sponsor-agreements/{id}", sponsorAgreement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sponsorAgreement.getId().intValue()))
            .andExpect(jsonPath("$.total").value(DEFAULT_TOTAL.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSponsorAgreement() throws Exception {
        // Get the sponsorAgreement
        restSponsorAgreementMockMvc.perform(get("/api/sponsor-agreements/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSponsorAgreement() throws Exception {
        // Initialize the database
        sponsorAgreementRepository.saveAndFlush(sponsorAgreement);
        int databaseSizeBeforeUpdate = sponsorAgreementRepository.findAll().size();

        // Update the sponsorAgreement
        SponsorAgreement updatedSponsorAgreement = sponsorAgreementRepository.findOne(sponsorAgreement.getId());
        // Disconnect from session so that the updates on updatedSponsorAgreement are not directly saved in db
        em.detach(updatedSponsorAgreement);
        updatedSponsorAgreement
            .total(UPDATED_TOTAL);

        restSponsorAgreementMockMvc.perform(put("/api/sponsor-agreements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSponsorAgreement)))
            .andExpect(status().isOk());

        // Validate the SponsorAgreement in the database
        List<SponsorAgreement> sponsorAgreementList = sponsorAgreementRepository.findAll();
        assertThat(sponsorAgreementList).hasSize(databaseSizeBeforeUpdate);
        SponsorAgreement testSponsorAgreement = sponsorAgreementList.get(sponsorAgreementList.size() - 1);
        assertThat(testSponsorAgreement.getTotal()).isEqualTo(UPDATED_TOTAL);
    }

    @Test
    @Transactional
    public void updateNonExistingSponsorAgreement() throws Exception {
        int databaseSizeBeforeUpdate = sponsorAgreementRepository.findAll().size();

        // Create the SponsorAgreement

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSponsorAgreementMockMvc.perform(put("/api/sponsor-agreements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sponsorAgreement)))
            .andExpect(status().isCreated());

        // Validate the SponsorAgreement in the database
        List<SponsorAgreement> sponsorAgreementList = sponsorAgreementRepository.findAll();
        assertThat(sponsorAgreementList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSponsorAgreement() throws Exception {
        // Initialize the database
        sponsorAgreementRepository.saveAndFlush(sponsorAgreement);
        int databaseSizeBeforeDelete = sponsorAgreementRepository.findAll().size();

        // Get the sponsorAgreement
        restSponsorAgreementMockMvc.perform(delete("/api/sponsor-agreements/{id}", sponsorAgreement.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SponsorAgreement> sponsorAgreementList = sponsorAgreementRepository.findAll();
        assertThat(sponsorAgreementList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SponsorAgreement.class);
        SponsorAgreement sponsorAgreement1 = new SponsorAgreement();
        sponsorAgreement1.setId(1L);
        SponsorAgreement sponsorAgreement2 = new SponsorAgreement();
        sponsorAgreement2.setId(sponsorAgreement1.getId());
        assertThat(sponsorAgreement1).isEqualTo(sponsorAgreement2);
        sponsorAgreement2.setId(2L);
        assertThat(sponsorAgreement1).isNotEqualTo(sponsorAgreement2);
        sponsorAgreement1.setId(null);
        assertThat(sponsorAgreement1).isNotEqualTo(sponsorAgreement2);
    }
}
