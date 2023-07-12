package com.seb_main_004.whosbook.curation.mapper;

import com.seb_main_004.whosbook.curation.dto.CurationListResponseDto;
import com.seb_main_004.whosbook.curation.dto.CurationPostDto;
import com.seb_main_004.whosbook.curation.dto.CurationSingleDetailResponseDto;
import com.seb_main_004.whosbook.curation.entity.Curation;
import com.seb_main_004.whosbook.curation.entity.CurationImage;
import com.seb_main_004.whosbook.curation.repository.CurationRepository;
import com.seb_main_004.whosbook.member.dto.CuratorResponseDto;
import com.seb_main_004.whosbook.member.dto.MemberResponseDto;
import com.seb_main_004.whosbook.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface CurationMapper {

    default Curation curationPostDtoToCuration(CurationPostDto postDto){
        Curation curation = new Curation();
        curation.setEmoji(postDto.getEmoji());
        curation.setTitle(postDto.getTitle());
        curation.setContent(postDto.getContent());
        curation.setVisibility(postDto.getVisibility());
        curation.setCurationImages(postDto.getImageIds().stream()
                .map(imageId -> {
                    CurationImage image = new CurationImage();
                    image.setCurationImageId(imageId);
                    return image;
                }).collect(Collectors.toList()));

        return curation;
    };
    default CurationSingleDetailResponseDto curationToCurationSingleDetailResponseDto(Curation curation){
        Member member = curation.getMember();

        CuratorResponseDto curator = memberToCuratorResponseDto(member);


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

    default CuratorResponseDto memberToCuratorResponseDto(Member member){
        return CuratorResponseDto.builder()
                .memberId(member.getMemberId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .introduction(member.getIntroduction())
                .build();
    }

    default List<CurationListResponseDto> curationsToCurationListResponseDtos(List<Curation> curations){
        return curations.stream()
                .map(curation -> curationToCurationListResponseDto(curation))
                .collect(Collectors.toList());
    }

    default CurationListResponseDto curationToCurationListResponseDto(Curation curation){
        return CurationListResponseDto.builder()
                .curator(memberToCuratorResponseDto(curation.getMember()))
                .like(15)
                .curationId(curation.getCurationId())
                .emoji(curation.getEmoji())
                .title(curation.getTitle())
                .content(curation.getContent())
                .createdAt(curation.getCreatedAt())
                .updatedAt(curation.getUpdatedAt())
                .build();
    }
}
