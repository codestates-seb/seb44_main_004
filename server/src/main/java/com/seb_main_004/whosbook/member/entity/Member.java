package com.seb_main_004.whosbook.member.entity;


import com.seb_main_004.whosbook.curation.entity.Curation;
import com.seb_main_004.whosbook.like.entity.CurationLike;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
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

    private String introduction;


//    회원가입 시 이미지 업로드를 위한 변수로서, 추후 구현
//    private String image;

    //소셜회원가입시 넘어오는 이미지
    private String imgUrl;

    public Member() {

    }

    public Member(String email, String nickname,String imgUrl) {
        this.email = email;
        this.nickname = nickname;
        this.imgUrl=imgUrl;
    }


    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private MemberStatus memberStatus= MemberStatus.MEMBER_ACTIVE;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt=LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt=LocalDateTime.now();

    //사용자의 권한을 등록하기 위한 권한 테이블
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    //큐레이션과 연관관계
    @OneToMany(mappedBy = "member", cascade = CascadeType.PERSIST)
    private List<Curation> curations;

    //like와 연관관계
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @BatchSize(size = 100)
    private List<CurationLike> likeList= new ArrayList<>();


    @Getter
    public  enum  MemberStatus{

        MEMBER_ACTIVE("활동중"),
        MEMBER_DELETE("탈퇴 상태");

        @Getter
        @Setter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }


}
