package com.seb_main_004.whosbook.curation.controller;

import com.seb_main_004.whosbook.curation.dto.CurationImageResponseDto;
import com.seb_main_004.whosbook.curation.dto.CurationPatchDto;
import com.seb_main_004.whosbook.curation.dto.CurationPostDto;
import com.seb_main_004.whosbook.curation.entity.Curation;
import com.seb_main_004.whosbook.curation.entity.CurationImage;
import com.seb_main_004.whosbook.curation.mapper.CurationMapper;
import com.seb_main_004.whosbook.curation.service.CurationImageService;
import com.seb_main_004.whosbook.curation.service.CurationService;
import com.seb_main_004.whosbook.dto.MultiResponseDto;
import com.seb_main_004.whosbook.image.utils.ImageStorageUtils;
import com.seb_main_004.whosbook.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    private final CurationImageService curationImageService;
    private final CurationMapper mapper;
    private final String CURATION_DEFAULT_URL = "/curations";

    public CurationController(CurationService curationService, CurationImageService curationImageService, CurationMapper mapper) {
        this.curationService = curationService;
        this.curationImageService = curationImageService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postCuration(@RequestBody @Valid CurationPostDto postDto){

        Curation savedCuration = curationService.createCuration(mapper.curationPostDtoToCuration(postDto), postDto, getAuthenticatedEmail());
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
        Curation curation = curationService.getCuration(curationId, getAuthenticatedEmail());

        return new ResponseEntity(mapper.curationToCurationSingleDetailResponseDto(curation), HttpStatus.OK);
    }

    @GetMapping("/new")
    public ResponseEntity getNewCurationList(@RequestParam("page") int page,
                                             @RequestParam("size") int size,
                                             @RequestParam(value = "category", required = false) Long categoryId){
        log.info("# NEW 큐레이션 리스트 조회 호출");
        Page<Curation> curationPage = curationService.getNewCurations(page - 1, size, categoryId);
        List<Curation> curations = curationPage.getContent();
        return new ResponseEntity(new MultiResponseDto<>(
                mapper.curationsToCurationListResponseDtos(curations), curationPage),
                HttpStatus.OK);
    }

    @GetMapping("/best")
    public ResponseEntity getBestCurationList(@RequestParam("page") int page,
                                              @RequestParam("size") int size,
                                              @RequestParam(value = "category", required = false) Long categoryId){
        log.info("# BEST 큐레이션 리스트 조회 호출");
        Page<Curation> curationPage = curationService.getBestCurations(page - 1, size, categoryId);
        List<Curation> curations = curationPage.getContent();
        return new ResponseEntity(new MultiResponseDto<>(
                mapper.curationsToCurationListResponseDtos(curations), curationPage),
                HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getCategoryCurationList(@RequestParam("category") long category,
                                                  @RequestParam("page") int page,
                                                  @RequestParam("size") int size){
        Page<Curation> curationPage = curationService.getCategoryCurations(category, page - 1, size);
        List<Curation> curations = curationPage.getContent();
        return new ResponseEntity(new MultiResponseDto<>(
                mapper.curationsToCurationListResponseDtos(curations), curationPage),
                HttpStatus.OK);
    }



    @PostMapping(value = "/images/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity postCurationImage(@RequestPart MultipartFile curationImage) {


        log.info("# 이미지 업로드 요청 확인 이미지 제목 : {}", curationImage.getOriginalFilename());
        log.info("# 이미지 확장자 검증 실행");
        ImageStorageUtils.verifyImageExtension(curationImage);

        CurationImage savedImage = curationImageService.uploadCurationImage(curationImage, getAuthenticatedEmail());

        return new ResponseEntity(new CurationImageResponseDto(savedImage.getCurationImageId(),
                savedImage.getPath()), HttpStatus.OK);
    }

    private String getAuthenticatedEmail(){
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal()
                .toString();
    }
}
