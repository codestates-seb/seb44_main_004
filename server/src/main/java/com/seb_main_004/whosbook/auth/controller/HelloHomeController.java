package com.seb_main_004.whosbook.auth.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

//Oauth테스트를 위한 임시 컨트롤러
//@Controller
public class HelloHomeController {

    @GetMapping("/oauth2/google")
    public String home(){
//        var oAuth2User = (OAuth2User) SecurityContextHolder.getContext().getAuthentication().getPrincipal(); // (1)
//        System.out.println(oAuth2User.getAttributes().get("email"));   // (2)
        return "hello-oauth2";
    }
}
