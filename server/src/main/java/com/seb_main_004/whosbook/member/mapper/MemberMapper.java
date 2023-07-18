package com.seb_main_004.whosbook.member.mapper;

import com.seb_main_004.whosbook.member.dto.*;
import com.seb_main_004.whosbook.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.*;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberPostDtoToMember(MemberPostDto memberPostDto);

    Member memberPatchDtoToMember(MemberPatchDto memberPatchDto);

    default MemberResponseDto memberToMemberResponseDto(Member member) {
        return MemberResponseDto.builder()
                .memberId(member.getMemberId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .introduction(member.getIntroduction())
                .image(member.getImageUrl())
                .mySubscriber(member.getSubscribingMembers().size())
                .myCuration(member.getCurations().size())
                .memberStatus(member.getMemberStatus())
                .build();
    };

    default OtherMemberResponseDto memberToOtherMemberResponseDto(Member otherMember, boolean isSubscribed) {
        return OtherMemberResponseDto.builder()
                .memberId(otherMember.getMemberId())
                .email(otherMember.getEmail())
                .nickname(otherMember.getNickname())
                .introduction(otherMember.getIntroduction())
                .image(otherMember.getImageUrl())
                .mySubscriber(otherMember.getSubscribingMembers().size())
                .myCuration(otherMember.getCurations().size())
                .isSubscribed(isSubscribed)
                .memberStatus(otherMember.getMemberStatus())
                .build();
    };


    //회원 마이페이지의 '내가 구독한 큐레이터 목록' API를 위한 매퍼 메소드
    default List<MemberResponseDto> subscribingMembersToMemberResponseDtos(List<Member> subscribingMembers) {
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
                    list.add(this.memberToMemberResponseDto(member));
                }
            }
            return list;
        }
    }

}
