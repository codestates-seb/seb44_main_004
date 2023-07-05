package com.seb_main_004.whosbook.member.service;

import com.seb_main_004.whosbook.member.entity.Member;
import com.seb_main_004.whosbook.member.repository.MemberRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Member createMember(Member member) {
        Optional<Member> optionalMember = memberRepository.findByEmail(member.getEmail());

        if(optionalMember.isPresent())
            throw new ResponseStatusException(HttpStatus.CONFLICT); // 추후 비즈니스로직으로 수정필요

        return memberRepository.save(member);

    }


}
