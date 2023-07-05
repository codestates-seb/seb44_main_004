package com.seb_main_004.whosbook.curation.service;

import com.seb_main_004.whosbook.curation.entity.Curation;
import com.seb_main_004.whosbook.curation.repository.CurationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CurationService {
    private final CurationRepository curationRepository;

    public Curation createCuration(Curation curation){
        return curationRepository.save(curation);
    }
}
