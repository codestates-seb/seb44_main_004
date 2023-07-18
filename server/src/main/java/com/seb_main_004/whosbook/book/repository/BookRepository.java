package com.seb_main_004.whosbook.book.repository;

import com.seb_main_004.whosbook.book.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {
    Optional<Book> findBookByIsbn(String isbn);
}
