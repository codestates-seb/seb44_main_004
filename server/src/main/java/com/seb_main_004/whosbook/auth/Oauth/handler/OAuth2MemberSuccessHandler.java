package com.seb_main_004.whosbook.auth.Oauth.handler;

import com.google.gson.Gson;
import com.seb_main_004.whosbook.auth.dto.LoginResponseDto;
import com.seb_main_004.whosbook.auth.jwt.JwtTokenizer;
import com.seb_main_004.whosbook.auth.utils.CustomAuthorityUtils;
import com.seb_main_004.whosbook.member.entity.Member;
import com.seb_main_004.whosbook.member.service.MemberService;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberService memberService;

    public OAuth2MemberSuccessHandler(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils, MemberService memberService) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.memberService = memberService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        var oAuth2User = (OAuth2User)authentication.getPrincipal();
        String email = String.valueOf(oAuth2User.getAttributes().get("email")); // Authentication 객체로부터 얻어낸 oauth 객채로부터 Resource Owner의 메일주소를 얻음
        String nickname = String.valueOf(oAuth2User.getAttributes().get("given_name"));
        List<String> authorities = authorityUtils.createRoles(email);           // 권한 정보 생성
        String imgURL = String.valueOf(oAuth2User.getAttributes().get("picture"));

       // googleSavedMember(email,nickname,imgURL);//리소소오너의 이메일주소를 db에 저장
        //바디에 토큰을 담는 부분

        redirect(request, response, email, authorities);  //액세스토큰, 리프레시 토큰을 생성후 프론트에 전달하기 위해 리다이렉트

        Gson gson= new Gson();

        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json;  charset=UTF-8 ");

        response.getWriter().write(gson.toJson(email));
        response.getWriter().write(gson.toJson(nickname));
        response.getWriter().write(gson.toJson(imgURL));

        System.out.println(email);
        System.out.println(nickname);
        System.out.println(imgURL);


    }

    //DB에 해당하는 사용자 정보 저장
//    private void googleSavedMember(String userEmail, String nickname, String imgURL){
//        Member member = new Member(userEmail, nickname, imgURL);
//        memberService.createGoogleMember(member);
//    }

    private void saveMember(String email){
        Member member= new Member();

        memberService.createMember(member);
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, String username, List<String> authorities) throws IOException {
        String accessToken = delegateAccessToken(username, authorities);
        String refreshToken = delegateRefreshToken(username);

        String uri = createURI(accessToken, refreshToken).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private String delegateAccessToken(String username, List<String> authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);
        claims.put("roles", authorities);

        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(String username) {
        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    private URI createURI(String accessToken, String refreshToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost")
                .port(5173)
                .queryParams(queryParams)
                .build()
                .toUri();
    }


}
