package com.seb_main_004.whosbook.curation.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class CurationSaveImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long curationSaveImageId;
    @Setter
    @ManyToOne
    @JoinColumn(name = "curation_id")
    private Curation curation;
    @Setter
    @ManyToOne
    @JoinColumn(name = "curation_image_id")
    private CurationImage curationImage;

    public CurationSaveImage(Curation curation, CurationImage curationImage) {
        this.curation = curation;
        this.curationImage = curationImage;
    }

    public void setCuration(Curation curation){
        this.curation = curation;
        if (!curation.getCurationSaveImages().contains(this)){
            curation.getCurationSaveImages().add(this);
        }
    }
}
