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
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CurationService {
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

        if(findCuration.getCurationStatus() == Curation.CurationStatus.CURATION_DELETE) {
            throw new BusinessLogicException(ExceptionCode.CURATION_HAS_BEEN_DELETED);
        }

        if(findCuration.getMember().getEmail()
                .equals(authenticatedEmail) == false) {
            throw new BusinessLogicException(ExceptionCode.CURATION_CANNOT_CHANGE);
        }

        findCuration.updateCurationData(patchDto);

        return curationRepository.save(findCuration);
    }

    public void deleteCuration(long curationId, String authenticatedEmail){
        Curation findCuration = findVerifiedCurationById(curationId);
        if (findCuration.getMember().getEmail().equals(authenticatedEmail) == false){
            throw new BusinessLogicException(ExceptionCode.CURATION_CANNOT_DELETE);
        }
        findCuration.setCurationStatus(Curation.CurationStatus.CURATION_DELETE);
    }

    public Curation findVerifiedCurationById(long curationId) {
        Optional<Curation> optionalCuration = curationRepository.findById(curationId);
        return optionalCuration.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.CURATION_NOT_FOUND)
        );
    }
}
