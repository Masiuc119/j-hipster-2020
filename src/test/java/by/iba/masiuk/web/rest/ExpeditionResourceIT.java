package by.iba.masiuk.web.rest;

import by.iba.masiuk.JHipster2020App;
import by.iba.masiuk.domain.Expedition;
import by.iba.masiuk.repository.ExpeditionRepository;
import by.iba.masiuk.service.ExpeditionService;
import by.iba.masiuk.service.dto.ExpeditionDTO;
import by.iba.masiuk.service.mapper.ExpeditionMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static by.iba.masiuk.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import by.iba.masiuk.domain.enumeration.Complexity;
/**
 * Integration tests for the {@link ExpeditionResource} REST controller.
 */
@SpringBootTest(classes = JHipster2020App.class)
@AutoConfigureMockMvc
@WithMockUser
public class ExpeditionResourceIT {

    private static final Complexity DEFAULT_COMPLEXITY = Complexity.EXTREME;
    private static final Complexity UPDATED_COMPLEXITY = Complexity.HARD;

    private static final ZonedDateTime DEFAULT_DISPATCH_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DISPATCH_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final LocalDate DEFAULT_DEAD_LINE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DEAD_LINE = LocalDate.now(ZoneId.systemDefault());

    private static final Double DEFAULT_RATE = 0D;
    private static final Double UPDATED_RATE = 1D;

    @Autowired
    private ExpeditionRepository expeditionRepository;

    @Autowired
    private ExpeditionMapper expeditionMapper;

    @Autowired
    private ExpeditionService expeditionService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restExpeditionMockMvc;

