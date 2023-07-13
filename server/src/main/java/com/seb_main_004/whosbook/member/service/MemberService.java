package com.seb_main_004.whosbook.member.service;

import com.seb_main_004.whosbook.auth.utils.CustomAuthorityUtils;
import com.seb_main_004.whosbook.curation.entity.Curation;
import com.seb_main_004.whosbook.exception.BusinessLogicException;
import com.seb_main_004.whosbook.exception.ExceptionCode;
import com.seb_main_004.whosbook.member.entity.Member;
import com.seb_main_004.whosbook.member.repository.MemberRepository;
import com.seb_main_004.whosbook.subscribe.entity.Subscribe;
import com.seb_main_004.whosbook.subscribe.repository.SubscribeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final SubscribeRepository subscribeRepository;



    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils, SubscribeRepository subscribeRepository) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
        this.subscribeRepository = subscribeRepository;
    }

    public Member createMember(Member member) {
        Optional<Member> optionalMemberEmail = memberRepository.findByEmail(member.getEmail());
        Optional<Member> optionalMemberNickName = memberRepository.findByNickname(member.getNickname());

        if(optionalMemberEmail.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);

        if(optionalMemberNickName.isPresent())
            throw new BusinessLogicException(ExceptionCode.NICKNAME_EXISTS);
        //password 암호화
        String encryptedPassword= passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        //DB에 User Role저장
        List<String> roles= authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        return memberRepository.save(member);
    }

    public Member updateMember(Member member, String authenticatedEmail) {
        Member findMember = findVerifiedMemberByEmail(authenticatedEmail);

        Optional.ofNullable(member.getNickname())
                .ifPresent(nickname->findMember.setNickname(nickname));
        Optional.ofNullable(member.getIntroduction())
                .ifPresent(introduction->findMember.setIntroduction(introduction));

        findMember.setUpdatedAt(LocalDateTime.now());

        return memberRepository.save(findMember);
    }

    public Member findMember(String authenticatedEmail) {
        Member findMember = findVerifiedMemberByEmail(authenticatedEmail);

        return findMember;
    }

    public Page<Member> findMembers(int page, int size, String authenticatedEmail) {
        List<Subscribe> subscribes = subscribeRepository.findBySubscriber(findVerifiedMemberByEmail(authenticatedEmail));
        List<Member> subscribingMembers = new ArrayList<>();

        for(Subscribe subscribe : subscribes) {
            // 구독취소 상태이면 저장하지 않는다.
            if(subscribe.getSubscribeStatus()== Subscribe.SubscribeStatus.SUBSCRIBE_NON_ACTIVE) continue;

            Member subscribingMember = subscribe.getSubscribedMember();
            subscribingMembers.add(subscribingMember);
        }

        int offset = page * size;
        int toIndex = Math.min(offset+size, subscribingMembers.size());
        List<Member> pageContent = subscribingMembers.subList(offset, toIndex);

        return new PageImpl<>(pageContent, PageRequest.of(page, size), subscribingMembers.size());
    }

    public void deleteMember(String authenticatedEmail) {
        Member member = findVerifiedMemberByEmail(authenticatedEmail);

        if(member.getMemberStatus()==Member.MemberStatus.MEMBER_DELETE)
            throw new BusinessLogicException(ExceptionCode.MEMBER_HAS_BEEN_DELETED);

        member.setMemberStatus(Member.MemberStatus.MEMBER_DELETE);

        memberRepository.save(member);
        }

    public Member findVerifiedMemberByEmail(String email){
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        return optionalMember.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND)
        );
    }

    //구글 소셜 회원가입
    public Member createGoogleMember(Member member) {

        Member findMember = findVerifiedMemberByEmail(member.getEmail());

        findMember.setPassword(findMember.getPassword());


        List<String> roles= authorityUtils.createRoles(findMember.getEmail());
        findMember.setRoles(roles);

        findMember=memberRepository.save(findMember);

        return findMember;
    }
    }

