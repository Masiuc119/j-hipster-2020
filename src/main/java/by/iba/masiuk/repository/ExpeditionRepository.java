package by.iba.masiuk.repository;

import by.iba.masiuk.domain.Expedition;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Expedition entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExpeditionRepository extends JpaRepository<Expedition, Long> {
}
