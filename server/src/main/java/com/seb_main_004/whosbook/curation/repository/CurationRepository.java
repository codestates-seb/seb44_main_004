package com.seb_main_004.whosbook.curation.repository;

import com.seb_main_004.whosbook.curation.entity.Curation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CurationRepository extends JpaRepository<Curation, Long> {

    Curation findByCurationId(long curationId);

    Page<Curation> findByCurationStatusAndVisibility(Curation.CurationStatus curationStatus, Curation.Visibility visibility, Pageable pageable);
}
