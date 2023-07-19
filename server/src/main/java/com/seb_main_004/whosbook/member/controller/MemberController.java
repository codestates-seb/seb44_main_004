package com.seb_main_004.whosbook.member.controller;

import com.seb_main_004.whosbook.curation.entity.Curation;
import com.seb_main_004.whosbook.curation.mapper.CurationMapper;
import com.seb_main_004.whosbook.curation.service.CurationService;
import com.seb_main_004.whosbook.exception.BusinessLogicException;
import com.seb_main_004.whosbook.exception.ExceptionCode;
import com.seb_main_004.whosbook.member.dto.MemberPatchDto;
import com.seb_main_004.whosbook.member.dto.MemberPostDto;
import com.seb_main_004.whosbook.dto.MultiResponseDto;
import com.seb_main_004.whosbook.member.dto.SocialMemberPostDto;
import com.seb_main_004.whosbook.member.entity.Member;
import com.seb_main_004.whosbook.member.mapper.MemberMapperClass;
import com.seb_main_004.whosbook.member.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/members")
@Validated
@Slf4j
public class MemberController {
    private final MemberService memberService;
    private final MemberMapperClass memberMapperClass;
    private final CurationService curationService;
    private final CurationMapper curationMapper;

    public MemberController(MemberService memberService, MemberMapperClass memberMapperClass,
                            CurationService curationService, CurationMapper curationMapper) {
        this.memberService = memberService;
        this.memberMapperClass = memberMapperClass;
        this.curationService = curationService;
        this.curationMapper = curationMapper;
    }

    //일반 회원가입
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity postMember(@Valid @RequestPart MemberPostDto memberPostDto,
                                     @RequestPart MultipartFile memberImage) {
        Member member = memberService.createMember(memberMapperClass.memberPostDtoToMember(memberPostDto), memberImage);

        return new ResponseEntity(memberMapperClass.memberToMemberResponseDto(member), HttpStatus.OK);
    }

    //소셜 회원가입
    @PostMapping(value = "/social", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity postSocialMember(@Valid @RequestPart SocialMemberPostDto memberPostDto,
                                           @RequestPart MultipartFile memberImage) {
        Member member = memberService.createGoogleMember02(memberMapperClass.socialMemberPostDtoToMember(memberPostDto), memberImage);

        return new ResponseEntity(memberMapperClass.memberToMemberResponseDto(member), HttpStatus.OK);
    }

    @PatchMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity patchMember(@Valid @RequestPart MemberPatchDto memberPatchDto,
                                      @RequestPart MultipartFile memberImage) {
        boolean imageChange = memberPatchDto.isImageChange();
        Member member = memberMapperClass.memberPatchDtoToMember(memberPatchDto);
        Member response = memberService.updateMember(member, imageChange, memberImage, getAuthenticatedEmail());

        return new ResponseEntity(memberMapperClass.memberToMemberResponseDto(response), HttpStatus.OK);
    }

    //마이페이지 조회
    @GetMapping
    public ResponseEntity getMyPage(Authentication authentication) {
        if(authentication == null){
            log.info("토큰이 없다!!");
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
        log.info("토큰이 있다!!");
        String userEmail = authentication.getPrincipal().toString();
        log.info("토큰이 있다!!"+userEmail);
        Member findMember = memberService.findVerifiedMemberByEmail(userEmail);

        return new ResponseEntity(memberMapperClass.memberToMemberResponseDto(findMember), HttpStatus.OK);
    }

    //타 유저 마이페이지 조회
    @GetMapping("/{member-id}")
    public ResponseEntity getOtherMemberPage(@Valid @PathVariable("member-id") long otherMemberId) {
        Member otherMember = memberService.findVerifiedMemberByMemberId(otherMemberId);

        //비회원이 조회할 때
        if(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString().equals("anonymousUser")) {
            return new ResponseEntity(memberMapperClass.memberToOtherMemberResponseDto(otherMember, false), HttpStatus.OK);
        }
        //회원이 조회할 때
        boolean isSubscribed = memberService.findIsSubscribed(getAuthenticatedEmail(), otherMember);
        return new ResponseEntity(memberMapperClass.memberToOtherMemberResponseDto(otherMember, isSubscribed),
                HttpStatus.OK);
    }

    //내가 작성한 큐레이션 리스트 조회
    @GetMapping("/curations")
    public ResponseEntity getMyCurations(@Positive @RequestParam("page") int page,
                                          @Positive @RequestParam("size") int size) {
        Member member = memberService.findVerifiedMemberByEmail(getAuthenticatedEmail());
        Page<Curation> curationPage = curationService.getMyCurations(page-1, size, member);
        List<Curation> curations = curationPage.getContent();

        return new ResponseEntity(new MultiResponseDto<>(
                curationMapper.curationsToCurationMultiListResponseDtos(curations), curationPage),
                HttpStatus.OK);
    }

    //타 유저가 작성한 큐레이션 리스트 조회
    @GetMapping("/curations/{member-id}")
    public ResponseEntity getMyCurations(@Valid @PathVariable("member-id") long otherMemberId,
                                         @Positive @RequestParam("page") int page,
                                         @Positive @RequestParam("size") int size) {
        Member member = memberService.findVerifiedMemberByMemberId(otherMemberId);
        Page<Curation> curationPage = curationService.getOtherMemberCurations(page-1, size, member);
        List<Curation> curations = curationPage.getContent();

        return new ResponseEntity(new MultiResponseDto<>(
                curationMapper.curationsToCurationMultiListResponseDtos(curations), curationPage),
                HttpStatus.OK);
    }

    //내가 구독한 큐레이터 리스트 조회
    @GetMapping("/subscribe")
    public ResponseEntity getMyMembers(@Positive @RequestParam("page") int page,
                                       @Positive @RequestParam("size") int size) {
        Page<Member> pageMember = memberService.findMyMembers(page-1, size, getAuthenticatedEmail());
        List<Member> members = pageMember.getContent(); //구독한 멤버리스트

        return new ResponseEntity(
                new MultiResponseDto(memberMapperClass.subscribingMembersToMemberResponseDtos(members),
                        pageMember), HttpStatus.OK);
    }

    //내가 좋아요한 큐레이션 리스트 조회
    @GetMapping("/like")
    public ResponseEntity getMyLikeCurations(@Positive @RequestParam("page") int page,
                                             @Positive @RequestParam("size") int size) {
        Member member = memberService.findVerifiedMemberByEmail(getAuthenticatedEmail());
        Page<Curation> curationPage = curationService.getMyLikeCuration(page-1, size, member);
        List<Curation> curations = curationPage.getContent();

        return new ResponseEntity(new MultiResponseDto<>(
                curationMapper.curationsToCurationMultiListResponseDtos(curations), curationPage),
                HttpStatus.OK);
    }

    //타 유저가 좋아요한 큐레이션 리스트 조회
    @GetMapping("/like/{member-id}")
    public ResponseEntity getMyLikeCurations(@Valid @PathVariable("member-id") long otherMemberId,
                                             @Positive @RequestParam("page") int page,
                                             @Positive @RequestParam("size") int size) {
        Member member = memberService.findVerifiedMemberByMemberId(otherMemberId);
        Page<Curation> curationPage = curationService.getMyLikeCuration(page-1, size, member);
        List<Curation> curations = curationPage.getContent();

        return new ResponseEntity(new MultiResponseDto<>(
                curationMapper.curationsToCurationMultiListResponseDtos(curations), curationPage),
                HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity deleteMember() {
        memberService.deleteMember(getAuthenticatedEmail());

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    private String getAuthenticatedEmail(){
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal()
                .toString();
    }
}
