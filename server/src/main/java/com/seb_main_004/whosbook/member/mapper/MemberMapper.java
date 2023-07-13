package com.seb_main_004.whosbook.member.mapper;

import com.seb_main_004.whosbook.curation.dto.CurationMultiResponseDto;
import com.seb_main_004.whosbook.curation.entity.Curation;
import com.seb_main_004.whosbook.member.dto.*;
import com.seb_main_004.whosbook.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.*;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberPostDtoToMember(MemberPostDto memberPostDto);

    Member memberPatchDtoToMember(MemberPatchDto memberPatchDto);

    List<MemberResponseDto> membersToMemberResponseDtos(List<Member> members);

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

    MemberResponseDto memberToMemberResponseDto(Member member);
}
