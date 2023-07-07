package com.seb_main_004.whosbook.curation.repository;

import com.seb_main_004.whosbook.curation.entity.Curation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CurationRepository extends JpaRepository<Curation, Long> {

    Curation findByCurationId(long curationId);
}
