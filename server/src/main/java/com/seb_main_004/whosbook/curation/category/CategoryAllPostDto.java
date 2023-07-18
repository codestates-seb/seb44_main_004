package com.seb_main_004.whosbook.curation.category;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class CategoryAllPostDto {
    @NotNull(message = "복수의 카테고리명을 입력해주세요")
    private List<String> names;
}
