package com.seb_main_004.whosbook.like.service;


import com.seb_main_004.whosbook.curation.entity.Curation;
import com.seb_main_004.whosbook.curation.service.CurationService;
import com.seb_main_004.whosbook.exception.BusinessLogicException;
import com.seb_main_004.whosbook.like.dto.CurationLikeResponseDto;
import com.seb_main_004.whosbook.like.entity.CurationLike;
import com.seb_main_004.whosbook.like.repository.CurationLikeRepository;
import com.seb_main_004.whosbook.member.entity.Member;
import com.seb_main_004.whosbook.member.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@Slf4j
public class CurationLikeService {

    private  final CurationLikeRepository likeRepository;
    private final CurationService curationService;

    private final MemberService memberService;

    public CurationLikeService(CurationLikeRepository likeRepository, CurationService curationService, MemberService memberService) {
        this.likeRepository = likeRepository;
        this.curationService = curationService;
        this.memberService = memberService;
    }

    public CurationLikeResponseDto postLike(String userEmail, long curationId) {

        //curation, Member 정보 가져오기
        Curation findCuration= curationService.findVerifiedCurationById(curationId);
        Member findMember= memberService.findVerifiedMemberByEmail(userEmail);

        int likeCount=findCuration.getCurationLikeCount(); //findCuration으로 count값을 가져올시 null포인터 익셉션을 던짐

        String findEmail= findCuration.getMember().getEmail();

        log.info("curation찾았음!!!");
        //본인글에는 좋아요  할수없게 비활성화
        if(userEmail.equals(findEmail)){
            return  new CurationLikeResponseDto(curationId,likeCount);
        }

        //member가 해당 curation에 좋아요한 정보 가져오기
        Optional<CurationLike> findLike= likeRepository.findByCurationAndMember(findCuration,findMember);

        //좋아요 누르지 않은 상태일때
        if(findLike.isEmpty()){
            likeRepository.save(new CurationLike(findCuration, findMember));
            likeCount++;

        }

        findCuration.setCurationLikeCount(likeCount);
        curationService.saveCuration(findCuration);

        return new CurationLikeResponseDto(curationId, likeCount);


    }

    public void delete(String userEmail, long curationId) {

        Curation findCuration= curationService.findVerifiedCurationById(curationId);
        Member findMember= memberService.findVerifiedMemberByEmail(userEmail);

        int likeCount=findCuration.getCurationLikeCount(); //findCuration으로 count값을 가져올시 null포인터 익셉션을 던짐

        String findEmail= findCuration.getMember().getEmail();

        Optional<CurationLike> findLike= likeRepository.findByCurationAndMember(findCuration,findMember);


        //좋아요를 누른경우
        if(findLike.isPresent()){
            likeCount--;
            likeRepository.delete(findLike.get());
        }


        findCuration.setCurationLikeCount(likeCount);
        curationService.saveCuration(findCuration);


    }
}
