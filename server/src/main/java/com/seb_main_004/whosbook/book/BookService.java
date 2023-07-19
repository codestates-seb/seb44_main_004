package com.seb_main_004.whosbook.book;

import com.seb_main_004.whosbook.book.entity.Book;
import com.seb_main_004.whosbook.book.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
