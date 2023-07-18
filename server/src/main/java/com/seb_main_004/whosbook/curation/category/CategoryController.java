package com.seb_main_004.whosbook.curation.category;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.parser.HttpParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity postCategory(@RequestBody @Valid CategoryPostDto categoryPostDto){
        return new ResponseEntity(categoryService.creatCategory(Category.dtoToCategory(categoryPostDto)), HttpStatus.CREATED);
    }

    @PostMapping("/init")
    public ResponseEntity postAllCategory(@RequestBody @Valid CategoryAllPostDto categoryAllPostDto){
        List<Category> categories = categoryService.createAllCategory(categoryAllPostDto);
        return new ResponseEntity(categories, HttpStatus.CREATED);
    }

    @DeleteMapping("{category_id}")
    public ResponseEntity deleteCategory(@PathVariable("category_id") @Positive long categoryId){
        categoryService.deleteCategory(categoryId);

        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity getAllCategory(){
        return new ResponseEntity(categoryService.getAllCategory(), HttpStatus.OK);
    }
}
