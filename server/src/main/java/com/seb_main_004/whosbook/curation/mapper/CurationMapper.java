package com.seb_main_004.whosbook.curation.mapper;

import com.seb_main_004.whosbook.curation.dto.CurationPostDto;
import com.seb_main_004.whosbook.curation.dto.CurationSingleDetailResponseDto;
import com.seb_main_004.whosbook.curation.entity.Curation;
import com.seb_main_004.whosbook.member.dto.CuratorResponseDto;
import com.seb_main_004.whosbook.member.dto.MemberResponseDto;
import com.seb_main_004.whosbook.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CurationMapper {

    Curation curationPostDtoToCuration(CurationPostDto postDto);
    default CurationSingleDetailResponseDto curationToCurationSingleDetailResponseDto(Curation curation){
        Member member = curation.getMember();

        CuratorResponseDto curator = CuratorResponseDto.builder()
                .memberId(member.getMemberId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .introduction(member.getIntroduction())
                .build();

        return CurationSingleDetailResponseDto.builder()
                .curator(curator)
                .isSubscribed(true)
                .like(10)
                .curationId(curation.getCurationId())
                .emoji(curation.getEmoji())
                .title(curation.getTitle())
                .content(curation.getContent())
                .visibility(curation.getVisibility())
                .createdAt(curation.getCreatedAt())
                .updatedAt(curation.getUpdatedAt())
                .build();
    }
}
