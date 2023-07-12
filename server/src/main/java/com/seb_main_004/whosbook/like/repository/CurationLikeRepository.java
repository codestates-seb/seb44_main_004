package com.seb_main_004.whosbook.like.repository;

import com.seb_main_004.whosbook.curation.entity.Curation;
import com.seb_main_004.whosbook.like.entity.CurationLike;
import com.seb_main_004.whosbook.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CurationLikeRepository extends JpaRepository<CurationLike,Long> {

    @Query(value = "SELECT Curation.member_id,Member.email from Curation inner join Member where Curation.member_id=Member.member_id", nativeQuery = true)
    Optional<CurationLike> findByCurationAndMember(Curation findCuration, Member findMember);
}
