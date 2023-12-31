package com.seb_main_004.whosbook.curation.repository;

import com.seb_main_004.whosbook.curation.category.Category;
import com.seb_main_004.whosbook.curation.entity.Curation;
import com.seb_main_004.whosbook.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CurationRepository extends JpaRepository<Curation, Long> {

    Curation findByCurationId(long curationId);

    // 추후 고민 필요 : select 쿼리문이 3번 나감
    @Query("select c from Curation c where (:category is null or c.category.id = :category) " +
            "and c.visibility = 'PUBLIC' " +
            "and c.curationStatus = 'CURATION_ACTIVE'")
    Page<Curation> findCurationList(@Param("category") Long categoryId, Pageable pageable);

    Page<Curation> findByMemberAndCurationStatus(Member member, Curation.CurationStatus curationStatus, Pageable pageable);

    Page<Curation> findByMemberAndCurationStatusAndVisibility(Member member,
                                                              Curation.CurationStatus curationStatus,
                                                              Curation.Visibility visibility,
                                                              Pageable pageable);

    List<Curation> findByMemberAndCurationStatus(Member member,
                                                 Curation.CurationStatus curationStatus);

    //멤버가 좋아요한 큐레이션을 불러오는 쿼리문
    @Query(value = "SELECT c FROM CurationLike cl JOIN Curation c ON cl.curation.curationId = c.curationId WHERE cl.member.memberId = :memberId")
    Page<Curation> findByLikeCurations(@Param("memberId") Long memberId, Pageable pageable);

    Page<Curation> findByCategoryAndCurationStatusAndVisibility(Category category, Curation.CurationStatus curationStatus, Curation.Visibility visibility, Pageable pageable);
}
