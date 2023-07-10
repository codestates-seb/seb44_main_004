package com.seb_main_004.whosbook.member.controller;

import com.seb_main_004.whosbook.member.dto.MemberPatchDto;
import com.seb_main_004.whosbook.member.dto.MemberPostDto;
import com.seb_main_004.whosbook.dto.MultiResponseDto;
import com.seb_main_004.whosbook.member.entity.Member;
import com.seb_main_004.whosbook.member.mapper.MemberMapper;
import com.seb_main_004.whosbook.member.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/members")
@Validated
@Slf4j
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper memberMapper;

    public MemberController(MemberService memberService, MemberMapper memberMapper) {
        this.memberService = memberService;
        this.memberMapper = memberMapper;
    }

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberPostDto memberPostDto) {
        Member member = memberMapper.memberPostDtoToMember(memberPostDto);

        Member response = memberService.createMember(member);

        return new ResponseEntity(memberMapper.memberToMemberResponseDto(response), HttpStatus.CREATED);
    }

    @PatchMapping
    public ResponseEntity patchMember(@Valid @RequestBody MemberPatchDto memberPatchDto) {

        Member member = memberMapper.memberPatchDtoToMember(memberPatchDto);

        Member response = memberService.updateMember(member, getAuthenticatedEmail());

        return new ResponseEntity(memberMapper.memberToMemberResponseDto(response), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getMember() {
        Member response = memberService.findMember(getAuthenticatedEmail());

        return new ResponseEntity(memberMapper.memberToMemberResponseDto(response), HttpStatus.OK);
    }

    @GetMapping("/curations")
    public ResponseEntity getMyCurations() {
        Member response = memberService.findMember(getAuthenticatedEmail());

        return new ResponseEntity(memberMapper.memberToMemberAndCurationResponseDto(response), HttpStatus.OK);
    }

    @GetMapping("/subscribe")
    public ResponseEntity getMembers(@Positive @RequestParam("page") int page,
                                     @Positive @RequestParam("size") int size) {
        Page<Member> pageMember = memberService.findMembers(page-1, size);
        List<Member> members = pageMember.getContent();

        return new ResponseEntity(
                new MultiResponseDto(memberMapper.membersToMemberResponseDtos(members),
                        pageMember), HttpStatus.OK);
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
