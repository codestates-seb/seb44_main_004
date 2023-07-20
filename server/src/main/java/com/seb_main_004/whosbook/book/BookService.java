package com.seb_main_004.whosbook.book;

import com.seb_main_004.whosbook.book.entity.Book;
import com.seb_main_004.whosbook.book.repository.BookRepository;
import com.seb_main_004.whosbook.curation.dto.CurationPatchDto;
import com.seb_main_004.whosbook.curation.entity.Curation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;

    public Book getSavedBook(Book book){
        Optional<Book> optionalBook = bookRepository.findBookByIsbn(book.getIsbn());
        if(optionalBook.isPresent()) return optionalBook.get();
        return bookRepository.save(book);
    }
}
