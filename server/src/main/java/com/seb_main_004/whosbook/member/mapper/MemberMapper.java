package com.seb_main_004.whosbook.member.mapper;

import com.seb_main_004.whosbook.member.dto.MemberPatchDto;
import com.seb_main_004.whosbook.member.dto.MemberPostDto;
import com.seb_main_004.whosbook.member.dto.MemberResponseDto;
import com.seb_main_004.whosbook.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberPostDtoToMember(MemberPostDto memberPostDto);

    Member memberPatchDtoToMember(MemberPatchDto memberPatchDto);

    List<MemberResponseDto> membersToMemberResponseDtos(List<Member> members);

    MemberResponseDto memberToMemberResponseDto(Member member);
}
