package com.example.bookcollection.controller;

import com.example.bookcollection.Book;
import com.example.bookcollection.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.ResponseEntity;
import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookRepository repository;

    @GetMapping
    public List<Book> getAllBooks() {
        return repository.findAll();
    }
    //hello friends
    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return repository.save(book);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build(); // Returns 204 No Content
        } else {
            return ResponseEntity.notFound().build(); // Returns 404 Not Found
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book updatedBook) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build(); // Returns 404 Not Found
        }

        updatedBook.setId(id); // Set the ID of the updated book
        Book savedBook = repository.save(updatedBook);
        return ResponseEntity.ok(savedBook); // Returns 200 OK with the updated book
    }
}
