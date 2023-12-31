package com.seb_main_004.whosbook.curation.dto;

import com.seb_main_004.whosbook.book.entity.Book;
import com.seb_main_004.whosbook.curation.entity.Curation;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;

@Builder
@Getter
public class CurationPostDto implements CurationImageDto{

    @NotBlank(message = "이모지를 입력해주세요")
    @Length(max = 100, message = "최대 5개의 이모지만 등록이 가능합니다.")
    private String emoji;
    @NotBlank(message = "제목을 입력해주세요")
    @Length(min = 1, max = 100, message = "제목은 최소 1글자 이상 최대 30글자 미만으로 작성해주세요")
    private String title;
    @NotBlank(message = "내용을 입력해주세요")
    @Length(min = 10, message = "내용은 최소 10글자 이상 작성해주세요")
    private String content;
    @NotNull(message = "공개/비공개 여부를 확인해주세요")
    private Curation.Visibility visibility;
    @NotNull(message = "이미지 ID 필드가 존재하지 않습니다.")
    private List<Long> imageIds;
    @Positive(message = "카테고리 ID는 1 이상 입니다.")
    private long categoryId;
    @NotNull(message = "책정보를 기입해주세요")
    private Book books;

}
