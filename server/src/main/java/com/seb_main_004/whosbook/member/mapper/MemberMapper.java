package com.seb_main_004.whosbook.member.mapper;

import com.seb_main_004.whosbook.curation.dto.CurationMultiResponseDto;
import com.seb_main_004.whosbook.curation.dto.CurationSingleDetailResponseDto;
import com.seb_main_004.whosbook.curation.entity.Curation;
import com.seb_main_004.whosbook.member.dto.MemberAndCurationResponseDto;
import com.seb_main_004.whosbook.member.dto.MemberPatchDto;
import com.seb_main_004.whosbook.member.dto.MemberPostDto;
import com.seb_main_004.whosbook.member.dto.MemberResponseDto;
import com.seb_main_004.whosbook.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.ListIterator;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberPostDtoToMember(MemberPostDto memberPostDto);

    Member memberPatchDtoToMember(MemberPatchDto memberPatchDto);

    List<MemberResponseDto> membersToMemberResponseDtos(List<Member> members);

    //회원 마이페이지의 '내가 쓴 큐레이션 목록' API를 위한 매퍼 메소드
    //기본적으론 Entity->Dto 매핑과 유사하지만 '내가 쓴 큐레이션'리스트를 매핑하는 과정이 복잡하여 직접 구현
    default MemberAndCurationResponseDto memberToMemberAndCurationResponseDto(Member member) {
        MemberAndCurationResponseDto memberAndCurationResponseDto = new MemberAndCurationResponseDto();
        memberAndCurationResponseDto.setMemberId(member.getMemberId());
        memberAndCurationResponseDto.setEmail(member.getEmail());
        memberAndCurationResponseDto.setNickname(member.getNickname());
        memberAndCurationResponseDto.setIntroduction(member.getIntroduction());
        //    회원가입 시 이미지 업로드를 위한 변수로서, 추후 구현
        //    memberAndCurationResponseDto.setImage(member.getImage());
        memberAndCurationResponseDto.setMemberStatus(member.getMemberStatus());

        //'내가 쓴 큐레이션'리스트 매핑
        ListIterator<Curation> curations = member.getCurations().listIterator();

        if(curations == null) {
            memberAndCurationResponseDto.setCurations(null);
        } else {
            List<CurationMultiResponseDto> curationResponseDtos = new ArrayList<>(member.getCurations().size());

            while(curations.hasNext()) {
                Curation curation = curations.next();
                CurationMultiResponseDto curationMultiResponseDto = new CurationMultiResponseDto();
                curationMultiResponseDto.setMemberId(curation.getMember().getMemberId());
                curationMultiResponseDto.setLike(100); //좋아요는 더미데이터로 100으로 설정, 좋아요 기능 구현 후 리팩토링 예정
                curationMultiResponseDto.setCurationId(curation.getCurationId());
                curationMultiResponseDto.setEmoji(curation.getEmoji());
                curationMultiResponseDto.setTitle(curation.getTitle());
                curationMultiResponseDto.setContent(curation.getContent());
                curationMultiResponseDto.setVisibility(curation.getVisibility());
                curationMultiResponseDto.setCreatedAt(curation.getCreatedAt());
                curationMultiResponseDto.setUpdatedAt(curation.getUpdatedAt());
                curationResponseDtos.add(curationMultiResponseDto);
            }
            memberAndCurationResponseDto.setCurations(curationResponseDtos);
        }
        return memberAndCurationResponseDto;
    }

    MemberResponseDto memberToMemberResponseDto(Member member);
}
