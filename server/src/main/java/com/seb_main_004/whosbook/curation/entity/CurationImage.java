package com.seb_main_004.whosbook.curation.entity;

import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
public class CurationImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long curationImageId;
    @Column(nullable = false)
    private String imageKey;
    private String path;
    @Column(nullable = false)
    private boolean isUsed = false;
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    @ManyToOne
    @JoinColumn(name = "curation_id")
    private Curation curation;
}
