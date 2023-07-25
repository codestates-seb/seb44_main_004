package com.seb_main_004.whosbook.auth.utils;

import com.google.gson.Gson;
import com.seb_main_004.whosbook.exception.ExceptionCode;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import com.seb_main_004.whosbook.response.ErrorResponse;

// 인증 과정에서 AuthenticationException 이 발생하면 ErrorResponse 를 출력 스트림으로 생성해주는 클래스
public class ErrorResponder {
    public static void sendErrorResponse(HttpServletResponse response, HttpStatus status) throws IOException {
        Gson gson = new Gson();
        ErrorResponse errorResponse = ErrorResponse.of(status);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(status.value());
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }

    public static void sendErrorResponseWithCode(HttpServletResponse response, ExceptionCode exceptionCode) throws IOException {
        Gson gson = new Gson();
        ErrorResponse errorResponse = ErrorResponse.of(exceptionCode);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        response.setStatus(exceptionCode.getStatus());
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }
}