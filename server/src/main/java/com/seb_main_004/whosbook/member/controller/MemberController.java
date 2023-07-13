package com.seb_main_004.whosbook.member.controller;

import com.seb_main_004.whosbook.curation.entity.Curation;
import com.seb_main_004.whosbook.curation.mapper.CurationMapper;
import com.seb_main_004.whosbook.curation.service.CurationService;
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
    private final CurationService curationService;
    private final CurationMapper curationMapper;


    public MemberController(MemberService memberService, MemberMapper memberMapper,
                            CurationService curationService, CurationMapper curationMapper) {
        this.memberService = memberService;
        this.memberMapper = memberMapper;
        this.curationService = curationService;
        this.curationMapper = curationMapper;
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

    //내가 작성한 큐레이션 리스트 조회
    @GetMapping("/curations")
    public ResponseEntity getMyCurations(@Positive @RequestParam("page") int page,
                                          @Positive @RequestParam("size") int size) {
        Member member = memberService.findMember(getAuthenticatedEmail());
        Page<Curation> curationPage = curationService.getMyCurations(page-1, size, member);
        List<Curation> curations = curationPage.getContent();

        return new ResponseEntity(new MultiResponseDto<>(
                curationMapper.curationsToCurationMultiListResponseDtos(curations), curationPage),
                HttpStatus.OK);
    }

    //내가 구독한 큐레이터 리스트 조회
    @GetMapping("/subscribe")
    public ResponseEntity getMembers(@Positive @RequestParam("page") int page,
                                     @Positive @RequestParam("size") int size) {
        Page<Member> pageMember = memberService.findMembers(page-1, size, getAuthenticatedEmail());
        List<Member> members = pageMember.getContent(); //구독한 멤버리스트

        return new ResponseEntity(
                new MultiResponseDto(memberMapper.subscribingMembersToMemberResponseDtos(members),
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
