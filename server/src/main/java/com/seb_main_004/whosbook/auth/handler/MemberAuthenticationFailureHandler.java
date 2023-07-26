package com.seb_main_004.whosbook.auth.handler;

import com.google.gson.Gson;
import com.seb_main_004.whosbook.exception.ExceptionCode;
import com.seb_main_004.whosbook.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class MemberAuthenticationFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        // 인증 실패 시, 에러 로그를 기록하거나 error response를 전송할 수 있다.
        log.error("# Authentication failed: {}", exception.getMessage());

        log.error("# password failed:{}", ExceptionCode.MEMBER_NOT_FOUND);


        sendErrorResponse(response, exception);
    }
    private void sendErrorResponse(HttpServletResponse response,AuthenticationException exception) throws IOException {
        Gson gson = new Gson();
       // ErrorResponse errorResponse = ErrorResponse.of(ExceptionCode.MEMBER_NOT_FOUND);

        ErrorResponse errorResponse;

        if(exception.getMessage().contains("탈퇴한")){
            errorResponse = ErrorResponse.of(ExceptionCode.MEMBER_HAS_BEEN_DELETED);
        } else {
            errorResponse = ErrorResponse.of(ExceptionCode.MEMBER_NOT_FOUND);
        }

        response.setCharacterEncoding("UTF-8");
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }

}
