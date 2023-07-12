package com.seb_main_004.whosbook.like.entity;


import com.seb_main_004.whosbook.curation.entity.Curation;
import com.seb_main_004.whosbook.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
public class CurationLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long likeId;


    @ManyToOne
    @JoinColumn(name = "curation_id")
    private Curation curation;

    @ManyToOne
    @JoinColumn(name=" member_id")
    private Member member;

    @Column
    @Enumerated(EnumType.STRING)
    private LikeType likeType;

    public CurationLike() {

    }


    public CurationLike(Curation curation, Member member, LikeType likeType){

        this.curation=curation;
        this.member=member;
        this.likeType=likeType;
    }


    //회원이 좋아요를 눌렀는지, 안눌렀는지 체크하는 상태값
    @Getter
    public  enum LikeType{

        LIKE, NONE;
    }



}
