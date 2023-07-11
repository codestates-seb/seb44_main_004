package com.seb_main_004.whosbook.curation.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class CurationImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long curationImageId;
    private String name;
    private String path;
//    @ManyToOne
//    @JoinColumn(name = "curation_id")
//    private Curation curation;
}
