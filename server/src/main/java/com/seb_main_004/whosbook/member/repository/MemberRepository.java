package com.seb_main_004.whosbook.member.repository;

import com.seb_main_004.whosbook.member.dto.BestCuratorDto;
import com.seb_main_004.whosbook.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);

    Optional<Member> findByMemberId(long memberId);

    Optional<Member> findByNickname(String nickname);
    @Query(value = "SELECT m.member_id, m.email, m.image_url, m.introduction, m.created_at, m.updated_at, m.member_status, m.nickname, m.password, m.image_key, COUNT(s.subscriber) AS num_subscribers " +
    "FROM member m LEFT JOIN subscribe s ON m.member_id = s.subscribed_member " +
    "WHERE m.member_status = 'MEMBER_ACTIVE' " +
    "GROUP BY m.member_id " +
    "ORDER BY num_subscribers DESC", countQuery = "SELECT COUNT(*) FROM member", nativeQuery = true)
    Page<Member> findBestCurators(Pageable pageable);

    @Query(value = "SELECT new com.seb_main_004.whosbook.member.dto.BestCuratorDto(m.memberId, m.email, m.nickname, m.introduction, m.imageUrl, SIZE(m.subscribers)) " +
    "FROM Member m LEFT JOIN m.subscribers " +
    "WHERE m.memberStatus = 'MEMBER_ACTIVE' " +
    "GROUP BY m " +
    "ORDER BY SIZE(m.subscribers) DESC")
    Page<BestCuratorDto> findBestCuratorsTestV2(Pageable pageable);
}
