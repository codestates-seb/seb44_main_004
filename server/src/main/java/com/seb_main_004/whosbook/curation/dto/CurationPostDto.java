package com.seb_main_004.whosbook.curation.dto;

import com.seb_main_004.whosbook.curation.entity.Curation;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;

@Builder
@Getter
public class CurationPostDto {

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
    @Nullable
    private List<Long> imageIds;
}
