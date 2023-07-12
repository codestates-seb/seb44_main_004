package com.seb_main_004.whosbook.like.repository;

import com.seb_main_004.whosbook.curation.entity.Curation;
import com.seb_main_004.whosbook.like.entity.CurationLike;
import com.seb_main_004.whosbook.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CurationLikeRepository extends JpaRepository<CurationLike,Long> {

    Optional<CurationLike> findLikeByCurationAndMember(Curation findCuration, Member findMember);
}
