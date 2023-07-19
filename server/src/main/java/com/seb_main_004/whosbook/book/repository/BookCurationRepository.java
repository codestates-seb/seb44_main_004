package com.seb_main_004.whosbook.book.repository;

import com.seb_main_004.whosbook.book.entity.BookCuration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookCurationRepository extends JpaRepository<BookCuration, Long> {
}
