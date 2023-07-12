package com.seb_main_004.whosbook.subscribe.controller;

import com.seb_main_004.whosbook.subscribe.entity.Subscribe;
import com.seb_main_004.whosbook.subscribe.service.SubscribeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/subscribes")
@Slf4j
public class SubscribeController {
    private final SubscribeService subscribeService;

    public SubscribeController(SubscribeService subscribeService) {
        this.subscribeService = subscribeService;
    }

    @PostMapping("/{member-id}")
    public ResponseEntity postSubscribe(@Valid @PathVariable("member-id") long subscribedMemberId) {

        subscribeService.createSubscribe(subscribedMemberId, getAuthenticatedEmail());
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteSubscribe(@Valid @PathVariable("member-id") long subscribedMemberId) {

        subscribeService.deleteSubscribe(subscribedMemberId, getAuthenticatedEmail());
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    private String getAuthenticatedEmail(){
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal()
                .toString();
    }
}
