package com.seb_main_004.whosbook.member.dto;

import com.seb_main_004.whosbook.curation.dto.CurationMultiResponseDto;
import com.seb_main_004.whosbook.curation.dto.CurationPostDto;
import com.seb_main_004.whosbook.curation.dto.CurationSingleDetailResponseDto;
import com.seb_main_004.whosbook.curation.entity.Curation;
import com.seb_main_004.whosbook.member.entity.Member;
import lombok.Data;

import java.util.List;

//회원 마이페이지의 '내가 쓴 큐레이션 목록' API를 위한 DTO
//기존 MemberResponseDto와 거의 유사하나, 내가 작성한 큐레이션 목록 변수가 추가됨
@Data
public class MemberAndCurationResponseDto {
    private long memberId;

    private String email;

    private String nickname;

    private String introduction;

//    회원가입 시 이미지 업로드를 위한 변수로서, 추후 구현
//    private String image;

    private Member.MemberStatus memberStatus;

    //본인이 작성한 큐레이션의 ResponseDto 리스트
    private List<CurationMultiResponseDto> curations;
}
