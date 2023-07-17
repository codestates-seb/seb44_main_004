package com.seb_main_004.whosbook.curation.category;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Category {
    public Category(String name) {
        this.name = name;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long categoryId;
    @Column(nullable = false, unique = true)
    private String name;

    public static Category dtoToCategory(CategoryPostDto categoryPostDto){
        return new Category(categoryPostDto.getName());
    }
}
