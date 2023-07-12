package com.seb_main_004.whosbook.curation.controller;

import com.seb_main_004.whosbook.curation.dto.CurationImageResponseDto;
import com.seb_main_004.whosbook.curation.dto.CurationPatchDto;
import com.seb_main_004.whosbook.curation.dto.CurationPostDto;
import com.seb_main_004.whosbook.curation.entity.Curation;
import com.seb_main_004.whosbook.curation.mapper.CurationMapper;
import com.seb_main_004.whosbook.curation.service.CurationService;
import com.seb_main_004.whosbook.dto.MultiResponseDto;
import com.seb_main_004.whosbook.image.service.StorageService;
import com.seb_main_004.whosbook.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.MimeType;
import org.springframework.util.MimeTypeUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.spring5.util.SpringContentTypeUtils;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@Slf4j
@Validated
@RequestMapping("/curations")
public class CurationController {
    private final CurationService curationService;
    private final CurationMapper mapper;
    private final StorageService storageService;
    private static final String CURATION_IMAGE_PATH = "curationImages";
    private final String CURATION_DEFAULT_URL = "/curations";

    public CurationController(CurationService curationService, CurationMapper mapper, StorageService storageService) {
        this.curationService = curationService;
        this.mapper = mapper;
        this.storageService = storageService;
    }

    @PostMapping
    public ResponseEntity postCuration(@RequestBody @Valid CurationPostDto postDto){

        Curation savedCuration = curationService.createCuration(mapper.curationPostDtoToCuration(postDto), getAuthenticatedEmail());
        URI uri = UriCreator.createUri(CURATION_DEFAULT_URL, savedCuration.getCurationId());

        return ResponseEntity.created(uri).build();
    }

    @PatchMapping("/{curation-id}")
    public ResponseEntity patchCuration(@RequestBody @Valid CurationPatchDto patchDto,
                                        @PathVariable("curation-id") @Positive long curationId){

        Curation updatedCuration = curationService.updateCuration(patchDto, curationId, getAuthenticatedEmail());
        URI uri = UriCreator.createUri(CURATION_DEFAULT_URL, updatedCuration.getCurationId());

        return ResponseEntity.ok().header("Location", uri.getPath()).build();
    }

    @DeleteMapping("/{curation-id}")
    public ResponseEntity deleteCuration(@PathVariable("curation-id") @Positive long curationId){
        curationService.deleteCuration(curationId, getAuthenticatedEmail());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{curation-id}")
    public ResponseEntity getCuration(@PathVariable("curation-id") @Positive long curationId) {
        log.info("큐레이션 단일 상세조회 요청 확인");
        Curation curation = curationService.getCuration(curationId, getAuthenticatedEmail());

        return new ResponseEntity(mapper.curationToCurationSingleDetailResponseDto(curation), HttpStatus.OK);
    }

    @GetMapping("/new")
    public ResponseEntity getNewCurationList(@RequestParam("page") int page,
                                             @RequestParam("size") int size){
        Page<Curation> curationPage = curationService.getNewCurations(page - 1, size);
        List<Curation> curations = curationPage.getContent();
        return new ResponseEntity(new MultiResponseDto<>(
                mapper.curationsToCurationListResponseDtos(curations), curationPage),
                HttpStatus.OK);
    }

    @PostMapping(value = "/images/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity postCurationImage(@RequestPart MultipartFile curationImage) {


        log.info("이미지 업로드 요청 확인 이미지 제목 : {}", curationImage.getOriginalFilename());

        String imageUrl = storageService.store(curationImage, CURATION_IMAGE_PATH);

        log.info("이미지 업로드 성공!");

        return new ResponseEntity(new CurationImageResponseDto(imageUrl), HttpStatus.OK);
    }

    private String getAuthenticatedEmail(){
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal()
                .toString();
    }
}
