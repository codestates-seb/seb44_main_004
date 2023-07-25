package com.seb_main_004.whosbook.config;


import com.seb_main_004.whosbook.auth.Oauth.handler.OAuth2MemberSuccessHandler;
import com.seb_main_004.whosbook.auth.filter.JwtAuthenticationFilter;
import com.seb_main_004.whosbook.auth.filter.JwtVerificationFilter;
import com.seb_main_004.whosbook.auth.handler.*;
import com.seb_main_004.whosbook.auth.jwt.JwtTokenizer;
import com.seb_main_004.whosbook.auth.utils.CustomAuthorityUtils;
import com.seb_main_004.whosbook.member.repository.MemberRepository;
import com.seb_main_004.whosbook.member.service.MemberService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.oauth2.client.CommonOAuth2Provider;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfiguration {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    private final MemberService memberService;

    private final MemberRepository memberRepository;

    @Value("${spring.security.oauth2.client.registration.google.clientId}")  // (1)
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.clientSecret}") // (2)
    private String clientSecret;


    public SecurityConfiguration(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils, MemberService memberService, MemberRepository memberRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.memberService = memberService;
        this.memberRepository = memberRepository;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http

                .csrf().disable()
                .cors(withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)//세션을 생성하지 않도록 설정
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize

                        .antMatchers(HttpMethod.POST, "/category/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/category/**").hasAnyRole("USER", "ADMIN")

                        .antMatchers(HttpMethod.POST, "/curations/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.PATCH, "/curations/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/curations/**").hasAnyRole("USER", "ADMIN")

                        .antMatchers(HttpMethod.GET, "/members/mypage/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.PATCH, "/members/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/members/**").hasAnyRole("USER", "ADMIN")

                        .antMatchers(HttpMethod.POST, "/subscribes/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/subscribes/**").hasAnyRole("USER", "ADMIN")

                        .anyRequest().permitAll()
        )
                .oauth2Login(oauth2-> oauth2.successHandler(new OAuth2MemberSuccessHandler(jwtTokenizer,authorityUtils,memberService, memberRepository)));
        return http.build();
    }

    // 순환참조에러발생 나므로 static 으로 변경
    @Bean
    public static PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }


    // (8)
//    @Bean
//    CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList("*", "http://localhost:5173",
//                "ec2-54-180-18-106.ap-northeast-2.compute.amazonaws.com:8080",
//                "whosebook-client.s3-website.ap-northeast-2.amazonaws.com/",
//                "https://c68b-222-110-54-74.ngrok-free.app/oauth2/authorization/google"));
//        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE", "OPTIONS"));
//        configuration.setAllowedHeaders(Arrays.asList("*"));
//        configuration.addExposedHeader("Authorization");
//        configuration.addExposedHeader("Refresh");
//        configuration.addExposedHeader("Location");
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//
//
//        return source;
//    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*")); // 클라이언트에서 요청할 때 허용할 요청 헤더 설정
        configuration.setExposedHeaders(Arrays.asList("*")); // 클라이언트로 노출할 응답 헤더 설정

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/login");

            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter= new JwtVerificationFilter(jwtTokenizer,authorityUtils);

            // JWT 토큰 검증 필터 생성 및 필터 순서 설정 : 인증(일반로그인 or 소셜로그인) 필터 다음에 적용
            builder.addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
            builder.addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
        }


    }
}