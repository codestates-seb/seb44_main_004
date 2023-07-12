package com.seb_main_004.whosbook.curation.service;

import com.seb_main_004.whosbook.curation.dto.CurationPatchDto;
import com.seb_main_004.whosbook.curation.entity.Curation;
import com.seb_main_004.whosbook.curation.repository.CurationRepository;
import com.seb_main_004.whosbook.exception.BusinessLogicException;
import com.seb_main_004.whosbook.exception.ExceptionCode;
import com.seb_main_004.whosbook.member.entity.Member;
import com.seb_main_004.whosbook.member.repository.MemberRepository;
import com.seb_main_004.whosbook.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CurationService {
    // 추후 리팩토링 : 1. 삭제된 큐레이션을 검증하는 부분을 AOP로 뺄 순 없을까?
    private final CurationRepository curationRepository;
    private final MemberService memberService;

    public Curation createCuration(Curation curation, String authenticatedEmail){
        //TODO: 추후 MemberService 에서 검증된 멤버를 리턴하는 메소드 필요

        curation.setMember(
                memberService.findVerifiedMemberByEmail(authenticatedEmail));

        return curationRepository.save(curation);
    }

    public Curation updateCuration(CurationPatchDto patchDto, long curationId, String authenticatedEmail){

        Curation findCuration = findVerifiedCurationById(curationId);

        checkCurationIsDeleted(findCuration);

        if(findCuration.getMember().getEmail()
                .equals(authenticatedEmail) == false) {
            throw new BusinessLogicException(ExceptionCode.CURATION_CANNOT_CHANGE);
        }

        findCuration.updateCurationData(patchDto);

        return curationRepository.save(findCuration);
    }

    public void deleteCuration(long curationId, String authenticatedEmail){
        Curation curation = findVerifiedCurationById(curationId);

        if (curation.getMember().getEmail().equals(authenticatedEmail) == false){
            throw new BusinessLogicException(ExceptionCode.CURATION_CANNOT_DELETE);
        }

        // 이미 삭제된 큐레이션을 또 삭제하려는 요청에 대한 에러처리
        checkCurationIsDeleted(curation);

        curation.setCurationStatus(Curation.CurationStatus.CURATION_DELETE);
        curationRepository.save(curation);
    }

    public Curation getCuration(long curationId, String authenticatedEmail) {
        // 로그인한 사용자가 해당 큐레이션의 작성자를 구독하는지에 대한 여부를 알려주는 로직 추가 필요
        // Curation 엔티티에 데이터에 저장되지 않는 상태 필드 isSubscribed 추가 -> 비지니스 로직 -> 맵핑에 전달

        Curation curation = findVerifiedCurationById(curationId);
        checkCurationIsDeleted(curation);

        if (curation.getVisibility() == Curation.Visibility.SECRET) {
            if ((curation.getMember().getEmail().equals(authenticatedEmail)) == false)
                throw new BusinessLogicException(ExceptionCode.CURATION_ACCESS_DENIED);
        }

        return curation;
    }

    public Page<Curation> getNewCurations(int page, int size){
        // 추후 리팩토링 필요
        return curationRepository.findByCurationStatusAndVisibility(
                Curation.CurationStatus.CURATION_ACTIVE,
                Curation.Visibility.PUBLIC,
                PageRequest.of(page, size, Sort.by("curationId").descending()));
    }

    public Curation findVerifiedCurationById(long curationId) {
        Optional<Curation> optionalCuration = curationRepository.findById(curationId);
        return optionalCuration.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.CURATION_NOT_FOUND)
        );
    }

    public void checkCurationIsDeleted(Curation curation){
        if (curation.isDeleted()) throw new BusinessLogicException(ExceptionCode.CURATION_HAS_BEEN_DELETED);
    }

    @Transactional
    public Curation saveCuration(Curation curation) {

        return curationRepository.save(curation);
    }
}
