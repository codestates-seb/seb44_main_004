package com.seb_main_004.whosbook.curation.mapper;

import com.seb_main_004.whosbook.curation.dto.CurationListResponseDto;
import com.seb_main_004.whosbook.curation.dto.CurationMultiResponseDto;
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

    Curation curationPostDtoToCuration(CurationPostDto postDto);
    default CurationSingleDetailResponseDto curationToCurationSingleDetailResponseDto(Curation curation){
        Member member = curation.getMember();

        CuratorResponseDto curator = memberToCuratorResponseDto(member);


        return CurationSingleDetailResponseDto.builder()
                .curator(curator)
                .categoryId(curation.getCategory().getCategoryId())
                .category(curation.getCategory().getName())
                .isLiked(curation.isLiked())
                .isSubscribed(curation.isSubscribed())
                .curationLikeCount(curation.getCurationLikeCount())
                .curationId(curation.getCurationId())
                .emoji(curation.getEmoji())
                .title(curation.getTitle())
                .content(curation.getContent())
                .visibility(curation.getVisibility())
                .createdAt(curation.getCreatedAt())
                .updatedAt(curation.getUpdatedAt())
                .imageIds(curation.getCurationSaveImages().stream().map(
                        image -> image.getCurationImage().getCurationImageId()).collect(Collectors.toList()))
                .books(curation.getBookCurations().stream().map(
                        bookCuration -> bookCuration.getBook()
                ).collect(Collectors.toList()))
                .build();
    }

    default CuratorResponseDto memberToCuratorResponseDto(Member member){
        return CuratorResponseDto.builder()
                .memberId(member.getMemberId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .introduction(member.getIntroduction())
                .image(member.getImageUrl())
                .build();
    }

    default List<CurationListResponseDto> curationsToCurationListResponseDtos(List<Curation> curations){
        return curations.stream()
                .map(curation -> curationToCurationListResponseDto(curation))
                .collect(Collectors.toList());
    }

    default List<CurationMultiResponseDto> curationsToCurationMultiListResponseDtos(List<Curation> curations){
        return curations.stream()
                .map(curation -> curationToCurationMultiResponseDto(curation))
                .collect(Collectors.toList());
    }

    default CurationListResponseDto curationToCurationListResponseDto(Curation curation){
        return CurationListResponseDto.builder()
                .curator(memberToCuratorResponseDto(curation.getMember()))
                .categoryId(curation.getCategory().getCategoryId())
                .category(curation.getCategory().getName())
                .curationLikeCount(curation.getCurationLikeCount())
                .curationId(curation.getCurationId())
                .emoji(curation.getEmoji())
                .title(curation.getTitle())
                .content(curation.getContent())
                .createdAt(curation.getCreatedAt())
                .updatedAt(curation.getUpdatedAt())
                .build();
    }

    default CurationMultiResponseDto curationToCurationMultiResponseDto(Curation curation){
        return CurationMultiResponseDto.builder()
                .memberId(curation.getMember().getMemberId())
                .memberNickname(curation.getMember().getNickname())
                .memberImageUrl(curation.getMember().getImageUrl())
                .categoryId(curation.getCategory().getCategoryId())
                .category(curation.getCategory().getName())
                .curationLikeCount(curation.getCurationLikeCount())
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
