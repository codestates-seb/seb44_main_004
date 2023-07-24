package com.seb_main_004.whosbook.book.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bookId;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String authors;
    @Column(nullable = false)
    private String publisher;
    @Column(columnDefinition = "TEXT")
    private String thumbnail;
    @Column(columnDefinition = "TEXT")
    private String url;
    @Column(nullable = false, unique = true)
    private String isbn;

    public Book(String title, String authors, String publisher, String thumbnail, String url, String isbn) {
        this.title = title;
        this.authors = authors;
        this.publisher = publisher;
        this.thumbnail = thumbnail;
        this.url = url;
        this.isbn = isbn;
    }
}
