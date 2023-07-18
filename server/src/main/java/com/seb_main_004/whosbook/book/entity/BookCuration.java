package com.seb_main_004.whosbook.book.entity;

import com.seb_main_004.whosbook.curation.entity.Curation;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class BookCuration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bookCurationId;
    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "curation_id")
    private Curation curation;

    public BookCuration(Book book, Curation curation) {
        this.book = book;
        this.curation = curation;
    }
}
