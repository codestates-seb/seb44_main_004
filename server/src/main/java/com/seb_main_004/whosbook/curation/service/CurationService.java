package com.seb_main_004.whosbook.curation.service;

import com.seb_main_004.whosbook.curation.dto.CurationPatchDto;
import com.seb_main_004.whosbook.curation.entity.Curation;
import com.seb_main_004.whosbook.curation.repository.CurationRepository;
import com.seb_main_004.whosbook.exception.BusinessLogicException;
import com.seb_main_004.whosbook.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CurationService {
    private final CurationRepository curationRepository;

    public Curation createCuration(Curation curation){
        //TODO : 로그인한 회원의 memberId를 curation에 주입 필요
        return curationRepository.save(curation);
    }

    public Curation updateCuration(CurationPatchDto patchDto, long curationId){
        //TODO : 로그인한 회원과 작성자의 memberId가 일치하는지 확인 로직 필요

        Curation findCuration = findVerifiedCurationById(curationId);

        if(findCuration.getCurationStatus() == Curation.CurationStatus.CURATION_DELETE) {
            throw new BusinessLogicException(ExceptionCode.CURATION_HAS_BEEN_DELETED);
        }

        Optional.ofNullable(patchDto.getEmoji())
                .ifPresent(emoji -> findCuration.setEmoji(emoji));
        Optional.ofNullable(patchDto.getTitle())
                .ifPresent(title -> findCuration.setTitle(title));
        Optional.ofNullable(patchDto.getContent())
                .ifPresent(content -> findCuration.setContent(content));

        findCuration.setVisibility(patchDto.getVisibility());
        findCuration.setUpdatedAt(LocalDateTime.now());

        return curationRepository.save(findCuration);
    }

    public Curation findVerifiedCurationById(long curationId) {
        Optional<Curation> optionalCuration = curationRepository.findById(curationId);
        return optionalCuration.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.CURATION_NOT_FOUND)
        );
    }
}
