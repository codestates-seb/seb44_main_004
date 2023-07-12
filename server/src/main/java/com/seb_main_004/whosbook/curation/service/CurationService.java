package com.seb_main_004.whosbook.curation.service;

import com.seb_main_004.whosbook.curation.dto.CurationPatchDto;
import com.seb_main_004.whosbook.curation.entity.Curation;
import com.seb_main_004.whosbook.curation.entity.CurationImage;
import com.seb_main_004.whosbook.curation.repository.CurationImageRepository;
import com.seb_main_004.whosbook.curation.repository.CurationRepository;
import com.seb_main_004.whosbook.exception.BusinessLogicException;
import com.seb_main_004.whosbook.exception.ExceptionCode;
import com.seb_main_004.whosbook.image.service.StorageService;
import com.seb_main_004.whosbook.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CurationService {
    // 추후 리팩토링 : 1. 삭제된 큐레이션을 검증하는 부분을 AOP로 뺄 순 없을까?
    //             : 2. 큐레이션 이미지 등록 로직을 어떻게 분리하고 구성해야 더 효율적일까?

    private final CurationRepository curationRepository;
    private final MemberService memberService;
    private final StorageService storageService;
    private final CurationImageRepository curationImageRepository;
    private final static String CURATION_IMAGE_PATH = "curationImages";

    public Curation createCuration(Curation curation, String authenticatedEmail){

        // 큐레이션 이미지 맵핑
        curation.getCurationImages().stream()
                .map(image -> {
                    CurationImage curationImage = curationImageRepository
                            .findById(image.getCurationImageId()).orElseThrow(() -> new BusinessLogicException(ExceptionCode.IMAGE_NOT_FOUND));
                    curationImage.setUsed(true);
                    curationImage.setCuration(curation);
                    return curationImage;
                })
                .collect(Collectors.toList());

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

    // 이미지 등록
    @Transactional
    public CurationImage uploadCurationImage(MultipartFile image){


        String key = storageService.makeObjectKey(image, CURATION_IMAGE_PATH);
        String imagePath = storageService.store(image, CURATION_IMAGE_PATH);

        CurationImage curationImage = new CurationImage();
        curationImage.setImageKey(key);
        curationImage.setPath(imagePath);

        return curationImageRepository.save(curationImage);
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
}
