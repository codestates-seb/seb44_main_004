package com.seb_main_004.whosbook.curation.mapper;

import com.seb_main_004.whosbook.curation.dto.CurationPostDto;
import com.seb_main_004.whosbook.curation.entity.Curation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CurationMapper {

    Curation curationPostDtoToCuration(CurationPostDto postDto);
}
