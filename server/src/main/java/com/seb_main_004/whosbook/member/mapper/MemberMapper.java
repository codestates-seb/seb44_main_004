package com.seb_main_004.whosbook.member.mapper;

import com.seb_main_004.whosbook.member.dto.MemberPostDto;
import com.seb_main_004.whosbook.member.dto.MemberResponseDto;
import com.seb_main_004.whosbook.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    //memberPostDtoToMember
    //memberToMemberResponseDto
    Member memberPostDtoToMember(MemberPostDto memberPostDto);

    MemberResponseDto memberToMemberResponseDto(Member member);
}
