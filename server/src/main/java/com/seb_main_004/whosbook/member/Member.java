package com.seb_main_004.whosbook.member;


import lombok.Data;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  long memberId;

    private String email;

    private String nickname;

    private String password;

    private String emoji;

    @Enumerated(value = EnumType.STRING)
    private MemberStatus memberStatus= MemberStatus.MEMBER_ACTIVE;

    private LocalDateTime createdAt=LocalDateTime.now();

    private LocalDateTime updatedAt=LocalDateTime.now();



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
