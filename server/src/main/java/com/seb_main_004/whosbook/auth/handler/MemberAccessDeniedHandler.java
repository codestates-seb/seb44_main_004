package com.seb_main_004.whosbook.auth.handler;

import com.seb_main_004.whosbook.auth.utils.ErrorResponder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

//요청 리소스에 대한 적절한권한이없으면 호출되는 핸들러메소드가 포함된 클래스
@Slf4j
@Component
public class MemberAccessDeniedHandler  implements AccessDeniedHandler {

    //적절한 권한인지 확인하는 과정에서 AccessDeniedException이 발생하면 ErrorResponse를 생성해서 클라이언트에게 전송
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        ErrorResponder.sendErrorResponse(response, HttpStatus.FORBIDDEN);
        log.warn("Forbidden error happened: {}", accessDeniedException.getMessage());
    }
}
