package com.seb_main_004.whosbook.auth.filter;

import com.seb_main_004.whosbook.auth.jwt.JwtTokenizer;
import com.seb_main_004.whosbook.auth.utils.CustomAuthorityUtils;
import com.seb_main_004.whosbook.exception.BusinessLogicException;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import io.jsonwebtoken.security.SignatureException;
import java.util.List;
import java.util.Map;

public class JwtVerificationFilter extends OncePerRequestFilter {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        } catch (SignatureException se) { //시크릿 키가 안맞았을때
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) { //토큰 만료에 대한 익셉션
            request.setAttribute("exception", ee);

        }catch (BusinessLogicException be) { //탈퇴한 회원이 다시 로그인했을경우
            request.setAttribute("exception",be);
        }
        catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request,response);
    }




    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws  ServletException{

        String authorization= request.getHeader("Authorization");
        return authorization==null || !authorization.startsWith("Bearer");
    }

    private Map<String, Object> verifyJws(HttpServletRequest request) {

        String jws= request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey= jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        Map<String,Object> claims= jwtTokenizer.getClaims(jws,base64EncodedSecretKey).getBody();

        return claims;
    }

    private void setAuthenticationToContext(Map<String, Object> claims) {

        String username= (String) claims.get("username");
        List<GrantedAuthority> authorities= authorityUtils.createAuthorities((List)claims.get("roles"));
        Authentication authentication= new UsernamePasswordAuthenticationToken(username,null,authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);

    }





}
