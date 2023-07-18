package com.seb_main_004.whosbook.curation.repository;

import com.seb_main_004.whosbook.curation.category.Category;
import com.seb_main_004.whosbook.curation.entity.Curation;
import com.seb_main_004.whosbook.like.entity.CurationLike;
import com.seb_main_004.whosbook.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CurationRepository extends JpaRepository<Curation, Long> {

    Curation findByCurationId(long curationId);

    Page<Curation> findByCurationStatusAndVisibility(Curation.CurationStatus curationStatus, Curation.Visibility visibility, Pageable pageable);

    Page<Curation> findByMemberAndCurationStatus(Member member, Curation.CurationStatus curationStatus, Pageable pageable);

    Page<Curation> findByMemberAndCurationStatusAndVisibility(Member member,
                                                              Curation.CurationStatus curationStatus,
                                                              Curation.Visibility visibility,
                                                              Pageable pageable);

    //멤버가 좋아요한 큐레이션을 불러오는 쿼리문
    @Query(value = "SELECT * FROM Curation c, Member m, Curation_Like l " +
            "WHERE m.member_id = l.member_id AND l.curation_id = c.curation_id " +
            "AND m.member_id = :memberId AND c.curation_status = 'CURATION_ACTIVE' " +
            "AND c.visibility = 'PUBLIC'", nativeQuery = true)
    Page<Curation> findByLikeCurations(@Param("memberId") Long memberId, Pageable pageable);

    Page<Curation> findByCategoryAndCurationStatusAndVisibility(Category category, Curation.CurationStatus curationStatus, Curation.Visibility visibility, Pageable pageable);
}
