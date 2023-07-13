package com.seb_main_004.whosbook.curation.entity;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Data
public class CurationImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long curationImageId;
    @Column(nullable = false)
    private String imageKey;
    private String path;
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public CurationImage(String imageKey, String path) {
        this.imageKey = imageKey;
        this.path = path;
    }
}
