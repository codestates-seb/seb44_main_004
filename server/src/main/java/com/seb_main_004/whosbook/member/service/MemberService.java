package com.seb_main_004.whosbook.member.service;

import com.seb_main_004.whosbook.auth.utils.CustomAuthorityUtils;
import com.seb_main_004.whosbook.exception.BusinessLogicException;
import com.seb_main_004.whosbook.exception.ExceptionCode;
import com.seb_main_004.whosbook.image.service.StorageService;
import com.seb_main_004.whosbook.member.entity.Member;
import com.seb_main_004.whosbook.member.repository.MemberRepository;
import com.seb_main_004.whosbook.subscribe.entity.Subscribe;
import com.seb_main_004.whosbook.subscribe.repository.SubscribeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;



@Service
@Slf4j
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final SubscribeRepository subscribeRepository;
    private final StorageService storageService;
    private final static String MEMBER_IMAGE_PATH = "memberImages";

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils, SubscribeRepository subscribeRepository, StorageService storageService) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
        this.subscribeRepository = subscribeRepository;
        this.storageService = storageService;
    }

    public Member createMember(Member member, MultipartFile image) {
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

        //프로필 이미지 수정요청이 있을 경우
        if(image.getSize() != 0) {
                String imageKey = storageService.makeObjectKey(image, MEMBER_IMAGE_PATH, member.getMemberId());
                String memberImage = storageService.store(image, imageKey);
                member.setImageKey(imageKey);
                member.setImageUrl(memberImage);
        }

        return memberRepository.save(member);
    }

    //소셜 회원가입
    public Member createGoogleMember02(Member member, MultipartFile image) {
        Optional<Member> optionalMemberEmail = memberRepository.findByEmail(member.getEmail());
        Optional<Member> optionalMemberNickName = memberRepository.findByNickname(member.getNickname());

        //일반 회원가입한 이력이 있는 경우
        if (optionalMemberEmail.isPresent()) {
            Member findMember = optionalMemberEmail.get();
            //소셜회원인 경우 비밀번호는 공란으로 관리
            findMember.setPassword("");

            //일반회원가입 부터 쓰던 닉네임을 그대로 쓰는 경우는 괜찮지만,
            //닉네임을 바꾸고 싶을 때, 바꾸고 싶은 닉네임이 이미 사용중인 닉네임일 경우 처리하는 로직
            if (optionalMemberNickName.isPresent() && optionalMemberNickName.get().getNickname() != findMember.getNickname()) {
                throw new BusinessLogicException(ExceptionCode.NICKNAME_EXISTS);
            }

            if (member.getImageUrl() == null) {
                //후즈북 기본 프로필 이미지를 사용하고 싶은 경우
                if (image.getSize() == 0) {
                    //이전에 쓰던 프로필 이미지가 있다면 S3에서 삭제
                    if(findMember.getImageKey() != null)
                        storageService.delete(findMember.getImageKey());
                    findMember.setImageKey(null);
                    findMember.setImageUrl(null);
                } else {
                    //개인 프로필 이미지를 사용하고 싶은 경우
                    String imageKey = storageService.makeObjectKey(image, MEMBER_IMAGE_PATH, findMember.getMemberId());
                    String memberImage = storageService.store(image, imageKey);
                    findMember.setImageKey(imageKey);
                    findMember.setImageUrl(memberImage);
                }
            }
            //소셜 계정 프로필 이미지를 사용하고 싶은 경우에는 바로 저장
            return memberRepository.save(findMember);
        }

        //일반 회원가입 이력이 없는 경우
        //닉네임 중복 처리
        if (optionalMemberNickName.isPresent())
            throw new BusinessLogicException(ExceptionCode.NICKNAME_EXISTS);

            //DB에 User Role저장
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        if (member.getImageUrl() == null) {
            //후즈북 기본 프로필 이미지를 사용하고 싶은 경우
            if (image.getSize() == 0) {
                member.setImageKey(null);
                member.setImageUrl(null);
            } else {
                //개인 프로필 이미지를 사용하고 싶은 경우
                String imageKey = storageService.makeObjectKey(image, MEMBER_IMAGE_PATH, member.getMemberId());
                String memberImage = storageService.store(image, imageKey);
                member.setImageKey(imageKey);
                member.setImageUrl(memberImage);
            }
        }
        //소셜 계정 프로필 이미지를 사용하고 싶은 경우에는 바로 저장
        return memberRepository.save(member);
    }

    public Member updateMember(Member member, MultipartFile image, String authenticatedEmail) {
        Member findMember = findVerifiedMemberByEmail(authenticatedEmail);
        findMember.setUpdatedAt(LocalDateTime.now());

            //수정할 프로필 이미지가 없을 경우
            if(image.getSize() == 0) {
                String imageKey = findMember.getImageKey();
                findMember.setImageUrl(null);
                findMember.setImageKey(null);
                storageService.delete(imageKey);
            }
            //수정할 프로필 이미지가 있을 경우
            else {
                //기존에 사용하던 프로필 이미지가 있을 경우 S3에서 삭제
                if(findMember.getImageKey() != null)
                    storageService.delete(findMember.getImageKey());

                String imageKey = storageService.makeObjectKey(image, MEMBER_IMAGE_PATH, findMember.getMemberId());
                String memberImage = storageService.store(image, imageKey);
                findMember.setImageKey(imageKey);
                findMember.setImageUrl(memberImage);
            }

        Optional.ofNullable(member.getNickname())
                .ifPresent(nickname->findMember.setNickname(nickname));
        Optional.ofNullable(member.getIntroduction())
                .ifPresent(introduction->findMember.setIntroduction(introduction));

        return memberRepository.save(findMember);
    }

    public Member findVerifiedMemberByEmail(String email){
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if(optionalMember.isEmpty() || optionalMember.get().getMemberStatus()== Member.MemberStatus.MEMBER_DELETE) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
        return optionalMember.get();
    }

    public Member findVerifiedMemberByMemberId(long memberId){
        Optional<Member> optionalMember = memberRepository.findByMemberId(memberId);
        if(optionalMember.isEmpty() || optionalMember.get().getMemberStatus()== Member.MemberStatus.MEMBER_DELETE) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
        return optionalMember.get();
    }

    //멤버도메인 우선 리팩토링 로직
    //쿼리문 개선으로 페이징 처리된 멤버리스트를 가져오도록 리팩토링 해야함
    public Page<Member> findMyMembers(int page, int size, String authenticatedEmail) {
        List<Subscribe> subscribes = subscribeRepository.findBySubscriber(findVerifiedMemberByEmail(authenticatedEmail));
        List<Member> subscribingMembers = new ArrayList<>();

        for(Subscribe subscribe : subscribes) {
            Member subscribingMember = subscribe.getSubscribedMember();
            subscribingMembers.add(subscribingMember);
        }

        int offset = page * size;
        int toIndex = Math.min(offset+size, subscribingMembers.size());
        List<Member> pageContent = subscribingMembers.subList(offset, toIndex);

        return new PageImpl<>(pageContent, PageRequest.of(page, size), subscribingMembers.size());
    }

    public Page<Member> findBestCurators(int page, int size) {
        return memberRepository.findBestCurators(PageRequest.of(page, size));
    }

    public boolean findIsSubscribed(String authenticatedEmail, Member otherMember) {
        Optional<Subscribe> optionalSubscribe = subscribeRepository.findBySubscriberAndSubscribedMember(findVerifiedMemberByEmail(authenticatedEmail), otherMember);
        if(optionalSubscribe.isPresent()) return true;

        return false;
    }

    public void deleteMember(String authenticatedEmail) {
        Member member = findVerifiedMemberByEmail(authenticatedEmail);

        if(member.getMemberStatus()==Member.MemberStatus.MEMBER_DELETE)
            throw new BusinessLogicException(ExceptionCode.MEMBER_HAS_BEEN_DELETED);

        //회원 프로필 이미지가 있을 경우
        if(member.getImageUrl() != null) {
            storageService.delete(member.getImageKey());
            member.setImageUrl(null);
            member.setImageKey(null);
        }
        member.setMemberStatus(Member.MemberStatus.MEMBER_DELETE);

        memberRepository.save(member);
        }
}




