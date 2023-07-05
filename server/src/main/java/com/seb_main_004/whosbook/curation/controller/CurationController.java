package com.seb_main_004.whosbook.curation.controller;

import com.seb_main_004.whosbook.curation.dto.CurationPostDto;
import com.seb_main_004.whosbook.curation.entity.Curation;
import com.seb_main_004.whosbook.curation.mapper.CurationMapper;
import com.seb_main_004.whosbook.curation.service.CurationService;
import com.seb_main_004.whosbook.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@RestController
@Slf4j
@Validated
@RequestMapping("/curations")

public class CurationController {
    private final CurationService curationService;
    private final CurationMapper mapper;
    private final String CURATION_DEFAULT_URL = "/curations";

    public CurationController(CurationService curationService, CurationMapper mapper) {
        this.curationService = curationService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postCuration(@RequestBody @Valid CurationPostDto postDto){
        Curation savedCuration = curationService.createCuration(mapper.curationPostDtoToCuration(postDto));
        URI uri = UriCreator.createUri(CURATION_DEFAULT_URL, savedCuration.getCurationId());
        return ResponseEntity.created(uri).build();
    }
}