    private Expedition expedition;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Expedition createEntity(EntityManager em) {
        Expedition expedition = new Expedition()
            .complexity(DEFAULT_COMPLEXITY)
            .dispatchTime(DEFAULT_DISPATCH_TIME)
            .deadLine(DEFAULT_DEAD_LINE)
            .rate(DEFAULT_RATE);
        return expedition;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Expedition createUpdatedEntity(EntityManager em) {
        Expedition expedition = new Expedition()
            .complexity(UPDATED_COMPLEXITY)
            .dispatchTime(UPDATED_DISPATCH_TIME)
            .deadLine(UPDATED_DEAD_LINE)
            .rate(UPDATED_RATE);
        return expedition;
    }

    @BeforeEach
    public void initTest() {
        expedition = createEntity(em);
    }

    @Test
    @Transactional
    public void createExpedition() throws Exception {
        int databaseSizeBeforeCreate = expeditionRepository.findAll().size();
        // Create the Expedition
        ExpeditionDTO expeditionDTO = expeditionMapper.toDto(expedition);
        restExpeditionMockMvc.perform(post("/api/expeditions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(expeditionDTO)))
            .andExpect(status().isCreated());

        // Validate the Expedition in the database
        List<Expedition> expeditionList = expeditionRepository.findAll();
        assertThat(expeditionList).hasSize(databaseSizeBeforeCreate + 1);
        Expedition testExpedition = expeditionList.get(expeditionList.size() - 1);
        assertThat(testExpedition.getComplexity()).isEqualTo(DEFAULT_COMPLEXITY);
        assertThat(testExpedition.getDispatchTime()).isEqualTo(DEFAULT_DISPATCH_TIME);
        assertThat(testExpedition.getDeadLine()).isEqualTo(DEFAULT_DEAD_LINE);
        assertThat(testExpedition.getRate()).isEqualTo(DEFAULT_RATE);
    }

    @Test
    @Transactional
    public void createExpeditionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = expeditionRepository.findAll().size();

        // Create the Expedition with an existing ID
        expedition.setId(1L);
        ExpeditionDTO expeditionDTO = expeditionMapper.toDto(expedition);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExpeditionMockMvc.perform(post("/api/expeditions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(expeditionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Expedition in the database
        List<Expedition> expeditionList = expeditionRepository.findAll();
        assertThat(expeditionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllExpeditions() throws Exception {
        // Initialize the database
        expeditionRepository.saveAndFlush(expedition);

        // Get all the expeditionList
        restExpeditionMockMvc.perform(get("/api/expeditions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(expedition.getId().intValue())))
            .andExpect(jsonPath("$.[*].complexity").value(hasItem(DEFAULT_COMPLEXITY.toString())))
            .andExpect(jsonPath("$.[*].dispatchTime").value(hasItem(sameInstant(DEFAULT_DISPATCH_TIME))))
            .andExpect(jsonPath("$.[*].deadLine").value(hasItem(DEFAULT_DEAD_LINE.toString())))
            .andExpect(jsonPath("$.[*].rate").value(hasItem(DEFAULT_RATE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getExpedition() throws Exception {
        // Initialize the database
        expeditionRepository.saveAndFlush(expedition);

        // Get the expedition
        restExpeditionMockMvc.perform(get("/api/expeditions/{id}", expedition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(expedition.getId().intValue()))
            .andExpect(jsonPath("$.complexity").value(DEFAULT_COMPLEXITY.toString()))
            .andExpect(jsonPath("$.dispatchTime").value(sameInstant(DEFAULT_DISPATCH_TIME)))
            .andExpect(jsonPath("$.deadLine").value(DEFAULT_DEAD_LINE.toString()))
            .andExpect(jsonPath("$.rate").value(DEFAULT_RATE.doubleValue()));
    }
    @Test
    @Transactional
    public void getNonExistingExpedition() throws Exception {
        // Get the expedition
        restExpeditionMockMvc.perform(get("/api/expeditions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExpedition() throws Exception {
        // Initialize the database
        expeditionRepository.saveAndFlush(expedition);

        int databaseSizeBeforeUpdate = expeditionRepository.findAll().size();

        // Update the expedition
        Expedition updatedExpedition = expeditionRepository.findById(expedition.getId()).get();
        // Disconnect from session so that the updates on updatedExpedition are not directly saved in db
        em.detach(updatedExpedition);
        updatedExpedition
            .complexity(UPDATED_COMPLEXITY)
            .dispatchTime(UPDATED_DISPATCH_TIME)
            .deadLine(UPDATED_DEAD_LINE)
            .rate(UPDATED_RATE);
        ExpeditionDTO expeditionDTO = expeditionMapper.toDto(updatedExpedition);

        restExpeditionMockMvc.perform(put("/api/expeditions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(expeditionDTO)))
            .andExpect(status().isOk());

        // Validate the Expedition in the database
        List<Expedition> expeditionList = expeditionRepository.findAll();
        assertThat(expeditionList).hasSize(databaseSizeBeforeUpdate);
        Expedition testExpedition = expeditionList.get(expeditionList.size() - 1);
        assertThat(testExpedition.getComplexity()).isEqualTo(UPDATED_COMPLEXITY);
        assertThat(testExpedition.getDispatchTime()).isEqualTo(UPDATED_DISPATCH_TIME);
        assertThat(testExpedition.getDeadLine()).isEqualTo(UPDATED_DEAD_LINE);
        assertThat(testExpedition.getRate()).isEqualTo(UPDATED_RATE);
    }

    @Test
    @Transactional
    public void updateNonExistingExpedition() throws Exception {
        int databaseSizeBeforeUpdate = expeditionRepository.findAll().size();

        // Create the Expedition
        ExpeditionDTO expeditionDTO = expeditionMapper.toDto(expedition);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExpeditionMockMvc.perform(put("/api/expeditions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(expeditionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Expedition in the database
        List<Expedition> expeditionList = expeditionRepository.findAll();
        assertThat(expeditionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExpedition() throws Exception {
        // Initialize the database
        expeditionRepository.saveAndFlush(expedition);

        int databaseSizeBeforeDelete = expeditionRepository.findAll().size();

        // Delete the expedition
        restExpeditionMockMvc.perform(delete("/api/expeditions/{id}", expedition.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Expedition> expeditionList = expeditionRepository.findAll();
        assertThat(expeditionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
