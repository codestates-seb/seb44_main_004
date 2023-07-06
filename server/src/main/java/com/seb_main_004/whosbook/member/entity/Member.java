package com.seb_main_004.whosbook.member.entity;


import lombok.Data;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  long memberId;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String password;

//    회원가입 시 이미지 업로드를 위한 변수로서, 추후 구현
//    private String image;

    @Enumerated(value = EnumType.STRING)
    private MemberStatus memberStatus= MemberStatus.MEMBER_ACTIVE;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt=LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt=LocalDateTime.now();

    //사용자의 권한을 등록하기 위한 권한 테이블
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();



    public  enum  MemberStatus{

        MEMBER_ACTIVE("활동중"),
        MEMBER_DELETE("탈퇴 상태");

        @Getter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }


}
