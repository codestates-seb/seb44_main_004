package com.seb_main_004.whosbook.like.controller;

import com.seb_main_004.whosbook.like.dto.CurationLikePostDto;
import com.seb_main_004.whosbook.like.dto.CurationLikeResponseDto;
import com.seb_main_004.whosbook.like.service.CurationLikeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/curations")
@Valid
public class CurationLikeController {

    private final CurationLikeService likeService;


    public CurationLikeController(CurationLikeService likeService) {
        this.likeService = likeService;
    }

    //좋아요
    @PostMapping("{curation-id}/like")
    public ResponseEntity postLike(@Valid @PathVariable("curation-id") long curationId,
                                   Authentication authentication){

        String userEmail= authentication.getPrincipal().toString();

        CurationLikeResponseDto responseDto= likeService.postLike(userEmail,curationId);

       // System.out.println("넘어온 데이터"+responseDto);

        return new ResponseEntity<>(responseDto, HttpStatus.OK);

    }
}
