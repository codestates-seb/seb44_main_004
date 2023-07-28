package com.seb_main_004.whosbook.advice;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ErrorSlackConnectTestController {
    @GetMapping("/error")
    public ResponseEntity error() throws Exception {
        throw new Exception("슬랙 연동하여 에러를 던지는 것을 테스트 합니다.");
    }
}
