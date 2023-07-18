package com.seb_main_004.whosbook.curation.category;

import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotBlank;
@Data
public class CategoryPostDto {
    @NotBlank(message = "카테고리명을 입력해주세요.")
    private String name;
}
