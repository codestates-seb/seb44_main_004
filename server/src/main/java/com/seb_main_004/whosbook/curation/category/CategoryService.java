package com.seb_main_004.whosbook.curation.category;

import com.seb_main_004.whosbook.exception.BusinessLogicException;
import com.seb_main_004.whosbook.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public Category creatCategory(Category category){
        return categoryRepository.save(category);
    }

    public List<Category> createAllCategory(CategoryAllPostDto categoryAllPostDto){
        List<Category> categories = categoryAllPostDto.getNames()
                .stream()
                .map(name -> new Category(name))
                .collect(Collectors.toList());

        return categoryRepository.saveAll(categories);
    }

    public void deleteCategory(long categoryId) {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        Category category = optionalCategory.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.CATEGORY_NOT_FOUND)
        );
        categoryRepository.delete(category);
    }

    public List<Category> getAllCategory(){
        return categoryRepository.findAll();
    }

    public Category findVerifiedCategory(long categoryId){
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        return optionalCategory.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.CATEGORY_NOT_FOUND)
        );
    }
}
