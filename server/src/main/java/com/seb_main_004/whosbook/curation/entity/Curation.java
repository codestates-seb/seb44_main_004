package com.seb_main_004.whosbook.curation.entity;


import com.seb_main_004.whosbook.curation.dto.CurationPatchDto;
import com.seb_main_004.whosbook.like.entity.CurationLike;
import com.seb_main_004.whosbook.member.entity.Member;
import com.seb_main_004.whosbook.reply.entity.Reply;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Curation {

    //TODO : Member 엔티티와 연관관계 맵핑 필요

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long curationId;
    @Column(nullable = false, length = 5)
    private String emoji;

    @Column(nullable = false, length = 30)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private Visibility visibility = Visibility.PUBLIC;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private CurationStatus curationStatus = CurationStatus.CURATION_ACTIVE;
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "curation", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    private List<Reply> replies;

    //Like와 연관관계
    @OneToMany(mappedBy = "curation", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<CurationLike> likeList=new ArrayList<>();

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    //@Transient
    @Column(columnDefinition = "Integer default 0")
    private Integer curationLikeCount=0;

    //엔티티에서 객체를 저장하기위한
    //@Transient
    @Column
    private String curationLikeStatus;


    public enum Visibility{

        PUBLIC("공개"),
        SECRET("비공개");

        @Getter
        private String status;

        Visibility(String status) {
            this.status = status;
        }
    }

    public enum CurationStatus{

        CURATION_DELETE("삭제된 글"),
        CURATION_ACTIVE("게시 중인 글");

        @Getter
        private String curationStatus;

        CurationStatus(String curationStatus) {
            this.curationStatus = curationStatus;
        }
    }

    public void updateCurationData(CurationPatchDto patchDto){
        this.emoji = patchDto.getEmoji();
        this.title = patchDto.getTitle();
        this.content = patchDto.getContent();
        this.visibility = patchDto.getVisibility();
        this.updatedAt = LocalDateTime.now();
    }

    public void addReply(Reply reply){
        //TODO: reply 맵핑 완료시 양방향 등록 로직 추가
        this.replies.add(reply);
    }

    public boolean isDeleted(){
        return this.curationStatus == CurationStatus.CURATION_DELETE;
    }

}
