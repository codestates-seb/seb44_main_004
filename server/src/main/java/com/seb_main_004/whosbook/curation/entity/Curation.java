package com.seb_main_004.whosbook.curation.entity;


import lombok.Data;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

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

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();


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


}
