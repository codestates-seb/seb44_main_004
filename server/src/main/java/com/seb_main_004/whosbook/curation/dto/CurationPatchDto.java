package com.seb_main_004.whosbook.curation.dto;

import com.seb_main_004.whosbook.curation.entity.Curation;
import com.seb_main_004.whosbook.vaildator.NotSpace;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Builder
@Getter
public class CurationPatchDto {
    @NotBlank
    @Length(max = 5)
    private String emoji;
    @NotBlank
    @Length(min = 1, max = 30)
    private String title;
    @NotBlank
    @Length(min = 10)
    private String content;
    @NotNull
    private Curation.Visibility visibility;
}
