package com.seb_main_004.whosbook.curation.entity;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Data
public class Curation {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long curationId;

    private String title;

    private String content;

    private LocalDateTime createdAt=LocalDateTime.now();

    private LocalDateTime updatedAt=LocalDateTime.now();


    private Visibility visibilityStatus= Visibility.PUBLIC;


    public  enum  Visibility{

        PUBLIC("공개"),
        SECRET("비공개");

        @Getter
        private String status;

        Visibility(String status) {
            this.status = status;
        }
    }

    public  enum CurationStatus{

        CURATION_DELETE("삭제된 글"),
        CURATION_ACTIVE("게시 중인 글");

        @Getter
        private String curationStatus;

        CurationStatus(String curationStatus) {
            this.curationStatus = curationStatus;
        }
    }


}
