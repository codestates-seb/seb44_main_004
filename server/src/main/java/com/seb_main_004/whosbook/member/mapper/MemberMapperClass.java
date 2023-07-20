package com.seb_main_004.whosbook.member.mapper;

import com.seb_main_004.whosbook.curation.service.CurationService;
import com.seb_main_004.whosbook.member.dto.*;
import com.seb_main_004.whosbook.member.entity.Member;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class MemberMapperClass {
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

    public Member socialMemberPostDtoToMember(SocialMemberPostDto memberPostDto) {
        if (memberPostDto == null) {
            return null;
        } else {
            Member member = new Member();
            member.setEmail(memberPostDto.getEmail());
            member.setNickname(memberPostDto.getNickname());
            member.setImageUrl(memberPostDto.getImageUrl());
            member.setPassword(""); // 소셜로그인은 비밀번호가 필요없으므로 공백으로 저장
            return member;
        }
    };

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

    public MemberResponseDto memberToMemberResponseDto(Member member) {
        return MemberResponseDto.builder()
                .memberId(member.getMemberId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .image(member.getImageUrl())
                .introduction(member.getIntroduction())
                .mySubscriber(member.getSubscribingMembers().size())
                .myCuration(curationService.getMyCurations(member).size())
                .memberStatus(member.getMemberStatus())
                .build();
    }

    public OtherMemberResponseDto memberToOtherMemberResponseDto(Member otherMember, boolean isSubscribed) {
        return OtherMemberResponseDto.builder()
                .memberId(otherMember.getMemberId())
                .email(otherMember.getEmail())
                .nickname(otherMember.getNickname())
                .image(otherMember.getImageUrl())
                .introduction(otherMember.getIntroduction())
                .mySubscriber(otherMember.getSubscribingMembers().size())
                .myCuration(curationService.getMyCurations(otherMember).size())
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
                    list.add(this.memberToMemberResponseDto(member));
                }
            }
            return list;
        }
    }

    public BestCuratorDto memberToBestCuratorDto(Member member) {
        return BestCuratorDto.builder()
                .memberId(member.getMemberId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .introduction(member.getIntroduction())
                .image(member.getImageUrl())
                .mySubscriber(member.getSubscribingMembers().size())
                .build();
    }

    public List<BestCuratorDto> membersToBestCuratorDtos(List<Member> members) {
        return members.stream().map(
                member -> memberToBestCuratorDto(member)
        ).collect(Collectors.toList());
    }

}
