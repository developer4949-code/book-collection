package com.example.bookcollection.repository;

import com.example.bookcollection.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> { }