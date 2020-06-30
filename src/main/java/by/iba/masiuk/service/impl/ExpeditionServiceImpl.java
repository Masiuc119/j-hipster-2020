package by.iba.masiuk.service.impl;

import by.iba.masiuk.service.ExpeditionService;
import by.iba.masiuk.domain.Expedition;
import by.iba.masiuk.repository.ExpeditionRepository;
import by.iba.masiuk.service.dto.ExpeditionDTO;
import by.iba.masiuk.service.mapper.ExpeditionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Expedition}.
 */
@Service
@Transactional
public class ExpeditionServiceImpl implements ExpeditionService {

    private final Logger log = LoggerFactory.getLogger(ExpeditionServiceImpl.class);

    private final ExpeditionRepository expeditionRepository;

    private final ExpeditionMapper expeditionMapper;

    public ExpeditionServiceImpl(ExpeditionRepository expeditionRepository, ExpeditionMapper expeditionMapper) {
        this.expeditionRepository = expeditionRepository;
        this.expeditionMapper = expeditionMapper;
    }

    @Override
    public ExpeditionDTO save(ExpeditionDTO expeditionDTO) {
        log.debug("Request to save Expedition : {}", expeditionDTO);
        Expedition expedition = expeditionMapper.toEntity(expeditionDTO);
        expedition = expeditionRepository.save(expedition);
        return expeditionMapper.toDto(expedition);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ExpeditionDTO> findAll() {
        log.debug("Request to get all Expeditions");
        return expeditionRepository.findAll().stream()
            .map(expeditionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<ExpeditionDTO> findOne(Long id) {
        log.debug("Request to get Expedition : {}", id);
        return expeditionRepository.findById(id)
            .map(expeditionMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Expedition : {}", id);
        expeditionRepository.deleteById(id);
    }
}
