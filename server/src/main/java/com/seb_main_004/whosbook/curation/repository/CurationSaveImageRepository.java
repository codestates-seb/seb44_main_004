package com.seb_main_004.whosbook.curation.repository;

import com.seb_main_004.whosbook.curation.entity.CurationImage;
import com.seb_main_004.whosbook.curation.entity.CurationSaveImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CurationSaveImageRepository extends JpaRepository<CurationSaveImage, Long> {
    Optional<CurationSaveImage> findByCurationImage(CurationImage curationImage);
}
