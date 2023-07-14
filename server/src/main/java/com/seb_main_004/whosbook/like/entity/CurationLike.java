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


    public CurationLike() {

    }


    public CurationLike(Curation curation, Member member){

        this.curation=curation;
        this.member=member;
    }






}
