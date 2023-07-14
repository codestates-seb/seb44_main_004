package com.seb_main_004.whosbook.curation.repository;

import com.seb_main_004.whosbook.curation.entity.Curation;
import com.seb_main_004.whosbook.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CurationRepository extends JpaRepository<Curation, Long> {

    Curation findByCurationId(long curationId);

    Page<Curation> findByCurationStatusAndVisibility(Curation.CurationStatus curationStatus, Curation.Visibility visibility, Pageable pageable);

    Page<Curation> findByMemberAndCurationStatus(Member member, Curation.CurationStatus curationStatus, Pageable pageable);

    Page<Curation> findByMemberAndCurationStatusAndVisibility(Member member, Curation.CurationStatus curationStatus, Curation.Visibility visibility, Pageable pageable);
}
