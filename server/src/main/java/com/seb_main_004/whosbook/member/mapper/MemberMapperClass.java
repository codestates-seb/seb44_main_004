package com.seb_main_004.whosbook.member.mapper;

import com.seb_main_004.whosbook.curation.service.CurationService;
import com.seb_main_004.whosbook.member.dto.MemberPatchDto;
import com.seb_main_004.whosbook.member.dto.MemberPostDto;
import com.seb_main_004.whosbook.member.dto.MemberResponseDto;
import com.seb_main_004.whosbook.member.dto.OtherMemberResponseDto;
import com.seb_main_004.whosbook.member.entity.Member;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Component
public class MemberMapperClass {
//    long myCurations = curationService.getMyCurations(otherMember).size();

    private final CurationService curationService;


    public MemberMapperClass(CurationService curationService) {
        this.curationService = curationService;
    }

    public Member memberPostDtoToMember(MemberPostDto memberPostDto) {
        if (memberPostDto == null) {
            return null;
        } else {
            Member member = new Member();
            member.setEmail(memberPostDto.getEmail());
            member.setNickname(memberPostDto.getNickname());
            member.setPassword(memberPostDto.getPassword());
            return member;
        }
    }

    public Member memberPatchDtoToMember(MemberPatchDto memberPatchDto) {
        if (memberPatchDto == null) {
            return null;
        } else {
            Member member = new Member();
            member.setNickname(memberPatchDto.getNickname());
            member.setIntroduction(memberPatchDto.getIntroduction());
            return member;
        }
    }

    public MemberResponseDto memberToMemberResponseDto(Member member, long myCurations) {
        return MemberResponseDto.builder()
                .memberId(member.getMemberId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .introduction(member.getIntroduction())
                .image(member.getImageUrl())
                .mySubscriber(member.getSubscribingMembers().size())
                .myCuration(myCurations)
                .memberStatus(member.getMemberStatus())
                .build();
    }

    public OtherMemberResponseDto memberToOtherMemberResponseDto(Member otherMember, long myCurations, boolean isSubscribed) {
        return OtherMemberResponseDto.builder()
                .memberId(otherMember.getMemberId())
                .email(otherMember.getEmail())
                .nickname(otherMember.getNickname())
                .introduction(otherMember.getIntroduction())
                .image(otherMember.getImageUrl())
                .mySubscriber(otherMember.getSubscribingMembers().size())
                .myCuration(myCurations)
                .isSubscribed(isSubscribed)
                .memberStatus(otherMember.getMemberStatus())
                .build();
    };


    //회원 마이페이지의 '내가 구독한 큐레이터 목록' API를 위한 매퍼 메소드
    public List<MemberResponseDto> subscribingMembersToMemberResponseDtos(List<Member> subscribingMembers) {
        if(subscribingMembers == null) {
            return null;
        } else {
            List<MemberResponseDto> list = new ArrayList<>(subscribingMembers.size());
            Iterator it = subscribingMembers.iterator();

            while(it.hasNext()) {
                Member member = (Member)it.next();
                if(member.getMemberStatus() == Member.MemberStatus.MEMBER_DELETE) {
                    continue;
                } else {
                    long myCurations = curationService.getMyCurations(member).size();
                    list.add(this.memberToMemberResponseDto(member, myCurations));
                }
            }
            return list;
        }
    }


}
