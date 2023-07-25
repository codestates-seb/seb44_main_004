package com.seb_main_004.whosbook.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.seb_main_004.whosbook.auth.dto.LoginDto;
import com.seb_main_004.whosbook.auth.dto.LoginResponseDto;
import com.seb_main_004.whosbook.auth.jwt.JwtTokenizer;
import com.seb_main_004.whosbook.exception.BusinessLogicException;
import com.seb_main_004.whosbook.exception.ExceptionCode;
import com.seb_main_004.whosbook.member.entity.Member;
import com.seb_main_004.whosbook.member.service.MemberService;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtAuthenticationFilter  extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    private final JwtTokenizer jwtTokenizer;

    private final MemberService memberService;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenizer jwtTokenizer, MemberService memberService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenizer = jwtTokenizer;
        this.memberService = memberService;
    }

    //인증을 시도하는 메서드
    @SneakyThrows
    @Override
    public Authentication attemptAuthentication (HttpServletRequest request, HttpServletResponse response){

        ObjectMapper objectMapper= new ObjectMapper(); //dto클래스로 역직렬화
        LoginDto loginDto= objectMapper.readValue(request.getInputStream(), LoginDto.class);

        UsernamePasswordAuthenticationToken authenticationToken=
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);

    }
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws ServletException, IOException {
        Member member = (Member) authResult.getPrincipal();

        // member 이메일로 if(멤버 스테이터스가 delete) 예외발생

        Member verifiedMemberByEmail = memberService.findVerifiedMemberByEmail(member.getEmail());

        //member에서 탈퇴한회원인지 여부 검증
//        if(member.getMemberStatus().getStatus()==Member.MemberStatus.MEMBER_DELETE){
//            throw  new BusinessLogicException(ExceptionCode. MEMBER_HAS_BEEN_DELETED);
//        }


        String accessToken = delegateAccessToken(member);
        String refreshToken = delegateRefreshToken(member);

        //바디에 토큰을 담는 부분
        Gson gson= new Gson();


        LoginResponseDto responseDto= new LoginResponseDto(member.getMemberId(),member.getNickname(), member.getImageUrl());

        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json;  charset=UTF-8 ");

        response.getWriter().write(gson.toJson(responseDto));

        response.setStatus(200);

        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }

    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());
        claims.put("memberId", member.getMemberId());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

}
