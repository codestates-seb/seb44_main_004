package com.seb_main_004.whosbook.member.service;

import com.seb_main_004.whosbook.auth.utils.CustomAuthorityUtils;
import com.seb_main_004.whosbook.member.entity.Member;
import com.seb_main_004.whosbook.member.repository.MemberRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    private final CustomAuthorityUtils authorityUtils;


    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }

    public Member createMember(Member member) {
        Optional<Member> optionalMember = memberRepository.findByEmail(member.getEmail());

        //password 암호화
        String encryptedPassword= passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        //DB에 User Role저장
        List<String> roles= authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        if(optionalMember.isPresent())
            throw new ResponseStatusException(HttpStatus.CONFLICT); // 추후 비즈니스로직으로 수정필요

        return memberRepository.save(member);

    }


}
